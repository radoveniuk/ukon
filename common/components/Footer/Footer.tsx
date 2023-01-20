import Link from 'next/link';
import classNames from 'classnames';

import styles from 'styles/components/Footer.module.scss';

import Logo from '../Logo';

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <div className={classNames('container', styles.container)}>
        <div className={styles.footer__top}>
          <Link href="/" className={styles.footer__logo}>
            <Logo />
          </Link>
          <ul className={styles.footer__menu}>
            <li className={styles.footer__link}>
              <Link href="/services/create-individual" className="t1">Регистрация ИП</Link>
            </li>
            <li className={styles.footer__link}>
              <Link href="/services/create-company" className="t1">Регистрация ООО</Link>
            </li>
            <li className={styles.footer__link}>
              <Link href="/services/v-adress" className="t1">Виртуальный адрес</Link>
            </li>
            <li className={styles.footer__link}>
              <Link href="/services/update-individual" className="t1">Внесение изменений в ИП</Link>
            </li>
            <li className={styles.footer__link}>
              <Link href="/services/update-company" className="t1">Внесение изменений в ООО</Link>
            </li>
            <li className={styles.footer__link}>
              <Link href="/terms" className="t1">Условия использования</Link>
            </li>
          </ul>
          <div className={styles.footer__contacts}>
            <a href="tel:+421 918 384 166" className={classNames(styles.footer__contacts, 't2')}>+421 918 384 166</a>
            <a href="mailto:info@ukon.sk" className={classNames(styles.footer__contacts, 't2')}>info@ukon.sk</a>
            <span className={classNames(styles.footer__contacts, 't2')}>Время работы: 9:00 - 18:00</span>
          </div>
          <div className={styles.footer__mob}>
            <div className={styles['footer__mob-col']}>
              <div className={styles.footer__link}>
                <a href="" className="t1">Регистрация ИП</a>
              </div>
              <div className={styles.footer__link}>
                <a href="" className="t1">Внесение изменений в ИП</a>
              </div>
              <div className={styles.footer__link}>
                <a href="" className="t1">Регистрация ООО</a>
              </div>
              <div className={styles.footer__link}>
                <a href="" className="t1">Внесение изменений в ООО</a>
              </div>
            </div>
            <div className={styles['footer__mob-col']}>
              <div className={styles.footer__link}>
                <a href="" className="t1">Виртуальный адрес</a>
              </div>
              <a href="tel:+421 918 384 166" className={classNames(styles.footer__contacts, 't2')}>+421 918 384 166</a>
              <a href="" className={classNames(styles.footer__contacts, 't2')}>info@ufon.com</a>
              <a href="" className={classNames(styles.footer__contacts, 't2')}>Время работы: 9:00 - 18:00</a>
            </div>
          </div>
          <div className={styles.footer__socials}>
            <a href="" className={styles.footer__social}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9997 6.99956C15.9997 6.44727 16.4474 5.99956 16.9997 5.99956C17.552 5.99956 17.9997 6.44727 17.9997 6.99956C17.9997 7.55184 17.552 7.99956 16.9997 7.99956C16.4474 7.99956 15.9997 7.55184 15.9997 6.99956Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 7.24956C9.37634 7.24956 7.24969 9.3762 7.24969 11.9996C7.24969 14.6229 9.37634 16.7496 11.9997 16.7496C14.623 16.7496 16.7497 14.6229 16.7497 11.9996C16.7497 9.3762 14.623 7.24956 11.9997 7.24956ZM8.74969 11.9996C8.74969 10.2046 10.2048 8.74956 11.9997 8.74956C13.7946 8.74956 15.2497 10.2046 15.2497 11.9996C15.2497 13.7945 13.7946 15.2496 11.9997 15.2496C10.2048 15.2496 8.74969 13.7945 8.74969 11.9996Z" fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M17.2579 2.83257C13.7914 2.44513 10.208 2.44513 6.74146 2.83257C4.72941 3.05745 3.10507 4.64246 2.86852 6.66499C2.45398 10.2093 2.45398 13.7898 2.86852 17.3341C3.10507 19.3567 4.72941 20.9417 6.74146 21.1665C10.208 21.554 13.7914 21.554 17.2579 21.1665C19.27 20.9417 20.8943 19.3567 21.1309 17.3341C21.5454 13.7898 21.5454 10.2093 21.1309 6.66499C20.8943 4.64246 19.27 3.05745 17.2579 2.83257ZM6.90807 4.32329C10.2639 3.94823 13.7355 3.94823 17.0913 4.32329C18.4214 4.47195 19.4869 5.52156 19.641 6.83924C20.042 10.2678 20.042 13.7313 19.641 17.1599C19.4869 18.4775 18.4214 19.5272 17.0913 19.6758C13.7355 20.0509 10.2639 20.0509 6.90807 19.6758C5.57797 19.5272 4.51248 18.4775 4.35837 17.1599C3.95737 13.7313 3.95737 10.2678 4.35837 6.83924C4.51248 5.52156 5.57797 4.47195 6.90807 4.32329Z" fill="black"/>
              </svg>
            </a>
            <a href="" className={styles.footer__social}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4877 3.78769C11.4723 2.80312 12.8076 2.25 14.2 2.25H16.9C17.3142 2.25 17.65 2.58579 17.65 3V6.6C17.65 7.01421 17.3142 7.35 16.9 7.35H14.2C14.1602 7.35 14.1221 7.3658 14.0939 7.39393C14.0658 7.42206 14.05 7.46022 14.05 7.5V9.45H16.9C17.131 9.45 17.349 9.5564 17.4912 9.73844C17.6333 9.92048 17.6836 10.1578 17.6276 10.3819L16.7276 13.9819C16.6441 14.3158 16.3442 14.55 16 14.55H14.05V21C14.05 21.4142 13.7142 21.75 13.3 21.75H9.7C9.28579 21.75 8.95 21.4142 8.95 21V14.55H7C6.58579 14.55 6.25 14.2142 6.25 13.8V10.2C6.25 9.78579 6.58579 9.45 7 9.45H8.95V7.5C8.95 6.10761 9.50312 4.77226 10.4877 3.78769ZM14.2 3.75C13.2054 3.75 12.2516 4.14509 11.5483 4.84835C10.8451 5.55161 10.45 6.50544 10.45 7.5V10.2C10.45 10.6142 10.1142 10.95 9.7 10.95H7.75V13.05H9.7C10.1142 13.05 10.45 13.3858 10.45 13.8V20.25H12.55V13.8C12.55 13.3858 12.8858 13.05 13.3 13.05H15.4144L15.9394 10.95H13.3C12.8858 10.95 12.55 10.6142 12.55 10.2V7.5C12.55 7.06239 12.7238 6.64271 13.0333 6.33327C13.3427 6.02384 13.7624 5.85 14.2 5.85H16.15V3.75H14.2Z" fill="black"/>
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.footer__bot}>
          <div className={classNames(styles['footer__bot-left'], 't5')}>Copyright © 2022 | Úkon.sk</div>
        </div>
      </div>
    </footer>
  );
}