import CookieConsent from 'react-cookie-consent';
import Image from 'next/image';
import Link from 'next/link';

import styles from 'styles/components/ConsentCookies.module.scss';

export default function ConsentCookies() {
  return (
    <CookieConsent
      containerClasses={styles.cookies}
      location="bottom"
      buttonText="Принять"
      cookieName="ConsentCookies"
      contentClasses={styles.cookies__content}
      buttonStyle={{ margin: 10 }}
      buttonClasses="btn"
      disableButtonStyles
      disableStyles
      expires={10000}
    >
      <Image className={styles['cookies__content-image']} height={24} width={24} src="/images/cookie.gif" alt="" />
      <div className={styles['cookies__content-text']}>
          Мы используем cookies для того, чтобы убедиться, что мы предлагаем вам наилучшее, когда вы открываете наш сайт. Просмотрите нашу&nbsp;
        <Link style={{ color: '#44998A' }} href="/terms">Декларацию использования cookies</Link>, чтобы получить более подробную информацию
      </div>
    </CookieConsent>
  );
}