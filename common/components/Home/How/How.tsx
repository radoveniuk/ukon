import classNames from 'classnames';

import styles from 'styles/components/home/How.module.scss';

export default function How() {
  return (
    <section className={classNames(styles.how, 'mb')}>
      <div className="container">
        <div className="top">
          <div className="top__left">
            <div className="sub t3">Как это работает</div>
            <h2 className="h2 title">
              Как зарегистрировать ИП/ООО<br />
              в Словакии онлайн
            </h2>
          </div>
          <div className="btn btn-text open-pop-1 fade-in">
            Оформить заявку
          </div>
        </div>
        <div className={styles.how__items}>
          <div className={styles.how__item}>
            <svg width="96" height="84" viewBox="0 0 96 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M-3.66007e-06 0L0.119642 21.1999C0.332949 48.4402 0.386287 49.76 1.50614 53.7193C5.5056 67.973 16.7041 78.2145 32.8085 82.385C37.2346 83.5464 39.581 83.8104 46.4067 83.9687C51.846 84.0743 55.9521 83.9159 58.4051 83.4408C70.0302 81.2236 77.9758 77.2114 84.6415 70.2958C91.254 63.3801 94.3469 56.7284 95.4134 47.1204C95.7334 44.2169 96 31.4414 96 17.7684C96 9.73905 95.9951 4.07916 95.9032 -4.20545e-06L-3.66007e-06 0Z" fill="#F3EADA"/>
            </svg>
            <p className={classNames(styles['how__item-title'], 'h4')}>
              1. Заполнение<br />
              персональных данных<br />
              <span>15 мин</span>
            </p>
            <p className={classNames(styles['how__item-p'], 'body')}>
              Нажмите на зеленую кнопку под надписью «Я хочу начать бизнес». Вы попадете в форму, где вы выбираете, чем вы хотите заниматься в бизнесе.
            </p>
            <div className={styles['how-circle']}></div>
          </div>
          <div className={styles.how__item}>
            <svg width="97" height="84" viewBox="0 0 97 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M75.7311 18.3618C61.9647 21.9483 6.45888 42.706 3.70561 45.2056C0.621952 48.2486 -0.809747 54.0086 0.621952 58.1384C1.72326 61.2901 8.3311 65.4199 12.4059 65.4199C16.1504 65.4199 85.0922 50.3135 88.286 48.792C98.7484 43.7928 98.6383 24.9913 88.0657 19.992C84.5415 18.2532 78.8147 17.4924 75.7311 18.3618Z" fill="#678EBE"/>
            </svg>
            <p className={classNames(styles['how__item-title'], 'h4')}>
              2. Выбор <br />
              вида деятельности<br />
              <span>5 мин</span>
            </p>
            <p className={classNames(styles['how__item-p'], 'body')}>
              После создания заявки на открытие сделки мы сразу же отправим вам письмо с заполненной заявкой. Все, что вам нужно сделать, это подписать его.
            </p>
            <div className={styles['how-circle']}></div>
          </div>
          <div className={styles.how__item}>
            <svg width="96" height="84" viewBox="0 0 96 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M38.3275 0.760256C24.7815 3.63983 14.3059 11.6583 8.61655 23.3981C5.9525 28.9358 5.32035 31.9039 5.04943 39.7895C4.6882 49.9788 6.26857 56.3138 11.0548 64.3766C13.764 68.8953 20.1758 75.2304 24.7363 77.8885C32.5027 82.4515 40.4949 84.3121 50.2931 83.9577C59.7754 83.6033 66.6387 81.4769 74.0438 76.5594C81.7651 71.4205 88.2672 62.1173 90.7054 52.8583C91.9246 48.2953 92.3761 39.3908 91.6537 34.562C89.3057 18.7022 77.2046 5.67768 60.6784 1.20327C55.4858 -0.170068 43.7911 -0.435874 38.3275 0.760256Z" fill="#FFE7FF"/>
            </svg>
            <p className={classNames(styles['how__item-title'], 'h4')}>
              3. Подпись сгенерированных для вас документов<br />
              <span>2 мин</span>
            </p>
            <p className={classNames(styles['how__item-p'], 'body')}>
              Вам больше не нужны марки - выберите способ оплаты онлайн. После этого мы обработаем вашу заявку на открытие сделки, и вы сможете вести дела.
            </p>
            <div className={styles['how-circle']}></div>
          </div>
          <div className={styles.how__item}>
            <svg width="96" height="84" viewBox="0 0 96 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.1118 0.760254C19.6534 3.63982 9.24565 11.6583 3.59314 23.3981C0.946333 28.9358 0.318277 31.9039 0.0491098 39.7895C-0.30978 49.9788 1.26036 56.3138 6.01565 64.3766C8.70731 68.8953 15.0776 75.2304 19.6086 77.8885C27.3247 82.4515 35.2651 84.3121 45 83.9577V0.0353622C40.5523 -0.094429 35.9724 0.129906 33.1118 0.760254Z" fill="#C4FCF0"/>
            </svg>
            <p className={classNames(styles['how__item-title'], 'h4')}>
              4. Получить подтверждение успешной регистрации<br />
              <span>до 4 раб. дней</span>
            </p>
            <p className={classNames(styles['how__item-p'], 'body')}>
              При регистрации в офисе торговой лицензии мы автоматически обеспечим регистрацию в налоговой инспекции (карточка НДС).
            </p>
            <div className={styles['how-circle']}></div>
          </div>
        </div>
        <div className="btn bot-btn btn-text open-pop-1 fade-in">
          Оформить заявку
        </div>
      </div>
    </section>
  );
}