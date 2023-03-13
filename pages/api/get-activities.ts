import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const getActivityStatus = (activity: any) => {
  if (!activity.suspended_from && !activity.effective_to) return 'open';
  if (activity.suspended_from && !activity.suspended_to) return 'stopped';
  return 'closed';
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;

  if (id) {
    await axios({
      method: 'GET',
      url: `https://datahub.ekosystem.slovensko.digital/api/datahub/corporate_bodies/search?q=cin:${id}&expand=rpo_organizations&access_token=${process.env.NEXT_PUBLIC_SLOVENSKO_DIGITAL_PREMIUM_TOKEN}`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => {
      res.status(200).json({
        data: data.rpo_organizations?.[0]?.economic_activity_entries.map((item: any) => ({
          ...item,
          status: getActivityStatus(item),
        })),
      });
    });
  } else {
    res.status(400).json({ error: 'Id is cannot be empty' });
  }
}