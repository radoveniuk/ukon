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
import HowInfo, { HowInfoHeader, HowInfoItem, HowInfoItems, HowInfoTitle } from 'common/components/PageSections/HowInfo';
import SeoText, { SeoTextBody, SeoTextTitle } from 'common/components/PageSections/SeoText';
import BenefitsTable, { BenefitsTableCell, BenefitsTableHeader, BenefitsTableHeaderColumn, BenefitsTableRow } from 'common/components/PageSections/BenefitsTable';

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
        <SeoText>
          <SeoTextTitle subtitle="КОМПАНИЯ">
            Открыть ИП или ООО в Словакии? <br />
            Знаем, умеем, практикуем.
          </SeoTextTitle>
          <SeoTextBody>
            <p>
              Úkon поможет зарегистрировать ваш бизнес и сэкономит при этом ваши время и нервы. Мы подготовим за вас необходимый пакет документов и подадим его в соответствующее ведомство. 
              Также с удовольствием внесем за вас изменения в ИП или ООО.
            </p>
            <h4 className="h4">
              Зарегистрировать ИП и ООО самостоятельно или онлайн? Плюсы и минусы.
            </h4>
            <BenefitsTable>
              <BenefitsTableHeader>
                <BenefitsTableHeaderColumn>Самостоятельно</BenefitsTableHeaderColumn>
                <BenefitsTableHeaderColumn>При помощи Úkon</BenefitsTableHeaderColumn>
              </BenefitsTableHeader>
              <BenefitsTableRow title="Экономия">
                <BenefitsTableCell>Экономия на услугах компании</BenefitsTableCell>
                <BenefitsTableCell>Экономия на государственной пошлине за каждый вид деятельности</BenefitsTableCell>
              </BenefitsTableRow>
              <BenefitsTableRow title="Сотрудничество с госорганами">
                <BenefitsTableCell>Общение с представителями государственных органов, если вы экстраверт</BenefitsTableCell>
                <BenefitsTableCell>Отсутствие общения с не всегда приветливыми представителями государственных органов</BenefitsTableCell>
              </BenefitsTableRow>
            </BenefitsTable>
          </SeoTextBody>
        </SeoText>
      </main>
    </>
  );
};
