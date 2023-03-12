import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const INDIVIDUAL_TYPE = 'Podnikateľ-fyzická osoba-nezapísaný v obchodnom registri';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { search } = req.query;

  axios({
    method: 'GET',
    url: `https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=${Number.isNaN(Number(search)) ? `name:${search}` : `cin:${search}`}&private_access_token=${process.env.NEXT_PUBLIC_SLOVENSKO_DIGITAL_BASE_TOKEN}`,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({ data }) => {
    res.status(200).json({
      data: data.map((item: any) => {
        const addressData = item.statutory_bodies[0];
        return {
          cin: item.cin,
          type: item.legal_form === INDIVIDUAL_TYPE ? 'individual' : 'company',
          name: item.name,
          companyName: item.name,
          businessAddress: item.formatted_address,
          address: `${addressData?.street}, ${addressData?.reg_number || addressData?.building_number}, ${addressData?.postal_code}, ${addressData?.municipality}, ${addressData?.country}`,
        };
      }),
    });
  }).catch(() => {
    res.status(404);
  });
}