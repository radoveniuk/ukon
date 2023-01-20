import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Footer from 'common/components/Footer';
import Position, { PositionItem } from 'common/components/Position';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import styles from 'styles/404.module.scss';

export const getStaticProps: GetStaticProps = async ({ locale }) => {

  return {
    props: { ...(await serverSideTranslations(locale || 'ru', ['404', 'common'])) },
  };
};

export default function NotFoundPage () {
  const translation = useTranslation('404');
  const commonTranslation = useTranslation('common');
  const t = (path: string) => translation.t(`404:${path}`);
  return (
    <>
      <NextSeo
        title={'Úkon.sk | 404'}
        description={t('pageTitle')}
      />
      <main>
        <Position>
          <PositionItem href="/">{commonTranslation.t('mainPage')}</PositionItem>
          <PositionItem href="">{t('pageTitle')}</PositionItem>
        </Position>
        <div className={classNames('container', styles.container, styles['not-found__cont'], 'mb')}>
          <div className={styles['not-found__left']}>
            <div className={classNames(styles['not-found__cont__title'], 'h2')}>{t('pageTitle')}</div>
            <div className={classNames(styles['not-found__cont__text'], 'body')}>{t('sorry')}</div>
            <Link href="/" className="btn btn-text">{t('return')}</Link>
          </div>
          <div className={styles['not-found__right']}>
            <Image width={711} height={486} className={styles['not-found__right-img']} src="/images/404.svg" alt="404" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}