import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const INDIVIDUAL_TYPE = 'Podnikateľ-fyzická osoba-nezapísaný v obchodnom registri';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { search } = req.query;

  await axios({
    method: 'GET',
    url: `https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=${Number.isNaN(Number(search)) ? `name:${search}` : `cin:${search}`}&private_access_token=${process.env.NEXT_PUBLIC_SLOVENSKO_DIGITAL_BASE_TOKEN}`,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({ data }) => {
    res.status(200).json({
      data: data.map((item: any) => {
        const [statutoryBody] = item.statutory_bodies;
        return {
          cin: item.cin,
          type: item.legal_form === INDIVIDUAL_TYPE ? 'individual' : 'company',
          name: `${statutoryBody.prefixes} ${statutoryBody.first_name} ${statutoryBody.last_name} ${statutoryBody.postfixes}`.trim(),
          companyName: item.name,
          businessAddress: item.formatted_address,
          address: `${statutoryBody?.street}, ${statutoryBody?.reg_number || statutoryBody?.building_number}, ${statutoryBody?.postal_code}, ${statutoryBody?.municipality}, ${statutoryBody?.country}`,
        };
      }),
    });
  }).catch(() => {
    res.status(404);
  });
}