import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { search, country } = req.query;

  const config = {
    method: 'post',
    url: 'https://secure.smartform.cz/smartform-ws/oracle/v10',
    headers: {
      Authorization: 'Basic bmxBekY3Um56aDprT0h0NFU5Tw==',
      'Content-Type': 'application/json',
    },
    data : JSON.stringify({ fieldType:'WHOLE_ADDRESS', values:{ 'WHOLE_ADDRESS': search }, country, limit: 10 }),
  };

  axios(config)
    .then(function (response) {
      res.status(200).json({ data: response.data.suggestions.map(({ values }: any) => ({
        city: values.CITY,
        street: values.STREET,
        houseRegNumber: values.NUMBER?.split('/')?.[0],
        houseNumber: values.NUMBER?.split('/')?.[1],
        description: values.WHOLE_ADDRESS,
        zip: values.ZIP,
      })) });
    })
    .catch(function (error) {
      res.status(404).json({ error });
    });
}