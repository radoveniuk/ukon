import React, { useState } from 'react';
import classNames from 'classnames';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Position, { PositionItem } from 'common/components/Position';
import Prices, { PricesDescription, PricesHeader } from 'common/components/PageSections/Prices';
import HowInfo, { HowInfoDescription, HowInfoHeader, HowInfoItem, HowInfoItems, HowInfoTitle } from 'common/components/PageSections/HowInfo';
import BenefitsTable, { BenefitsTableCell, BenefitsTableHeader, BenefitsTableHeaderColumn, BenefitsTableRow } from 'common/components/PageSections/BenefitsTable';
import { iterateMap } from 'common/utils/common';
import Contacts from 'common/components/PageSections/Contacts';
import Blog from 'common/components/PageSections/Blog';
import { Post } from 'common/types/blog';
import { getPosts } from 'pages/api/posts';

import styles from 'styles/Service.module.scss';
import SeoText, { SeoTextBody, SeoTextTitle } from 'common/components/PageSections/SeoText';

type PageContent = {
  subtitles?: number;
  howItems?: number;
  titleImg: string;
  benefits?: number;
  benefitsTable?: {
    cols: number,
    rows: number
  }
  faqItems?: number;
  seoText: boolean;
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
    faqItems: 9,
    seoText: true,
  },
  'create-ip': {
    subtitles: 6,
    howItems: 4,
    titleImg: '/images/service/create-ooo.png',
    benefits: 6,
    faqItems: 9,
    seoText: true,
  },
  'update-ooo': {
    titleImg: '/images/service/create-ooo.png',
    subtitles: 5,
    howItems: 4,
    benefits: 6,
    faqItems: 10,
    seoText: false,
  },
  'update-ip': {
    titleImg: '/images/service/create-ooo.png',
    subtitles: 5,
    howItems: 4,
    benefits: 6,
    faqItems: 6,
    seoText: false,
  },
  'v-adress': {
    titleImg: '/images/service/create-ooo.png',
    subtitles: 2,
    howItems: 4,
    benefits: 6,
    faqItems: 6,
    seoText: false,
  },
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: Object.keys(PAGE_DATA_MAP).flatMap((pageName) => {
      return [
        { params: { name: pageName }, locale: 'ru' },
        { params: { name: pageName }, locale: 'uk' },
        { params: { name: pageName }, locale: 'en-US' },
        { params: { name: pageName }, locale: 'sk' },
      ];
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ name: string; posts: Post[] } & PageContent> = async ({ params, locale = 'ru' }) => {
  const name = params?.name as string;
  const posts = await getPosts();
  return {
    props: {
      name,
      ...PAGE_DATA_MAP[name],
      ...(await serverSideTranslations(locale, ['services'])),
      posts,
    },
  };
};

export default function Service({ name, subtitles, titleImg, howItems, benefits, benefitsTable, faqItems, posts, seoText }: InferGetStaticPropsType<typeof getStaticProps>) {
  const translation = useTranslation('services');
  const t = (path: string) => translation.t(`services:${name}:${path}`);

  const [activeFaqItem, setActiveFaqItem] = useState<null | number>(null);

  return (
    <>
      <Head>
        <title>Úkon.sk - Информация</title>
        <meta name="description" content={`Úkon.sk - ${t('pageTitle')}`} />
      </Head>
      <main>
        <Position>
          <PositionItem href="/">Главная</PositionItem>
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
        {!!benefitsTable && (
          <section className="mb">
            <BenefitsTable>
              <BenefitsTableHeader>
                <BenefitsTableHeaderColumn>{t('benefitsTable.cols.0')}</BenefitsTableHeaderColumn>
                <BenefitsTableHeaderColumn>{t('benefitsTable.cols.2')}</BenefitsTableHeaderColumn>
              </BenefitsTableHeader>
              {iterateMap(benefitsTable?.rows, (index) => (
                <BenefitsTableRow title={t(`benefitsTable.rows.${index}.sub`)} key={index}>
                  <BenefitsTableCell>
                    {t(`benefitsTable.rows.${index}.cells.0`)}
                  </BenefitsTableCell>
                  <BenefitsTableCell>
                    {t(`benefitsTable.rows.${index}.cells.1`)}
                  </BenefitsTableCell>
                </BenefitsTableRow>
              ))}
            </BenefitsTable>
          </section>
        )}
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
            <div className={styles.faq__items}>
              {iterateMap(faqItems, (index) => (
                <div key={index} className={classNames(styles.faq__item, activeFaqItem === index ? styles.active : '')} onClick={() => setActiveFaqItem((prev) => prev === index ? null : index)}>
                  <div className={styles['faq__item-top']}>
                    <span className="t1">
                      {t(`faq.items.${index}.q`)}
                    </span>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 4.5V14.5M4 9.5H14" stroke="#131313" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg className={styles['faq__item-top-minus']} width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 9.5H14" stroke="#131313" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={classNames(styles['faq__item-bot'], 't2')}>
                    {t(`faq.items.${index}.q`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Contacts />
        <Blog posts={posts} />
        {seoText && (
          <SeoText>
            <SeoTextTitle>{t('seoText.title')}</SeoTextTitle>
            <SeoTextBody dangerouslySetInnerHTML={{ __html: t('seoText.text') }} />
          </SeoText>
        )}
      </main>
    </>
  );
}