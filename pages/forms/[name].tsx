import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import CreateIndividualForm from 'common/components/OrderForm/modules/CreateIndividualForm';
import UpdateIndividualForm from 'common/components/OrderForm/modules/UpdateIndividualForm';
import VirtualAddressForm from 'common/components/OrderForm/modules/VirtualAddressForm';
import Position, { PositionItem } from 'common/components/Position';

import styles from 'styles/OrderForm.module.scss';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: ['create-company', 'create-individual', 'update-company', 'update-individual', 'v-address'].flatMap((pageName) => {
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

export const getStaticProps: GetStaticProps = async ({ locale = 'ru', params }) => {
  return {
    props: {
      name: params?.name as string,
      ...(await serverSideTranslations(locale, ['common', 'forms', 'address', 'docs'])),
    },
  };
};

export default function Form({ name }: InferGetStaticPropsType<typeof getStaticProps>) {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:${name}:${path}`);

  return (
    <>
      <NextSeo
        title={`Úkon.sk | ${t('pageTitle')}`}
        description={t('pageTitle')}
      />
      <main>
        <Position>
          <PositionItem href="/">Главная</PositionItem>
          <PositionItem href={`/forms/${name}`}>{t('pageTitle')}</PositionItem>
        </Position>
        <section className={styles.reg}>
          {name === 'create-individual' && <CreateIndividualForm />}
          {name === 'update-individual' && <UpdateIndividualForm />}
          {name === 'v-address' && <VirtualAddressForm />}
        </section>
      </main>
    </>
  );
}