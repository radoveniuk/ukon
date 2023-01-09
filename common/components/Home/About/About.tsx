import classNames from 'classnames';
import Lottie from 'lottie-react';

import animation from './lottie.json';

import styles from 'styles/components/home/About.module.scss';

export default function About() {
  return (
    <section className={classNames(styles.about, 'mb')}>
      <div className={classNames(styles.container, 'container')}>
        <div className={styles.about__img}>
          <Lottie animationData={animation} loop={true} />
        </div>
        <div className={styles.about__text}>
          <div className="top">
            <div className="top__left">
              <div className="sub t3">
                КОМПАНИЯ
              </div>
              <h2 className="h2 title">
                О нас
              </h2>
            </div>
          </div>
          <p className={classNames(styles['about-p'], 'body')}>
            Идея сервиса Úkon принадлежит компании Parko Limited s.r.o. За два года мы помогли найти работу двум тысячам соискателей. Мы обеспечили работниками несколько десятков предприятий и успешно продолжаем это делать.
            <br/>
            <br/>
            Наши сотрудники провели в очередях в различных инстанциях более 500 часов и подтверждают, что соседняя очередь всегда движется быстрее. Такие понятия, как вечность и бесконечность, начинаешь осознавать после того, как уладишь какое-нибудь дело в государственных органах. Позвольте нам сэкономить ваше время и нервы. Úkon создает условия для вашего бизнеса. Наш девиз – у репутации нет конкурентов. Доверьтесь нам, и вы в этом убедитесь.
          </p>
          <div className={styles.about__items}>
            <div className={styles.about__item}>
              <div className={classNames(styles['about__item-num'], 'h1')}>
                1276
              </div>
              <div className={styles['about__item-sub']}>
                заяв было обработано по ИП
              </div>
            </div>
            <div className={styles.about__item}>
              <div className={classNames(styles['about__item-num'], 'h1', 'numbers-js')}>
                1271
              </div>
              <div className={styles['about__item-sub']}>
                Заяв было обработано по ООО
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}