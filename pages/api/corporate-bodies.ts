import { NextApiRequest, NextApiResponse } from 'next';
import https  from 'https';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { search } = req.query;
  const url = `https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=${Number.isNaN(Number(search)) ? `name:${search}` : `cin:${search}`}&private_access_token=755e6dd8af690571fc0ed957dde2adc56ce823e6549c2286914295ffad427bd387b651eb3dc593e1`;

  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      const [individualData] = JSON.parse(data);
      res.status(200).json({
        data: individualData,
      });
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
    res.status(404);
  });
}