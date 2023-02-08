import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import styles from 'styles/components/home/Services.module.scss';

type ServiceItem = {
  text: {
    sub: string,
    title: string,
    body: string,
  },
  img: string,
  url: string,
};

const serviceItems: ServiceItem[] = [
  {
    text: {
      sub: '01',
      title: 'Регистрация ИП',
      body: 'Внесите изменения в ваше ИП за несколько кликов',
    },
    img: '/images/home/services/2.png',
    url: '/services/create-individual',
  },
  {
    text: {
      sub: '02',
      title: 'Внесение изменений в ИП',
      body: 'Внесите изменения в ваше ИП за число кликов',
    },
    img: '/images/home/services/3.png',
    url: '/services/update-individual',
  },
  {
    text: {
      sub: '03',
      title: 'Регистарция ООО',
      body: 'Зарегистрируйте ООО',
    },
    img: '/images/home/services/4.png',
    url: '/services/create-company',
  },
  {
    text: {
      sub: '04',
      title: 'Внесение изменений в ООО',
      body: 'Внесение изменений в ООО',
    },
    img: '/images/home/services/5.png',
    url: '/services/update-company',
  },
  {
    text: {
      sub: '05',
      title: 'Виртуальный адрес',
      body: 'Воспользуйтесь виртуальным адресом',
    },
    img: '/images/home/services/6.png',
    url: '/services/v-address',
  },
];

export default function Services() {
  const [activeItem, setActiveItem] = useState<null | number>(null);
  
  return (
    <section className={classNames(styles.services, 'mb')}>
      <div className="container">
        <div className="top">
          <div className="top__left">
            <div className="sub t3">
              Мы предлагаем
            </div>
            <h2 className="h2 title">
              Наши услуги
            </h2>
          </div>
        </div>
        <div className={styles.services__items}>
          {serviceItems.map((serviceItem, index) => (
            <Link
              href={serviceItem.url}
              key={index}
              className={classNames(styles.services__item, activeItem === index ? styles.hover : styles.nohover)} 
              onMouseEnter={() => void setActiveItem(index)} 
              onMouseLeave={() => void setActiveItem(null)}
            >
              <svg className={styles['services__item-arrow']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 12H21.5M21.5 12L18 9M21.5 12L18 15" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2.50173 15.4394L1.94117 15.9377L2.93772 17.0588L3.49827 16.5606L2.50173 15.4394ZM7.99827 12.5606C8.30786 12.2854 8.33575 11.8113 8.06056 11.5017C7.78537 11.1921 7.31131 11.1643 7.00173 11.4394L7.99827 12.5606ZM3.49827 16.5606L7.99827 12.5606L7.00173 11.4394L2.50173 15.4394L3.49827 16.5606Z" fill="black"/>
              </svg>
              <div className={styles['services__item-text']}>
                <div className={classNames(styles['services__item-sub'], 't3')}>{serviceItem.text.sub}</div>
                <h3 className={classNames(styles['services__item-title'], 'h3')}>{serviceItem.text.title}</h3>
                <p className={classNames(styles['services__item-p'], 'body')}>{serviceItem.text.body}</p>
              </div>
              <Image width={290} height={151} src={serviceItem.img} alt="" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
