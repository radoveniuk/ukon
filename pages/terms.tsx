import Head from 'next/head';

import Position, { PositionItem } from 'common/components/Position';
import SeoText, { SeoTextBody, SeoTextTitle } from 'common/components/PageSections/SeoText';

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
    </>
  );
}