import Link from 'next/link';
import CookieConsent from 'react-cookie-consent';

export default function ConsentCookies() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Хорошо"
      cookieName="ConsentCookies"
      style={{ 
        background: '#ffffff', 
        color: '#4e503b', 
        boxShadow: '0px -2px 5px 0px rgba(166,166,166,0.75)', 
        fontFamily: 'Montserrat',
      }}
      buttonStyle={{ fontSize: '13px', margin: 10 }}
      buttonClasses="btn"
      disableButtonStyles
      expires={Infinity}
    >
      Для вашего удобства этот сайт использует <Link style={{ color: '#44998A' }} href="/terms">cookies</Link>
    </CookieConsent>
  );
}