import classNames from 'classnames';
import Position, { PositionItem } from 'common/components/Position';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styles from 'styles/Service.module.scss';

type PageContent = {
  pageTitle: string;
  subtitles: string[];
  titleImg: string;
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { name: 'create-ooo' } },
      { params: { name: 'create-ip' } },
      { params: { name: 'update-ooo' } },
      { params: { name: 'update-ip' } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{ name: string } & PageContent> = ({ params }) => {
  
  const pageContentMap: { [key: string]: PageContent } = {
    'create-ooo': {
      pageTitle: 'Регистрация ООО в Словакии онлайн до 28 дней',
      subtitles: [
        'мы обработаем ваш заказ за 1 день, остальные 27 – максимальные установленные законом сроки для регистрации ООО',
        'стоимость открытия ООО всего 240€ с учетом оплаты госпошлины','заполнение заявки займет до 15 минут',
        'только один визит к ближайшему нотариусу для заверения подписей','получайте уведомления о статусе регистрации вашего ООО',
        'проконсультируем вас, если возникнут вопросы в процессе',
        'достаточно сканов паспорта, ВНЖ, справки о несудимости и подтверждения о наличии будущего юридического адреса',
      ],
      titleImg: '/images/service/create-ooo.png',
    },
    'create-ip': {
      pageTitle: 'Регистрация ИП',
      subtitles: [],
      titleImg: '/images/service/create-ooo.png',
    },
    'update-ooo': {
      pageTitle: 'Внесение изменений в ООО',
      subtitles: [],
      titleImg: '/images/service/create-ooo.png',
    },
    'update-ip': {
      pageTitle: 'Внесение изменений в ИП',
      subtitles: [],
      titleImg: '/images/service/create-ooo.png',
    },
  };
  const name = params?.name as string;
  return {
    props: {
      name,
      ...pageContentMap[name],
    },
  };
};

export default function Service({ pageTitle, name, subtitles, titleImg }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Úkon.sk - Информация</title>
        <meta name="description" content={`Úkon.sk - ${pageTitle}`} />
      </Head>
      <main>
        <Position>
          <PositionItem href='/'>Главная</PositionItem>
          <PositionItem href={`/services/${name}`}>{pageTitle}</PositionItem>
        </Position>
        <section className={styles.service}>
          <div className={classNames('container', styles.container)}>
            <div className={styles.service__text}>
              <h1 className={classNames('h2', styles['service-title'])}>
                {pageTitle}
              </h1>
              <Image width={696} height={696} src={titleImg} alt="" />
              <ul>
                {subtitles?.map((subtitleItem, index) => (
                  <li key={index} className="body fade-in">
                    {subtitleItem}
                  </li>
                ))}
              </ul>
              <div className={styles.service__btns}>
                <div className={classNames(styles.btn, 'btn', 'btn-text')}>
                  Оформить заявку
                </div>
                <div className="btn-transparent btn-text">
                  Получить консультацию
                </div>
              </div>
            </div>
            <div className={styles.service__img}>
              <Image width={696} height={696} src={titleImg} alt="" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}