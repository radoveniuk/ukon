import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Position, { PositionItem } from 'common/components/Position';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: ['create-company', 'create-individual', 'update-company', 'update-individual', 'v-adress'].flatMap((pageName) => {
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

export const getStaticProps: GetStaticProps = async ({ locale = 'ru' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forms'])),
    },
  };
};

export default function Service({ name }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Úkon.sk - Формирование стоимости</title>
        <meta name="description" content={'Úkon.sk - Формирование стоимости'} />
      </Head>
      <main>
        <Position>
          <PositionItem href="/">Главная</PositionItem>
          <PositionItem href={`/services/${name}`}>Формирование стоимости</PositionItem>
        </Position>
      </main>
    </>
  );
}