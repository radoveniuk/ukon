import classNames from 'classnames';
import HowInfo, { HowInfoDescription, HowInfoHeader, HowInfoItem, HowInfoItems, HowInfoTitle } from 'common/components/HowInfo';
import Position, { PositionItem } from 'common/components/Position';
import Prices, { PricesDescription, PricesHeader } from 'common/components/Prices';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import styles from 'styles/Service.module.scss';
import { iterateMap } from 'common/utils/common';
import React from 'react';

type PageContent = {
  subtitles?: number;
  howItems?: number;
  titleImg: string;
  benefits?: number;
  benefitsTable?: {
    cols: number,
    rows: number
  }
}

const PAGE_DATA_MAP: { [key: string]: PageContent } = {
  'create-ooo': {
    subtitles: 5,
    titleImg: '/images/service/create-ooo.png',
    howItems: 4,
    benefits: 6,
    benefitsTable: {
      cols: 2,
      rows: 5,
    },
  },
  'create-ip': {
    subtitles: 6,
    howItems: 4,
    titleImg: '/images/service/create-ooo.png',
    benefits: 6,
  },
  'update-ooo': {
    titleImg: '/images/service/create-ooo.png',
  },
  'update-ip': {
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
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ name: string } & PageContent> = async ({ params, locale = 'ru' }) => {
  const name = params?.name as string;
  return {
    props: {
      name,
      ...PAGE_DATA_MAP[name],
      ...(await serverSideTranslations(locale, ['services'])),
    },
  };
};

export default function Service({ name, subtitles, titleImg, howItems, benefits, benefitsTable }: InferGetStaticPropsType<typeof getStaticProps>) {
  const translation = useTranslation('services');
  const t = (path: string) => translation.t(`services:${name}:${path}`);

  return (
    <>
      <Head>
        <title>Úkon.sk - Информация</title>
        <meta name="description" content={`Úkon.sk - ${t('pageTitle')}`} />
      </Head>
      <main>
        <Position>
          <PositionItem href='/'>Главная</PositionItem>
          <PositionItem href={`/services/${name}`}>{t('pageTitle')}</PositionItem>
        </Position>
        <section className={styles.service}>
          <div className={classNames('container', styles.container)}>
            <div className={styles.service__text}>
              <h1 className={classNames('h2', styles['service-title'])}>
                {t('pageTitle')}
              </h1>
              <Image width={696} height={696} src={titleImg} alt="" priority />
              <ul>
                {iterateMap(subtitles || 0, (index) => (
                  <li key={index} className="body fade-in">
                    {t(`subtitles.${index}`)}
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
        <HowInfo>
          <HowInfoHeader>
            <HowInfoTitle>{t('howInfo:title')}</HowInfoTitle>
            <HowInfoDescription>{t('howInfo:description')}</HowInfoDescription>
          </HowInfoHeader>
          <HowInfoItems>
            {iterateMap(howItems, (index) => (
              <HowInfoItem key={index} title={t(`howInfo:howItems.${index}:title`)} description={t(`howInfo:howItems.${index}:description`)} />
            ))}
          </HowInfoItems>
        </HowInfo>
        <Prices>
          <PricesHeader>{t('prices:title')}</PricesHeader>
          <PricesDescription>{t('prices:description')}</PricesDescription>
        </Prices>
        <section className={styles.why}>
          <div className="container">
            <div className="top top_center">
              <div className="top__left">
                <div className="sub t3">
                  Преимущества
                </div>
                <h2 className="h2 title">
                  {(t('benefits:title'))}
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.why__items}>
            <div className={classNames('container', styles.container)}>
              {iterateMap(benefits, (index) => (
                <div key={index} className={styles.why__item}>
                  <div className={styles['why__item-top']}>
                    <div className={classNames(styles['why__item-top-num'], 'h5')}>
                      0{index + 1}
                    </div>
                    <h3 className={classNames(styles['why__item-top-title'], 'h5')}>
                      {t(`benefits.items.${index}.title`)}
                    </h3>
                  </div>
                  <p className={classNames(styles['why__item-p'], 't2')}>
                    {t(`benefits.items.${index}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={classNames(styles.table, 'mb')}>
          <div className="container">
            <div className={styles.table__table}>
              <div className={styles.table__titles}>
                <div className={classNames(styles['table-title'], 'h5')}>
                  {t('benefitsTable.cols.0')}
                </div>
                <div className={classNames(styles['table-title'], 'h5')}>
                  {t('benefitsTable.cols.1')}
                </div>
              </div>
              {iterateMap(benefitsTable?.rows, (index) => (
                <React.Fragment key={index}>
                  <div className={classNames(styles.table__sub, 't1')}>
                    {t(`benefitsTable.rows.${index}.sub`)}
                  </div>
                  <div className={styles.table__elements}>
                    <div className={classNames(styles.table__el, 't1')}>
                      {t(`benefitsTable.rows.${index}.cells.0`)}
                    </div>
                    <div className={classNames(styles.table__el, 't1')}>
                      {t(`benefitsTable.rows.${index}.cells.1`)}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
        <section className={classNames(styles.faq, 'mb')}>
          <div className="container">
            <div className="top top_center">
              <div className="top__left">
                <div className="sub t3">
                  FAQ
                </div>
                <h2 className="h2 title">
                  {t('faq.title')}
                </h2>
              </div>
            </div>
            <div className="faq__items">
              <div className="faq__rows">
                <div className="faq__item fade-in">
                  <div className="faq__item-top">
                    <span className="t1">
                      Какие документы нужны для открытия ООО?
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className="faq__item-top-minus" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className="faq__item-bot t2">
                            Все принятые заказы до 14:00 будут сложены и отправлены в этот же день. *исключение составляют воскресение и предпраздничные дни. Сроки обработки заказов в этом случае публикуются на главной странице сайта
                  </div>
                </div>
                <div className="faq__item fade-in">
                  <div className="faq__item-top">
                    <span className="t1">
                            Нужно ли иметь удостоверение с чипом и электронной подписью
для открытия ООО в Словакии онлайн?
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className="faq__item-top-minus" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className="faq__item-bot t2">
                            Все принятые заказы до 14:00 будут сложены и отправлены в этот же день. *исключение составляют воскресение и предпраздничные дни. Сроки обработки заказов в этом случае публикуются на главной странице сайта
                  </div>
                </div>
                <div className="faq__item fade-in">
                  <div className="faq__item-top">
                    <span className="t1">
                          Нужно ли приходить к нам в офис для оформления документов?
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className="faq__item-top-minus" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className="faq__item-bot t2">
                            Все принятые заказы до 14:00 будут сложены и отправлены в этот же день. *исключение составляют воскресение и предпраздничные дни. Сроки обработки заказов в этом случае публикуются на главной странице сайта
                  </div>
                </div>
                <div className="faq__item fade-in">
                  <div className="faq__item-top">
                    <span className="t1">
                        Сколько денег нужно, чтобы открыть ООО в Словакии?
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className="faq__item-top-minus" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className="faq__item-bot t2">
                            Все принятые заказы до 14:00 будут сложены и отправлены в этот же день. *исключение составляют воскресение и предпраздничные дни. Сроки обработки заказов в этом случае публикуются на главной странице сайта
                  </div>
                </div>
                <div className="faq__item fade-in">
                  <div className="faq__item-top">
                    <span className="t1">
                         Какая итоговая цена открытия ООО в Úkon?
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className="faq__item-top-minus" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className="faq__item-bot t2">
                            Все принятые заказы до 14:00 будут сложены и отправлены в этот же день. *исключение составляют воскресение и предпраздничные дни. Сроки обработки заказов в этом случае публикуются на главной странице сайта
                  </div>
                </div>
              </div>
              <div className="faq__rows">
                <div className="faq__item fade-in">
                  <div className="faq__item-top">
                    <span className="t1">
                           Сколько времени занимает регистрация ООО с помощью Úkon?
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className="faq__item-top-minus" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className="faq__item-bot t2">
                            Все принятые заказы до 14:00 будут сложены и отправлены в этот же день. *исключение составляют воскресение и предпраздничные дни. Сроки обработки заказов в этом случае публикуются на главной странице сайта
                  </div>
                </div>
                <div className="faq__item fade-in">
                  <div className="faq__item-top">
                    <span className="t1">
                            Как проходит процедура открытия ООО онлайн?
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className="faq__item-top-minus" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className="faq__item-bot t2">
                            Все принятые заказы до 14:00 будут сложены и отправлены в этот же день. *исключение составляют воскресение и предпраздничные дни. Сроки обработки заказов в этом случае публикуются на главной странице сайта
                  </div>
                </div>
                <div className="faq__item fade-in">
                  <div className="faq__item-top">
                    <span className="t1">
                            Можно ли ускорить процедуру регистрации ООО?
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className="faq__item-top-minus" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className="faq__item-bot t2">
                            Все принятые заказы до 14:00 будут сложены и отправлены в этот же день. *исключение составляют воскресение и предпраздничные дни. Сроки обработки заказов в этом случае публикуются на главной странице сайта
                  </div>
                </div>
                <div className="faq__item fade-in">
                  <div className="faq__item-top">
                    <span className="t1">
                            Как я узнаю, что мое ООО готово?
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className="faq__item-top-minus" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div className="faq__item-bot t2">
                            Все принятые заказы до 14:00 будут сложены и отправлены в этот же день. *исключение составляют воскресение и предпраздничные дни. Сроки обработки заказов в этом случае публикуются на главной странице сайта
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}