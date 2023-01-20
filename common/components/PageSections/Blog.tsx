import Image from 'next/image';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Post } from 'common/types/blog';

import styles from 'styles/components/home/Blog.module.scss';

import 'swiper/css';

type Props = {
  posts: Post[];
};

export default function Blog ({ posts }: Props) {
  return (
    <>
      <section className={classNames(styles.blog, 'mb')}>
        <div className="container">
          <div className="top">
            <div className="top__left">
              <div className="sub t3">
              БЛОГ
              </div>
              <h2 className="h2 title">
              Полезная информация
              </h2>
            </div>
            <div className="btn-transparent btn-text fade-in">
            Все новости
            </div>
          </div>
          <div className={styles.blog__slider}>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              breakpoints={{
                1279: {
                  spaceBetween: 30,
                  slidesPerView: 4,
                },
                999: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                759: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
              }}
            >
              {posts.map((post) => (
                <SwiperSlide key={post._id} className={styles.blog__slide}>
                  <div className={styles['blog__slide-img']}>
                    <Image fill src={post.image} alt="" />
                  </div>
                  <h3 className={classNames(styles['blog__slide-title'], 't1')}>
                    {post.title}
                  </h3>
                  <div className="blog__slide-date t3">
                    {post.createdAt && DateTime.fromISO(post.createdAt).toFormat('dd.MM.yyyy')}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
          <div className="swiper-pagination"></div>
          <div className="btn-transparent bot-btn btn-text fade-in">
          Все новости
          </div>
        </div>
      </section>
    </>
  );
}