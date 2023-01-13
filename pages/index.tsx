import Head from 'next/head';
import Hero from 'common/components/Home/Hero';
import Services from 'common/components/Home/Services';
import We from 'common/components/Home/We';
import Contacts from 'common/components/PageSections/Contacts';
import About from 'common/components/Home/About';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Post } from 'common/types/blog';
import { getPosts } from './api/posts';
import Blog from 'common/components/Home/Blog';
import Text from 'common/components/Home/Text';
import HowInfo, { HowInfoHeader, HowInfoItem, HowInfoItems, HowInfoTitle } from 'common/components/PageSections/HowInfo';

export const getServerSideProps: GetServerSideProps<{ posts: Post[] }> = async () => {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <Head>
        <title>Úkon.sk</title>
        <meta name="description" content="Úkon.sk - home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Hero />
        <HowInfo>
          <HowInfoHeader>
            <HowInfoTitle>
              Как зарегистрировать ИП/ООО<br />
              в Словакии онлайн
            </HowInfoTitle>
          </HowInfoHeader>
          <HowInfoItems>
            <HowInfoItem 
              title="1. Заполнение персональных данных" 
              minutes="15 мин"
              description="Нажмите на зеленую кнопку под надписью «Я хочу начать бизнес». Вы попадете в форму, где вы выбираете, чем вы хотите заниматься в бизнесе." 
            />
            <HowInfoItem 
              title="2. Выбор вида деятельности" 
              minutes="5 мин"
              description="После создания заявки на открытие сделки мы сразу же отправим вам письмо с заполненной заявкой. Все, что вам нужно сделать, это подписать его." 
            />
            <HowInfoItem 
              title="3. Подпись сгенерированных для вас документов" 
              minutes="2 мин"
              description="Вам больше не нужны марки - выберите способ оплаты онлайн. После этого мы обработаем вашу заявку на открытие сделки, и вы сможете вести дела." 
            />
            <HowInfoItem 
              title="4. Получить подтверждение успешной регистрации" 
              minutes="До 4 раб. дней"
              description="При регистрации в офисе торговой лицензии мы автоматически обеспечим регистрацию в налоговой инспекции (карточка НДС)." 
            />
          </HowInfoItems>
        </HowInfo>
        <Services />
        <We />
        <Contacts />
        <About />
        <Blog posts={posts} />
        <Text />
      </main>
    </>
  );
};
