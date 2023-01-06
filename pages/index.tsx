import Head from 'next/head';
import Header from '../common/components/Header';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Úkon.sk</title>
        <meta name="description" content="Úkon.sk - home page" />
      </Head>
      <Header />
      <main className={styles.main}>
      </main>
    </>
  )
};
