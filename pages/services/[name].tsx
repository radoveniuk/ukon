import classNames from 'classnames';
import HowInfo, { HowInfoDescription, HowInfoHeader, HowInfoItem, HowInfoItems, HowInfoTitle } from 'common/components/HowInfo';
import Position, { PositionItem } from 'common/components/Position';
import Prices, { PricesDescription, PricesHeader } from 'common/components/Prices';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styles from 'styles/Service.module.scss';

type PageContent = {
  pageTitle: string;
  subtitles: string[];
  titleImg: string;
  howInfo?: {
    title: string;
    description: string;
    howItems: {
      title: string;
      time?: string;
      description: string;
    }[]
  };
  prices?: {
    title: string;
    description: string;
  }
  benefits?: {
    title: string;
    items: {
      title: string;
      description: string;
    }[]
  }
}

const PAGE_DATA_MAP: { [key: string]: PageContent } = {
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
    howInfo: {
      title: 'Как открыть ООО в Словакии',
      description: 'Úkon зарегистрирует ваше ООО онлайн. Не нужно собственноручно заполнять кучу бумаг. Достаточно внести минимум необходимых данных в нашу электронную форму, подписать готовые документы у любого нотариуса и прислать нам сканы. Максимум через 28 дней вы обладатель ООО в Словакии.',
      howItems: [
        { title: '1. Заполните анкету', description: 'Мы подготовили удобную форму с перечнем необходимых данных и комментариями, чтобы облегчить вам заполнение, сделать его быстрым и комфортным. Введите запрашиваемые данные, убедитесь в их правильности и нажмите кнопку «Отправить».' },
        { title: '2. Подпишите сгенерированные для вас документы', description: 'Сразу же после оформления заявки на ваш электронный адрес придут документы, составленные на основании заполненной анкеты. Подпишите их и заверьте подписи у ближайшего нотариуса. Отправьте нам сканы всех необходимых документов.' },
        { title: '3. Мы подаем документы на регистрацию', description: 'Просто занимайтесь своими делами. Мы сами формируем все необходимые заявления для регистрации, подаем документы, общаемся с представителями государственных ведомств.' },
        { title: '4. Получите подтверждение о регистрации вашего ООО', description: 'Можете устроить праздничную вечеринку по этому поводу или купить красивую рамку для выписки из торгового реестра. Первый шаг сделан – ваша предпринимательская деятельность уже официально зарегистрирована. Ведите свой бизнес и получайте прибыль!' },
      ],
    },
    prices: {
      title: 'Стоимость открытия ООО в Словакии',
      description: 'Мы предлагаем 3 тарифных пакета для регистрации ООО. Выбирайте оптимальный для вас вариант. Вы получите качественную услугу и желаемый результат независимо от выбранного пакета.',
    },
    benefits: {
      title: 'Почему выгоднее оформить ООО с Úkon?',
      items: [{ 'title':'Простота','description':'С вас заполнение данных и подписание документов, с нас всё остальное' },{ 'title':'Скорость','description':'Úkon в считанные минуты реагирует на ваши запросы. Испытайте его!' },{ 'title':'Экономия времени','description':'Вы экономите не менее 1 дня на личную подачу документов и простаивании в очередях ' },{ 'title':'Экономия средств','description':'Доверив нам регистрацию вашего ООО, вы сэкономите не только от 50€, но и свои бесценные нервы' },{ 'title':'Поддержка','description':'Не переживайте, если вам что-то непонятно. Мы ответим на ваши вопросы' },{ 'title':'Наш богатый опыт','description':'Нас знают и ценят как довольные клиенты, так и регистрационные органы' }],
    },
  },
  'create-ip': {
    pageTitle: 'Быстрая регистрация ИП онлайн до 4 рабочих дней',
    subtitles: [
      'мы обработаем ваш заказ за 1 день, остальные 3 – максимальные установленные законом сроки для регистрации ИП',
      'экономия на админ сборе 5€ за каждый вид деятельности',
      'заполнение заявки займет до 15 минут',
      'не нужно заверять подписи у нотариуса',
      'получайте уведомления о статусе регистрации вашего ИП',
      'проконсультируем вас, если возникнут вопросы в процессе',
      'достаточно сканов паспорта или ВНЖ (если есть), справки о несудимости и подтверждения о наличии регистрационного адреса',
    ],
    titleImg: '/images/service/create-ooo.png',
    howInfo: {
      title: 'Как оформить ИП в Словакии',
      description: 'Úkon зарегистрирует ваше ИП онлайн. Не нужно собственноручно заполнять кучу бумаг. Достаточно внести минимум необходимых данных в нашу электронную форму, подписать готовые документы онлайн. Максимум 4 рабочих  дня – и вы индивидуальный предприниматель в Словакии.',
      howItems: [
        { title: '1. Заполните анкету', description: 'Мы подготовили удобную форму с перечнем необходимых данных и комментариями, чтобы облегчить вам заполнение, сделать его быстрым и комфортным. Введите запрашиваемые данные, убедитесь в их правильности и нажмите кнопку «Отправить».' },
        { title: '2. Подпишите сгенерированные для вас документы', description: 'Сразу же после оформления заявки на ваш электронный адрес и в личный кабинет придут документы, составленные на основании заполненной анкеты. Подпишите их. Отправьте нам сканы всех необходимых документов.' },
        { title: '3. Мы подаем документы на регистрацию', description: 'Просто занимайтесь своими делами. Мы сами формируем все необходимые заявления для регистрации вашего ИП, подаем документы, общаемся с представителями государственных ведомств.' },
        { title: '4. Получите подтверждение о регистрации вашего ИП', description: 'Можете устроить праздничную вечеринку по этому поводу или купить красивую рамку для выписки из реестра предпринимателей. Первый шаг сделан – ваше ИП уже официально зарегистрировано. Ведите свой бизнес и получайте прибыль!' },
      ],
    },
    prices: {
      title: 'Стоимость оформления ИП в Словакии',
      description: 'Мы предлагаем 3 тарифных пакета для регистрации ИП онлайн. Выбирайте оптимальный для вас вариант. Вы получите качественную услугу и желаемый результат независимо от выбранного пакета.',
    },
    benefits: {
      title: 'Почему выгоднее оформить ИП с Úkon?',
      items: [{ 'title':'Простота','description':'С вас заполнение данных и подписание документов, с нас всё остальное' },{ 'title':'Скорость','description':'Úkon в считанные минуты реагирует на ваши запросы. Испытайте его!' },{ 'title':'Экономия времени','description':'Вы экономите не менее 1 дня на личную подачу документов и простаивании в очередях ' },{ 'title':'Экономия средств','description':'Доверив нам регистрацию вашего ИП, вы сэкономите не только от 50€, но и свои бесценные нервы' },{ 'title':'Поддержка','description':'Не переживайте, если вам что-то непонятно. Мы ответим на ваши вопросы' },{ 'title':'Наш богатый опыт','description':'Нас знают и ценят как довольные клиенты, так и регистрационные органы' }],
    },
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
  const name = params?.name as string;
  return {
    props: {
      name,
      ...PAGE_DATA_MAP[name],
    },
  };
};

