import { Post } from 'common/types/blog';
import { DateTime } from 'luxon';
import type { NextApiRequest, NextApiResponse } from 'next';

const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://ukon.vercel.app';

type Data = {
  data: Post[]
}

const fakePost = () => ({
  _id: '63bc123da46898fd10152f' + Math.floor(Math.random() * 90 + 10),
  title: 'Открытие сделки всего за 1 евро?',
  image: '/images/post-image.png',
  content: `
  <h4>Подарок тебе, на именины</h4>
  <p>Иногда ему посчастливилось начать бизнес в день своей смены . А какой же праздник без подарка?! В Firmárna мы решили наградить всех, кто начинает бизнес в день своей смены .</p>
  <h4>Открытие сделки на 1 евро</h4>
  <p>Если вы заказываете открытие сделки онлайн через Компанию в день вашей валюты , вместо 19 евро с НДС вы заплатите всего 1 евро с НДС . (Плюс государственная пошлина за ремесло или связанную торговлю в размере 7,50 евро, если вы выберете один).</p>
  <p><iframe loading="lazy" title="Liquid Drum and Bass Mix 353" width="500" height="281" src="https://www.youtube.com/embed/e19ntb-2G5Y?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></p>
  <h4>Весь 2022 год</h4>
  <p>Мы поддерживаем бизнес, поэтому мы столь же щедры в создании eseročka из одного человека . И вот как мы будем представлять вас в течение 2022 года. Чтобы это случилось со всеми.</p>
  `,
  createdAt: DateTime.now().toISO(),
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { count = 4 } = req.query;
  const posts = [];
  for (let i = 0; i < count; i += 1) {
    posts.push(fakePost());
  }
  
  res.status(200).json({ 
    data: posts,
  });
}

export async function getPosts(count: number = 4) {
  const response = await fetch(`${server}/api/posts?count=${count}`);
  const jsonData = await response.json();
  return jsonData.data as Post[];
}