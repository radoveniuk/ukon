import classNames from 'classnames';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Position, { PositionItem } from 'common/components/Position';
import { Post } from 'common/types/blog';

import { getPosts } from './api/posts';

import styles from 'styles/Blog.module.scss';
import { DateTime } from 'luxon';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async ({ locale='ru' }) => {
  const posts = await getPosts(12);

  return {
    props: { posts, ...(await serverSideTranslations(locale, ['common'])) },
  };
};

export default function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Úkon.sk - блог</title>
        <meta name="description" content="Úkon.sk - blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Position>
          <PositionItem href="/">Главная</PositionItem>
          <PositionItem href="">Блог</PositionItem>
        </Position>
        <section className={classNames(styles.blog, 'mb')}>
          <div className="container">
            <div className="top">
              <h2 className="h2 title">
                Блог
              </h2>
            </div>
            <div className={styles.articles__items}>
              {posts.map((post) => (
                <div key={post._id} className={styles.blog__slide}>
                  <div className={styles['blog__slide-img']}>
                    <Image fill src={post.image} alt="" />
                  </div>
                  <h3 className={classNames(styles['blog__slide-title'], 't1')}>
                    {post.title}
                  </h3>
                  <div className={classNames(styles['blog__slide-date'], 't3')}>
                    {post.createdAt && DateTime.fromISO(post.createdAt).toFormat('dd.MM.yyyy')}
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              <div className="pagination-btn">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967C11.2374 7.17678 10.7626 7.17678 10.4697 7.46967L6.46967 11.4697C6.32322 11.6161 6.25 11.8081 6.25 12C6.25 12.1017 6.27024 12.1987 6.30691 12.2871C6.34351 12.3755 6.39776 12.4584 6.46967 12.5303L10.4697 16.5303C10.7626 16.8232 11.2374 16.8232 11.5303 16.5303C11.8232 16.2374 11.8232 15.7626 11.5303 15.4697L8.81066 12.75H18.5C18.9142 12.75 19.25 12.4142 19.25 12C19.25 11.5858 18.9142 11.25 18.5 11.25H8.81066L11.5303 8.53033Z" fill="#717171"/>
                </svg>
              </div>
              <div className="pagination-numbers">
                <a href="" className="t1">
                  1
                </a>
                <a href="" className="t2">
                  2
                </a>
                <a href="" className="t2">
                  3
                </a>
                <a href="" className="t2">
                  ...
                </a>
                <a href="" className="t2">
                  12
                </a>
              </div>
              <div className="pagination-btn">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.9697 8.53033C13.6768 8.23744 13.6768 7.76256 13.9697 7.46967C14.2626 7.17678 14.7374 7.17678 15.0303 7.46967L19.0303 11.4697C19.3232 11.7626 19.3232 12.2374 19.0303 12.5303L15.0303 16.5303C14.7374 16.8232 14.2626 16.8232 13.9697 16.5303C13.6768 16.2374 13.6768 15.7626 13.9697 15.4697L16.6893 12.75H7C6.58579 12.75 6.25 12.4142 6.25 12C6.25 11.5858 6.58579 11.25 7 11.25H16.6893L13.9697 8.53033Z" fill="#717171"/>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}