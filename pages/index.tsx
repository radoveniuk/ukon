import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Úkon.sk</title>
        <meta name="description" content="Úkon.sk - home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
      </main>
    </>
  );
};
