import Head from 'next/head';
import Hero from 'common/components/Home/Hero';
import How from 'common/components/Home/How';
import Services from 'common/components/Home/Services';
import We from 'common/components/Home/We';

export default function Home() {
  return (
    <>
      <Head>
        <title>Úkon.sk</title>
        <meta name="description" content="Úkon.sk - home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Hero />
        <How />
        <Services />
        <We />
      </main>
    </>
  );
};
