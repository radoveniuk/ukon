import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Footer from 'common/components/Footer';
import SeoText, { SeoTextBody, SeoTextTitle } from 'common/components/PageSections/SeoText';
import Position, { PositionItem } from 'common/components/Position';

export const getStaticProps: GetStaticProps = async ({ locale = 'ru' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function Terms () {
  return (
    <>
      <Head>
        <title>Úkon.sk - условия использования</title>
        <meta name="description" content="Úkon.sk - terms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Position>
          <PositionItem href="/">Главная</PositionItem>
          <PositionItem href="">Условия использования</PositionItem>
        </Position>
        <SeoText>
          <SeoTextTitle>Privacy policy</SeoTextTitle>
          <SeoTextBody>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, laboriosam explicabo deleniti aliquam, nostrum accusantium nobis dolores iste fugiat ad esse, tenetur porro ratione. Unde, suscipit! Magni eos ab quam.</SeoTextBody>
        </SeoText>
        <SeoText>
          <SeoTextTitle>Terms of use</SeoTextTitle>
          <SeoTextBody>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, laboriosam explicabo deleniti aliquam, nostrum accusantium nobis dolores iste fugiat ad esse, tenetur porro ratione. Unde, suscipit! Magni eos ab quam.</SeoTextBody>
        </SeoText>
        <SeoText>
          <SeoTextTitle>Cookies</SeoTextTitle>
          <SeoTextBody>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, laboriosam explicabo deleniti aliquam, nostrum accusantium nobis dolores iste fugiat ad esse, tenetur porro ratione. Unde, suscipit! Magni eos ab quam.</SeoTextBody>
        </SeoText>
      </main>
      <Footer />
    </>
  );
}