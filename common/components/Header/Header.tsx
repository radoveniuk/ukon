import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import styles from '../../../styles/components/Header.module.scss';
import { useRouter } from 'next/router';

export default function Header () {
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [activeMobLink, setActiveMobLink] = useState('');

  const toggleMobMenu = () => {
    setMobMenuOpen((prev) => !prev);
    document.body.classList.toggle('scroll');
  };
  
  const router = useRouter();
  
  useEffect(() => {
    setMobMenuOpen(false);
    document.body.classList.remove('scroll');
  }, [router.asPath]);
  
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.header__logo}>
            <svg width="150" height="47" viewBox="0 0 150 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1173_10462)">
                <path d="M21.4419 0.306198C19.1609 0.900451 9.96383 4.33991 9.50762 4.75409C8.99667 5.25831 8.75945 6.21271 8.99667 6.897C9.17915 7.41922 10.274 8.10352 10.9492 8.10352C11.5697 8.10352 22.993 5.60045 23.5222 5.34834C25.2558 4.51999 25.2375 1.40467 23.4857 0.576313C22.9018 0.28819 21.9529 0.162137 21.4419 0.306198Z" fill="#131313"/>
                <path d="M43.0112 12.3357C41.9528 12.7318 41.2776 13.2901 40.8761 14.0644C40.5112 14.7487 40.5112 15.0909 40.5477 29.6951C40.6024 44.5334 40.6024 44.6414 40.9856 45.1456C41.1863 45.4158 41.7155 45.884 42.1352 46.1901C42.7557 46.6223 43.1206 46.7303 44.1608 46.7843C46.2046 46.9104 47.6462 46.2081 48.3396 44.7675C48.6863 44.0652 48.7228 43.669 48.7228 40.1395C48.7228 38.0146 48.7958 36.0158 48.9053 35.6736C49.1243 34.8813 49.8542 33.8368 50.5294 33.3506L51.0404 32.9725L56.4053 38.951C59.3433 42.2464 62.044 45.1997 62.409 45.5418C64.0878 47.1625 66.4601 47.2525 68.3944 45.7939C69.5623 44.9115 70.0367 43.0748 69.4345 41.6702C69.2885 41.292 67.0623 38.861 64.0878 35.7817C61.2958 32.8824 58.4674 29.9472 57.7922 29.2449L56.5696 27.9483L59.617 25.1932C61.3141 23.6805 63.5951 21.6276 64.69 20.6192C65.8031 19.5928 66.971 18.5483 67.2995 18.2782C68.6681 17.1437 68.9966 15.433 68.0842 14.0104C67.409 12.966 65.7119 12.0656 64.4345 12.0656C62.7739 12.0656 62.0623 12.5878 57.0805 17.4138C50.4747 23.8246 49.9272 24.3108 49.4893 24.3108C49.2703 24.3108 49.0148 24.1487 48.9053 23.9686C48.7958 23.7525 48.7228 21.9158 48.7228 19.2686C48.7228 14.6046 48.6681 14.2445 47.7374 13.2901C47.4637 13.02 46.9893 12.6598 46.6608 12.4977C45.8761 12.0836 43.8871 11.9935 43.0112 12.3357Z" fill="#131313"/>
                <path d="M2.28126 12.9473C1.3871 13.3434 0.620678 14.1898 0.365204 15.0902C0.219218 15.5584 0.182722 18.7637 0.219218 25.4806C0.292211 33.8902 0.346955 35.3668 0.60243 36.3392C2.09878 41.8856 6.82506 45.7212 13.3032 46.6396C15.347 46.9457 18.9966 46.7656 20.8397 46.2974C22.6097 45.8473 24.7083 44.9829 25.8579 44.2446C27.4637 43.2181 29.5805 40.9312 30.4382 39.3105C31.9893 36.3572 31.9893 36.3212 32.0805 25.4086C32.1535 14.9101 32.1535 14.9281 31.1134 13.8116C29.6353 12.245 26.9528 12.1729 25.4382 13.6496C24.3251 14.766 24.3616 14.3338 24.2703 24.9404C24.1426 36.2492 24.2338 35.7269 22.3725 37.5637C20.8397 39.0764 19.3981 39.6346 16.8068 39.7607C13.7229 39.9047 11.3689 39.1304 9.76301 37.4377C7.95644 35.5289 7.84696 34.7185 7.84696 23.8599C7.84696 14.604 7.8652 14.802 6.86155 13.7216C5.8579 12.6231 3.77761 12.263 2.28126 12.9473Z" fill="#131313"/>
                <path d="M88.504 12.9476C83.0296 14.1181 78.796 17.3775 76.4967 22.1495C75.4201 24.4005 75.1646 25.607 75.0551 28.8124C74.9091 32.9541 75.5478 35.5292 77.4821 38.8066C78.577 40.6434 81.1683 43.2185 83.0113 44.299C86.15 46.1538 89.38 46.9101 93.3398 46.766C97.1719 46.622 99.9456 45.7576 102.938 43.7587C106.059 41.6698 108.687 37.8882 109.672 34.1246C110.165 32.2698 110.347 28.6503 110.055 26.6875C109.106 20.2407 104.216 14.9465 97.5369 13.1277C95.4383 12.5695 90.7121 12.4614 88.504 12.9476ZM95.8946 20.0246C98.8508 20.853 100.986 22.8879 101.935 25.8051C102.336 27.0476 102.427 27.6239 102.427 29.3526C102.446 30.7572 102.336 31.8016 102.135 32.594C101.187 36.1415 98.7595 38.6626 95.4201 39.5269C94.1062 39.8691 91.0588 39.8691 89.6902 39.5269C87.2449 38.8967 85.0916 37.1679 83.942 34.917C83.1208 33.3503 82.8654 32.2879 82.7376 30.163C82.4456 25.2289 84.8909 21.3212 89.1062 19.9886C90.9675 19.4124 93.7778 19.4124 95.8946 20.0246Z" fill="#131313"/>
                <path d="M130.018 12.8571C126.04 13.6134 123.321 14.982 121.04 17.341C118.777 19.7 117.719 21.9689 117.354 25.2463C117.245 26.2368 117.153 30.5946 117.153 35.2586C117.153 44.2804 117.172 44.5325 118.212 45.631C119.891 47.3958 123.139 47.1977 124.544 45.2168L125.091 44.4425L125.183 34.8804C125.274 26.5789 125.329 25.1743 125.602 24.4C126.588 21.4467 129.088 19.862 133.011 19.664C135.219 19.5559 136.46 19.79 138.12 20.6004C140.183 21.5908 141.387 23.1214 141.788 25.2463C141.898 25.7505 141.971 30.0904 141.971 34.9705C141.971 44.5686 141.971 44.5145 143.029 45.613C143.923 46.5494 144.799 46.8555 146.241 46.7835C147.993 46.6935 148.942 46.1172 149.562 44.7486L150.018 43.7582L149.964 34.0881C149.891 24.7961 149.872 24.346 149.489 22.9954C148.12 18.1333 144.288 14.6398 138.777 13.2172C137.263 12.821 136.46 12.731 134.124 12.677C132.263 12.641 130.858 12.695 130.018 12.8571Z" fill="#131313"/>
              </g>
              <defs>
                <clipPath id="clip0_1173_10462">
                  <rect width="150" height="47" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </Link>
          <ul className={styles.header__menu}>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <a>ИП</a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="#131313"/>
                </svg>
              </div>
              <div className={styles['header__link-bot']}>
                <div className={styles['header__link-bot-links']}>
                  <Link href="/services/create-ip" className={styles['header__link-bot-link']}>Регистрация ИП</Link>
                  <Link href="/services/update-ip" className={styles['header__link-bot-link']}>Внесения изменений<br/> в ИП </Link>
                </div>
              </div>
            </li>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <a>ООО</a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="#131313"/>
                </svg>
              </div>
              <div className={styles['header__link-bot']}>
                <div className={styles['header__link-bot-links']}>
                  <Link href="/services/create-ooo" className={styles['header__link-bot-link']}>Регистрация ООО</Link>
                  <Link href="/services/update-ooo" className={styles['header__link-bot-link']}>Внесения изменений <br/>в ООО</Link>
                </div>
              </div>
            </li>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <Link href="/services/v-adress">Виртуальный адрес</Link>
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
                <Link href="contacts">Контакты</Link>
              </div>
              <div className={classNames(styles['header__link-bot'], styles['header__link-bot-contacts'])}>
                <div className={styles['header__link-bot-cont']}>
                  <div className={styles.container}>
                    <div className={styles['header__link-bot-items']}>
                      <a href="tel:+421 918 384 166" className={styles['header__link-bot-item']}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.2136 7.28467C12.323 5.18198 15.8598 5.76998 17.3531 8.25097L17.3635 8.26823L20.8059 14.151C21.8197 15.9194 21.5639 18.1927 20.0515 19.7003L19.4806 20.2695C21.5022 23.4403 24.5732 26.5773 27.6775 28.4588L28.245 27.9559C29.7574 26.4814 32.0149 26.2391 33.7742 27.2412L33.7869 27.2484L39.6123 30.6358C41.0545 31.3262 41.8136 32.6603 41.969 33.9922C42.1242 35.3229 41.6983 36.7673 40.6625 37.7998L38.6995 39.7565C36.6615 41.7881 33.3437 42.6872 30.5126 41.4044C26.7859 39.8814 21.1965 37.0076 16.1024 31.9297C10.995 26.8385 8.11602 21.093 6.60344 17.5783C5.31306 14.7647 6.20226 11.4657 8.22609 9.429L10.1683 7.33167C10.183 7.3157 10.1981 7.30003 10.2136 7.28467ZM12.5447 9.57334L10.6093 11.6634C10.5945 11.6794 10.5794 11.6951 10.564 11.7104C9.33877 12.9317 8.93113 14.8236 9.58389 16.2334C9.59018 16.247 9.59628 16.2607 9.60219 16.2744C11.0363 19.61 13.7178 24.9407 18.4157 29.6237C23.1221 34.3151 28.3118 36.9835 31.7826 38.3988C31.8049 38.4079 31.8269 38.4175 31.8488 38.4275C33.2631 39.0782 35.161 38.6718 36.3862 37.4505L38.3491 35.4938C38.6219 35.2219 38.7685 34.7911 38.7193 34.3689C38.6732 33.9736 38.4772 33.7027 38.1746 33.5656C38.1242 33.5428 38.075 33.5174 38.0272 33.4897L32.1459 30.0698C31.6306 29.7792 30.9697 29.8515 30.5206 30.2991C30.4979 30.3217 30.4746 30.3436 30.4507 30.3648L28.9785 31.6693C28.4714 32.1186 27.7389 32.2093 27.137 31.8973C22.7235 29.6096 18.4171 25.1222 15.9954 20.8115C15.6376 20.1746 15.7481 19.3781 16.266 18.8618L17.7382 17.3943C18.1873 16.9466 18.2598 16.2878 17.9682 15.7741L14.5435 9.92181C14.0774 9.15723 13.0573 9.08748 12.5447 9.57334Z" fill="#44998A"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M31.4257 16.5743C30.59 15.7386 29.2992 15.4391 28.3864 15.7433C27.4367 16.0599 26.4101 15.5466 26.0935 14.5969C25.7769 13.6471 26.2902 12.6205 27.24 12.304C29.5901 11.5206 32.2871 12.3086 33.9892 14.0108C35.6914 15.7129 36.4794 18.4099 35.696 20.76C35.3795 21.7098 34.3529 22.2231 33.4031 21.9065C32.4534 21.5899 31.9401 20.5633 32.2567 19.6136C32.5609 18.7008 32.2614 17.41 31.4257 16.5743Z" fill="#44998A"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M35.2489 12.7511C32.292 9.79422 27.9937 8.75359 24.1425 9.79047C23.2358 10.0346 22.303 9.49747 22.0589 8.59083C21.8148 7.6842 22.3519 6.75134 23.2585 6.50725C28.2476 5.16404 33.8098 6.5035 37.6531 10.3469C41.4965 14.1902 42.836 19.7524 41.4928 24.7415C41.2487 25.6481 40.3158 26.1852 39.4092 25.9411C38.5025 25.697 37.9654 24.7642 38.2095 23.8575C39.2464 20.0062 38.2058 15.708 35.2489 12.7511Z" fill="#44998A"/>
                        </svg>
                        <span>+421 918 384 166</span>
                      </a>
                      <a href="mailto:info@ukon.sk" className={styles['header__link-bot-item']}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.5556 13.1111C11.3117 13.1111 9.27274 15.0207 9.27274 17.7349V30.2651C9.27274 32.9793 11.3117 34.8889 13.5556 34.8889H34.6017C36.8526 34.8889 38.8487 32.9854 38.7218 30.3359C38.7206 30.3123 38.7201 30.2887 38.7201 30.2651V17.7349C38.7201 15.0207 36.6811 13.1111 34.4372 13.1111H13.5556ZM6 17.7349C6 13.5831 9.22254 10 13.5556 10H34.4372C38.7703 10 41.9928 13.5831 41.9928 17.7349V30.2316C42.1738 34.4318 38.9149 38 34.6017 38H13.5556C9.22254 38 6 34.4169 6 30.2651V17.7349Z" fill="#44998A"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.2231 16.8114C12.6899 16.0426 13.7361 15.7726 14.5597 16.2083L22.5803 20.4506C23.5088 20.9166 24.4912 20.9166 25.4197 20.4506L33.4403 16.2083C34.2639 15.7726 35.3101 16.0426 35.7769 16.8114C36.2436 17.5801 35.9543 18.5565 35.1307 18.9922L27.0951 23.2424L27.0678 23.2566C25.1113 24.2478 22.8887 24.2478 20.9322 23.2566L20.9049 23.2424L12.8693 18.9922C12.0457 18.5565 11.7564 17.5801 12.2231 16.8114Z" fill="#44998A"/>
                        </svg>  
                        <span>info@ukon.sk</span>
                      </a>
                      <a href="" className={styles['header__link-bot-item']}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M22.3281 4.0613C31.8113 3.25243 39.7997 10.5497 39.9996 19.9587L40 19.9982C40 23.2871 38.9927 26.3609 37.2073 29.0006L37.1895 29.0264L28.1663 41.8838C28.1484 41.9093 28.1299 41.9343 28.1107 41.9588C26.0366 44.6125 21.9575 44.7757 19.9645 41.8758L10.9384 29.0142C8.58552 25.6025 7.34913 21.2952 8.34899 16.7368C9.58187 9.90157 15.4091 4.8698 22.2739 4.06679C22.2919 4.06467 22.31 4.06285 22.3281 4.0613ZM22.6508 7.68279C17.1564 8.33691 12.7441 12.3372 11.8402 17.4258C11.8356 17.4518 11.8304 17.4777 11.8247 17.5034C11.0714 20.8962 11.9559 24.1776 13.8397 26.9122L22.8712 39.7814C23.3525 40.4851 24.5528 40.6499 25.3089 39.7192L34.2917 26.9192C35.6819 24.859 36.4405 22.5115 36.4445 20.0179C36.2799 12.7848 30.1334 7.05967 22.6508 7.68279Z" fill="#44998A"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M23.9992 15.8008C21.9005 15.8008 20.1992 17.5021 20.1992 19.6008C20.1992 21.6995 21.9005 23.4008 23.9992 23.4008C26.0979 23.4008 27.7992 21.6995 27.7992 19.6008C27.7992 17.5021 26.0979 15.8008 23.9992 15.8008ZM16.1992 19.6008C16.1992 15.293 19.6914 11.8008 23.9992 11.8008C28.307 11.8008 31.7992 15.293 31.7992 19.6008C31.7992 23.9086 28.307 27.4008 23.9992 27.4008C19.6914 27.4008 16.1992 23.9086 16.1992 19.6008Z" fill="#44998A"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M23.9992 15.8008C21.9005 15.8008 20.1992 17.5021 20.1992 19.6008C20.1992 21.6995 21.9005 23.4008 23.9992 23.4008C26.0979 23.4008 27.7992 21.6995 27.7992 19.6008C27.7992 17.5021 26.0979 15.8008 23.9992 15.8008ZM16.1992 19.6008C16.1992 15.293 19.6914 11.8008 23.9992 11.8008C28.307 11.8008 31.7992 15.293 31.7992 19.6008C31.7992 23.9086 28.307 27.4008 23.9992 27.4008C19.6914 27.4008 16.1992 23.9086 16.1992 19.6008Z" fill="#44998A"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M24 16.1026C21.8475 16.1026 20.1026 17.8475 20.1026 20C20.1026 22.1525 21.8475 23.8974 24 23.8974C26.1525 23.8974 27.8974 22.1525 27.8974 20C27.8974 17.8475 26.1525 16.1026 24 16.1026ZM16 20C16 15.5817 19.5817 12 24 12C28.4183 12 32 15.5817 32 20C32 24.4183 28.4183 28 24 28C19.5817 28 16 24.4183 16 20Z" fill="#44998A"/>
                        </svg>  
                        <span>Drieňová 16940/1J, 821 01 Bratislava</span>
                      </a>
                      <div className={styles['header__link-bot-item']}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M21.1653 7.69488C22.036 7.93676 22.5458 8.83874 22.304 9.70951L20.6073 15.8174H31.938L33.8779 8.83358C34.1198 7.96281 35.0218 7.453 35.8925 7.69488C36.7633 7.93676 37.2731 8.83874 37.0312 9.70951L35.3346 15.8174H40.3636C41.2674 15.8174 42 16.55 42 17.4537C42 18.3575 41.2674 19.0901 40.3636 19.0901H34.4255L31.6982 28.9083H37.0909C37.9946 28.9083 38.7273 29.6409 38.7273 30.5447C38.7273 31.4484 37.9946 32.181 37.0909 32.181H30.7891L28.8494 39.1641C28.6075 40.0348 27.7055 40.5446 26.8348 40.3028C25.964 40.0609 25.4542 39.1589 25.6961 38.2881L27.3925 32.181H20.7273C19.8235 32.181 19.0909 31.4484 19.0909 30.5447C19.0909 29.6409 19.8235 28.9083 20.7273 28.9083H28.3016L31.0289 19.0901H19.6982L14.1221 39.1641C13.8803 40.0348 12.9783 40.5446 12.1075 40.3028C11.2367 40.0609 10.7269 39.1589 10.9688 38.2881L12.6652 32.181H7.63636C6.73263 32.181 6 31.4484 6 30.5447C6 29.6409 6.73263 28.9083 7.63636 28.9083H13.5743L16.3016 19.0901H10.9091C10.0054 19.0901 9.27273 18.3575 9.27273 17.4537C9.27273 16.55 10.0054 15.8174 10.9091 15.8174H17.2107L19.1506 8.83358C19.3925 7.96281 20.2945 7.453 21.1653 7.69488Z" fill="#44998A"/>
                        </svg>  
                        <span className={styles.body}>Номер регистрации: 54614392, записана в торговом реестре Районного суда Bratislava I, вложение номер 161073/B
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <form action="" className={styles.header__langs}>
            <li className={styles.header__link}>
              <div className={styles['header__link-top']}>
                <span>Ru</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="#131313"/>
                </svg>
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
          <div className={classNames('btn', 'btn-text', styles.btn)}>
            Оформить заявку
          </div>
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
              <Link href="/services/create-ip">Регистрация ИП</Link>
              <Link href="/services/update-ip">Внесение изменений в ИП</Link>
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
              <Link href="/services/create-ooo">Регистрация ООО</Link>
              <Link href="/services/update-ooo">Внесение изменений в ООО</Link>
            </div>
          </div>
          <div className={styles.mob__link}>
            <div className={styles['mob__link-top']}>
              <Link href="/services/v-adress">Виртуальный адрес</Link>
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
        <div className={classNames('btn btn-text open-pop-1', styles.btn, styles['btn-text'])}>Оформить заявку</div>
      </div>
    </>
  );
};