import { NextApiRequest, NextApiResponse } from 'next';
import https  from 'https';

const getActivityStatus = (activity: any) => {
  if (!activity.suspended_from && !activity.effective_to) return 'open';
  if (activity.suspended_from && !activity.suspended_to) return 'stopped';
  return 'closed';
};

const getCinByName = (name: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const url = `https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=name:${name}&private_access_token=755e6dd8af690571fc0ed957dde2adc56ce823e6549c2286914295ffad427bd387b651eb3dc593e1`;
    https.get(url, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        const [individualData] = JSON.parse(data);
        try {
          resolve(individualData.cin as number);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (err) => {
      console.log('Error: ' + err.message);
      reject(500);
    });
  });
};

const getDataByCin = (cin: number) => {
  return new Promise((resolve, reject) => {
    const url = `https://datahub.ekosystem.slovensko.digital/api/datahub/corporate_bodies/search?q=cin:${cin}&expand=rpo_organizations&access_token=f053b038b14aa4ea7a22e24d45ec53cf70c67ad52464fcee65f1d5ba3a44e6db6cf5ffd41fdbc22b`;
    https.get(url, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        const individualData = JSON.parse(data);
        resolve({
          data: {
            cin: individualData.cin,
            personalName: individualData.name,
            companyName: individualData.name,
            businessAddress: individualData.formatted_address,
            addressResidence: individualData.formatted_address,
            citizenship: individualData.rpo_organizations?.[0]?.statutory_entries?.[0]?.address_country,
            activities: individualData.rpo_organizations?.[0]?.economic_activity_entries.map((item: any) => ({
              ...item,
              status: getActivityStatus(item),
            })),
          },
        });
      });
    }).on('error', (err) => {
      console.log('Error: ' + err.message);
      reject(500);
    });
  });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { search } = req.query;

  const resultByCin = (cin: number) => {
    getDataByCin(cin)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log('Error: ' + err);
        res.status(500);
      });
  };

  if (typeof search === 'string' && Number.isNaN(Number(search))) {
    getCinByName(search).then(resultByCin).catch(() => { res.status(404); });
  } else {
    resultByCin(Number(search));
  }
}