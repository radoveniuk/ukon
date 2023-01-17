import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import classNames from 'classnames';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

import Position, { PositionItem } from 'common/components/Position';

import styles from 'styles/OrderForm.module.scss';

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

export const getStaticProps: GetStaticProps = async ({ locale = 'ru', params }) => {
  return {
    props: {
      name: params?.name as string,
      ...(await serverSideTranslations(locale, ['common', 'forms'])),
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
          <div className={styles.reg__cont}>
            <div className={styles.reg__left}>
              <div className={classNames(styles['reg-title'], 'h2')}>
                {t('pageTitle')}
              </div>
            </div>
            <div className={styles.reg__right}>
              <div className={styles['reg__right-cont']}>
                <div className={styles['reg__right-change']}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.03642 17.3818H7.8546C8.80005 17.3818 9.67278 17.0182 10.3273 16.3636L17.8182 8.87273C18.9091 7.78182 18.9091 5.96364 17.8182 4.87273C17.3091 4.29091 16.5819 4 15.8546 4C15.1273 4 14.4001 4.29091 13.8182 4.8L6.32732 12.3636C5.67278 13.0182 5.30914 13.9636 5.30914 14.9091V16.7273C5.30914 17.0909 5.67278 17.3818 6.03642 17.3818ZM6.76369 14.8364C6.76369 14.2545 6.98187 13.7455 7.34551 13.3818L13.3091 7.41818L14.3273 8.36364C14.4728 8.50909 14.691 8.58182 14.8364 8.58182C15.0546 8.58182 15.2001 8.50909 15.3455 8.36364C15.6364 8.07273 15.6364 7.63636 15.3455 7.34545L14.3273 6.32727L14.8364 5.81818C15.1273 5.6 15.491 5.45455 15.8546 5.45455C16.2182 5.45455 16.5819 5.6 16.8001 5.89091C17.3091 6.4 17.3091 7.34545 16.8001 7.85455L9.30914 15.3455C8.94551 15.7091 8.36369 15.9273 7.8546 15.9273H6.76369V14.8364Z" fill="#717171"/>
                    <path d="M19.2727 18.5459H4.72727C4.29091 18.5459 4 18.8368 4 19.2732C4 19.7095 4.29091 20.0004 4.72727 20.0004H19.2727C19.7091 20.0004 20 19.7095 20 19.2732C20 18.8368 19.7091 18.5459 19.2727 18.5459Z" fill="#717171"/>
                  </svg>
                </div>
                <div className={classNames(styles['reg__right-title'], 'h4')}>
                  Корзина
                </div>
                <div className={styles['reg__right-rows']}>
                  <div className={styles['reg__right-row']}>
                    <div className={styles['reg__right-row-item']}>
                      <div className={styles['reg__right-row-item-left']}>
                        <div className={classNames(styles['reg__right-row-item-title'], 'body')}>
                          Оформление ИП
                        </div>
                      </div>
                      <div className={styles['reg__right-row-item-right']}>
                        <div className={classNames('reg__right-row-item-price', 'body')}>
                          19,00 €
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles['reg__right-sum']}>
                  <div className={classNames(styles['reg__right-sum-left'], 'h5')}>
                    Итого:
                  </div>
                  <div className={classNames(styles['reg__right-sum-right'], 'h5')}>
                    19,00 €
                  </div>
                </div>
              </div>
              <div className={styles['reg__right-img']}>
                <Image width={250} height={173} src="/images/form-order.png" alt="" />
              </div>
            </div>
          </div>
          <div className={classNames(styles['reg-next'], 'btn-text')}
            data-next-step="Следующий шаг"
            data-login="Войти"
            data-check="Проверка данных"
            data-end="Завершить оформление"
          >
            Следующий шаг
          </div>
        </section>
      </main>
    </>
  );
}