export default function Service({ pageTitle, name, subtitles, titleImg, howInfo, prices, benefits }: InferGetStaticPropsType<typeof getStaticProps>) {
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
        {!!howInfo && (
          <HowInfo>
            <HowInfoHeader>
              <HowInfoTitle>{howInfo.title}</HowInfoTitle>
              {howInfo.description && <HowInfoDescription>{howInfo.description}</HowInfoDescription>}
            </HowInfoHeader>
            <HowInfoItems>
              {howInfo.howItems.map((howItem) => (
                <HowInfoItem key={howItem.title} title={howItem.title} minutes={howItem.time} description={howItem.description} />
              ))}
            </HowInfoItems>
          </HowInfo>
        )}
        <Prices>
          <PricesHeader>{prices?.title}</PricesHeader>
          <PricesDescription>{prices?.description}</PricesDescription>
        </Prices>
        <section className={styles.why}>
          <div className="container">
            <div className="top top_center">
              <div className="top__left">
                <div className="sub t3">
                  Преимущества
                </div>
                <h2 className="h2 title">
                  {benefits?.title}
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.why__items}>
            <div className={classNames('container', styles.container)}>
              {benefits?.items.map((benefitItem, index) => (
                <div key={benefitItem.title} className={styles.why__item}>
                  <div className={styles['why__item-top']}>
                    <div className={classNames(styles['why__item-top-num'], 'h5')}>
                      0{index + 1}
                    </div>
                    <h3 className={classNames(styles['why__item-top-title'], 'h5')}>
                      {benefitItem.title}
                    </h3>
                  </div>
                  <p className={classNames(styles['why__item-p'], 't2')}>
                    {benefitItem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}