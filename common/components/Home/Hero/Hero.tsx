import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import Lottie from 'lottie-react';
import TypewriterComponent from 'typewriter-effect';

import { OrderModalOpener } from 'common/components/OrderModal';

import styles from 'styles/components/home/Hero.module.scss';

import animation from './lottie.json';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <div className={classNames(styles.container, 'container')}>
        <div className={styles.hero__text}>
          <h1 className={classNames(styles['hero-title'], 'h1')}>
            Регистрация ООО, ИП<br/>
            и виртуального адреса онлайн
            в Словакии —&nbsp;
            <br className={classNames(styles['hero-title-br'])} />
            <TypewriterComponent 
              options={{
                strings:['Úkon.sk'],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p className={classNames('body', styles['hero-p'])}>
            Зарегистрируйте свой бизнес с оформлением регистрационного/юридического адреса онлайн
          </p>
          <OrderModalOpener>
            <div className="btn btn-text open-pop-1">{t('orderBtn')}</div>
          </OrderModalOpener>
        </div>
        <div className={styles.hero__img}>
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </section>
  );
}