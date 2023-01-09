import classNames from 'classnames';
import Lottie from 'lottie-react';
import TypewriterComponent from 'typewriter-effect';

import animation from './lottie.json';

import styles from 'styles/components/home/Hero.module.scss';

export default function Hero() {

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
          <div className="btn btn-text open-pop-1">Оформить заявку</div>
        </div>
        <div className={styles.hero__img}>
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </section>
  );
}