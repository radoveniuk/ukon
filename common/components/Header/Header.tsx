import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import DropdownIcon from '../icons/DropdownIcon';
import Logo from '../Logo';
import { OrderModalOpener } from '../OrderModal';

import styles from '../../../styles/components/Header.module.scss';

export default function Header () {
  const router = useRouter();
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [activeMobLink, setActiveMobLink] = useState('');
  const { t } = useTranslation();
  

  const toggleMobMenu = () => {
    setMobMenuOpen((prev) => !prev);
    document.body.classList.toggle('scroll');
  };
  
  
  useEffect(() => {
    setMobMenuOpen(false);
    document.body.classList.remove('scroll');
  }, [router.asPath]);
  
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.header__logo}>
            <Logo />
          </Link>
          <ul className={styles.header__menu}>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <a>ИП</a>
                <DropdownIcon />
              </div>
              <div className={styles['header__link-bot']}>
                <div className={styles['header__link-bot-links']}>
                  <Link href="/services/create-individual" className={styles['header__link-bot-link']}>Регистрация ИП</Link>
                  <Link href="/services/update-individual" className={styles['header__link-bot-link']}>Внесения изменений<br/> в ИП </Link>
                </div>
              </div>
            </li>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <a>ООО</a>
                <DropdownIcon />
              </div>
              <div className={styles['header__link-bot']}>
                <div className={styles['header__link-bot-links']}>
                  <Link href="/services/create-company" className={styles['header__link-bot-link']}>Регистрация ООО</Link>
                  <Link href="/services/update-company" className={styles['header__link-bot-link']}>Внесения изменений <br/>в ООО</Link>
                </div>
              </div>
            </li>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <Link href="/services/v-address">Виртуальный адрес</Link>
              </div>
            </li>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <Link href="/rates">Тарифы</Link>
              </div>
            </li>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <Link href="/blog">Блог</Link>
              </div>
            </li>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <Link href="/contacts">Контакты</Link>
              </div>
            </li>
          </ul>
          <form action="" className={styles.header__langs}>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <span>Ru</span>
                <DropdownIcon />
              </div>
              <div className={styles['header__link-bot']}>
                <div className={styles['header__link-bot-links']}>
                  <a href="" className={styles['header__link-bot-link']}>Ua</a>
                  <Link locale="sk" className={styles['header__link-bot-link']} href="">Sk</Link>
                  <a href="" className={styles['header__link-bot-link']}>En</a>
                </div>
              </div>
            </li>
          </form>
          <a href="" className={styles.header__profile}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.7505 16.3265C17.9709 14.3673 16.4899 12.898 14.697 12.1633C15.7104 11.3469 16.334 10.0408 16.334 8.65306C16.334 6.04082 14.3852 4 11.9688 4C9.5523 4 7.60354 6.04082 7.60354 8.57143C7.60354 9.95918 8.22715 11.2653 9.2405 12.0816C7.44764 12.8163 5.96658 14.2857 5.18708 16.2449C4.87528 17.0612 4.95323 18.0408 5.42093 18.7755C5.88863 19.5918 6.74609 20 7.68149 20H16.334C17.2694 20 18.0489 19.5102 18.5946 18.7755C19.0623 18.0408 19.1402 17.1429 18.7505 16.3265ZM9.16255 8.57143C9.16255 6.93878 10.4098 5.63265 11.9688 5.63265C13.5278 5.63265 14.775 6.93878 14.775 8.57143C14.775 10.2041 13.5278 11.5102 11.9688 11.5102C10.4098 11.5102 9.16255 10.2041 9.16255 8.57143ZM17.2694 17.9592C17.0355 18.2857 16.7237 18.5306 16.334 18.5306H7.60354C7.21379 18.5306 6.90199 18.3673 6.66814 17.9592C6.43429 17.6327 6.43429 17.3061 6.59019 16.9796C7.52559 14.6122 9.63025 13.1429 11.9688 13.1429C14.3073 13.1429 16.4119 14.6122 17.3473 16.898C17.5032 17.2245 17.4253 17.6327 17.2694 17.9592Z" fill="#44998A"/>
            </svg>
          </a>
          <OrderModalOpener>
            <div className={classNames('btn', 'btn-text', styles.btn)}>
              {t('orderBtn')}
            </div>
          </OrderModalOpener>
          <div className={classNames(styles.header__burger, mobMenuOpen ? styles.active : '')} onClick={() => void toggleMobMenu()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H5C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75H19C19.4142 12.75 19.75 12.4142 19.75 12Z" fill="#131313"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M19.75 7C19.75 6.58579 19.4142 6.25 19 6.25H5C4.58579 6.25 4.25 6.58579 4.25 7C4.25 7.41421 4.58579 7.75 5 7.75H19C19.4142 7.75 19.75 7.41421 19.75 7Z" fill="#131313"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M19.75 17C19.75 16.5858 19.4142 16.25 19 16.25H5C4.58579 16.25 4.25 16.5858 4.25 17C4.25 17.4142 4.58579 17.75 5 17.75H19C19.4142 17.75 19.75 17.4142 19.75 17Z" fill="#131313"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.99997 17L17 7" stroke="#131313" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6.99997 6.99997L17 17" stroke="#131313" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </header>
      <div className={classNames(styles.mob, mobMenuOpen ? styles.active : '')}>
        <div className={styles.mob__links}>
          <div className={styles.mob__link}>
            <div className={styles['mob__link-top']} role="button" onClick={() => void setActiveMobLink((prev) => prev === 'ip' ? '' : 'ip')}>
              <span>ИП</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="#131313"/>
              </svg>
            </div>
            <div className={classNames(styles['mob__link-bot'], activeMobLink === 'ip' ? styles.open : '')}>
              <Link href="/services/create-individual">Регистрация ИП</Link>
              <Link href="/services/update-individual">Внесение изменений в ИП</Link>
            </div>
          </div>
          <div className={styles.mob__link}>
            <div className={styles['mob__link-top']} role="button" onClick={() => void setActiveMobLink((prev) => prev === 'ooo' ? '' : 'ooo')}>
              <span>OOO</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="#131313"/>
              </svg>
            </div>
            <div className={classNames(styles['mob__link-bot'], activeMobLink === 'ooo' ? styles.open : '')}>
              <Link href="/services/create-company">Регистрация ООО</Link>
              <Link href="/services/update-company">Внесение изменений в ООО</Link>
            </div>
          </div>
          <div className={styles.mob__link}>
            <div className={styles['mob__link-top']}>
              <Link href="/services/v-address">Виртуальный адрес</Link>
            </div>
          </div>
          <div className={styles.mob__link}>
            <div className={styles['mob__link-top']}>
              <Link href="/rates">Тарифы</Link>
            </div>
          </div>
          <div className={styles.mob__link}>
            <div className={styles['mob__link-top']}>
              <Link href="/blog">Блог</Link>
            </div>
          </div>
          <div className={styles.mob__link}>
            <div className={styles['mob__link-top']}>
              <Link href="/contacts">Контакты</Link>
            </div>
          </div>
        </div>
        <OrderModalOpener>
          <div className={classNames('btn btn-text open-pop-1', styles.btn, styles['btn-text'])}>{t('orderBtn')}</div>
        </OrderModalOpener>
      </div>
    </>
  );
};