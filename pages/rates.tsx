import { useState } from 'react';
import classNames from 'classnames';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import Position, { PositionItem } from 'common/components/Position';

import styles from 'styles/Rates.module.scss';
import Footer from 'common/components/Footer';

const PRICE_LIST = {
  individual: [
    { name: 'Открытие ИП', priceSk: 19, price: 99 },
    { name: 'Добавление видов деятельности ИП', priceSk: 19, price: 99 },
    { name: 'Приостановка деятельности ИП', priceSk: 19, price: 49 },
    { name: 'Возобновление деятельности ИП', priceSk: 19, price: 49 },
    { name: 'Другие изменения в ИП; напр.: смена регистрационного адреса', priceSk: 19, price: 49 },
    { name: 'Доп. услуга - ИП (оформление/расширение)', priceSk: 7.5, price: 7.5 },
  ],
  business: [
    { name: 'Открытие ООО', price: 259 },
    { name: 'Добавление видов деятельности ООО', price: 98 },
    { name: 'Закрытие ООО', price: 98 },
    { name: 'Передача доли в ООО', price: 169 },
    { name: 'Другие изменения в ООО; напр.: смена юридического адреса', price: 98 },
    { name: 'Доп. услуга - ООО (оформление/расширение)', price: 7.5 },
  ],
  vAdress: [
    { name: 'Виртуальный адрес - Базовый пакет (до 5 писем в год)', description: 'Документ для записи адреса в торговый реестр и реестр предпринимателей, Маркировка почтового ящика, Фотографирование полученных писем, Учет полученной почты, E-mail уведомления о полученных письмах, Сканирование содержимого писем по запросу за доп. оплату, Ликвидация писем по запросу', price: 50 },
    { name: 'Виртуальный адрес - Cтандарт (до 100 писем в год)', description: 'Документ для записи адреса в торговый реестр и реестр предпринимателей, Маркировка почтового ящика, Фотографирование полученных писем, Учет полученной почты, E-mail уведомления о полученных письмах, Сканирование содержимого писем по запросу за доп. оплату, Ликвидация писем по запросу', price: 95 },
    { name: 'Виртуальный адрес - Максимум (до 300 писем в год)', description: 'Документ для записи адреса в торговый реестр и реестр предпринимателей, Маркировка почтового ящика, Фотографирование полученных писем, Учет полученной почты, E-mail уведомления о полученных письмах, Сканирование содержимого писем по запросу за доп. оплату, Ликвидация писем по запросу', price: 235 },
    { name: 'Сканирование документов', description: '', price: 1.29 },
    { name: 'Пересылка почты', description: '', price: 4.9 },
    { name: 'Прием почты', description: '', price: 0.5 },
    { name: 'Ликвидация почты', description: '', price: 0 },
  ],
};

export const getStaticProps: GetStaticProps = async ({ locale = 'ru' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'rates'])),
    },
  };
};

const BagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.4 13.0545C10.7314 13.0545 11 13.3308 11 13.6718V15.318C11 15.659 10.7314 15.9354 10.4 15.9354C10.0686 15.9354 9.8 15.659 9.8 15.318V13.6718C9.8 13.3308 10.0686 13.0545 10.4 13.0545Z" fill="#44998A"/>
    <path d="M14.2 13.6718C14.2 13.3308 13.9314 13.0545 13.6 13.0545C13.2686 13.0545 13 13.3308 13 13.6718V15.318C13 15.659 13.2686 15.9354 13.6 15.9354C13.9314 15.9354 14.2 15.659 14.2 15.318V13.6718Z" fill="#44998A"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.1196 4.92612C10.2853 4.63085 10.187 4.25329 9.9 4.08281C9.61302 3.91234 9.24607 4.0135 9.08038 4.30877L7.48038 7.16015C7.45641 7.20287 7.43797 7.24731 7.42482 7.29259H7.2C5.98497 7.29259 5 8.30604 5 9.55618C5 10.2633 5.31517 10.8948 5.80888 11.3099L6.34243 15.0836L6.69982 16.8066C6.91395 17.8388 7.73299 18.6229 8.74909 18.7684C10.906 19.0772 13.094 19.0772 15.2509 18.7684C16.267 18.6229 17.086 17.8388 17.3002 16.8066L17.6576 15.0836L18.1911 11.3099C18.6848 10.8948 19 10.2633 19 9.55618C19 8.30604 18.015 7.29259 16.8 7.29259H16.5752C16.562 7.24731 16.5436 7.20287 16.5196 7.16015L14.9196 4.30877C14.7539 4.0135 14.387 3.91234 14.1 4.08281C13.813 4.25329 13.7147 4.63085 13.8804 4.92612L15.2083 7.29259H8.79171L10.1196 4.92612ZM16.9068 11.8171C16.8714 11.8189 16.8358 11.8198 16.8 11.8198H7.2C7.1642 11.8198 7.12861 11.8189 7.09323 11.8171L7.52424 14.8657L7.87339 16.5488C7.98217 17.0733 8.39826 17.4716 8.91447 17.5455C10.9616 17.8386 13.0384 17.8386 15.0855 17.5455C15.6017 17.4716 16.0178 17.0733 16.1266 16.5488L16.4758 14.8657L16.9068 11.8171ZM6.2 9.55618C6.2 8.98793 6.64772 8.52728 7.2 8.52728H16.8C17.3523 8.52728 17.8 8.98793 17.8 9.55618C17.8 10.1244 17.3523 10.5851 16.8 10.5851H7.2C6.64772 10.5851 6.2 10.1244 6.2 9.55618Z" fill="#44998A"/>
  </svg>
);

export default function Rates () {
  const translation = useTranslation('rates');
  const t = (path: string) => translation.t(`rates:${path}`);

  const [activeTab, setActiveTab] = useState('individual');
  return (
    <>
      <Head>
        <title>Úkon.sk - тарифы</title>
        <meta name="description" content="Úkon.sk - home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Position>
          <PositionItem href="/">Главная</PositionItem>
          <PositionItem href="">{t('pageTitle')}</PositionItem>
        </Position>
        <section className={classNames(styles.all, 'mb')}>
          <div className="container">
            <div className="top top_center">
              <div className="top__left">
                <h2 className="h2 title">
                  Цены на все услуги
                </h2>
              </div>
            </div>
            <div className={styles.all__cont}>
              <div className={styles.all__btns}>
                <div onClick={() => void setActiveTab('individual')} className={classNames(styles['all-btn'], 'h5', activeTab === 'individual' ? styles.active : '')}>
                  Оформление ИП<br />
                  и Внесения изменений
                  в ИП
                </div>
                <div onClick={() => void setActiveTab('business')} className={classNames(styles['all-btn'], 'h5', activeTab === 'business' ? styles.active : '')}>
                  Оформление  ООО<br />
                  и внесения изменений в ООО
                </div>
                <div onClick={() => void setActiveTab('vAdress')} className={classNames(styles['all-btn'], 'h5', activeTab === 'vAdress' ? styles.active : '')}>
                  Виртуальный адрес<br />
                  и дополнительные услуги
                </div>
              </div>
              <div className={styles.all__tabs}>
                <div className={classNames(styles.all__tab, activeTab === 'individual' ? styles.active : '')}>
                  <div className={classNames(styles.all__table, styles['all__table-4'])}>
                    <div className={styles['all__table-row']}>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                        Услуга
                      </div>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                        Стоимость для Словаков
                      </div>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                        Стоимость для иностранцев
                      </div>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                      </div>
                    </div>
                    {PRICE_LIST.individual.map((item) => (
                      <div className={styles['all__table-row']} key={item.name}>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <span className="t5">
                          Услуга
                          </span>
                          {item.name}
                        </div>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <span className="t5">
                          Стоимость <br />
                          для Словаков
                          </span>
                          {item.priceSk} €/акт
                        </div>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <span className="t5">
                            Стоимость <br />
                            для иностранцев
                          </span>
                          {item.price} €/акт
                        </div>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <div className={styles['all__table-btn']}>
                            <BagIcon />
                            <span className="btn-text">
                              Заказать услугу
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classNames(styles.all__tab, activeTab === 'business' ? styles.active : '')}>
                  <div className={classNames(styles.all__table, styles['all__table-3'])}>
                    <div className={styles['all__table-row']}>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                        Услуга
                      </div>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                        Стоимость
                      </div>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                      </div>
                    </div>
                    {PRICE_LIST.business.map((item) => (
                      <div className={styles['all__table-row']} key={item.name}>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <span className="t5">
                            Услуга
                          </span>
                          {item.name}
                        </div>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <span className="t5">
                          Стоимость
                          </span>
                          {item.price} €/акт
                        </div>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <div className={styles['all__table-btn']}>
                            <BagIcon />
                            <span className="btn-text">
                              Заказать услугу
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classNames(styles.all__tab, activeTab === 'vAdress' ? styles.active : '')}>
                  <div className={classNames(styles.all__table, styles['all__table-left'])}>
                    <div className={styles['all__table-row']}>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                        Услуга
                      </div>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                        Описание
                      </div>
                      <div className={classNames(styles['all__table-item'], 't5')}>
                        Стоимость
                      </div>
                      <div className={classNames(styles['all__table-item'], 't5')} />
                    </div>
                    {PRICE_LIST.vAdress.map((item) => (
                      <div className={styles['all__table-row']} key={item.name}>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <span className="t5">
                            Услуга
                          </span>
                          {item.name}
                        </div>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <span className="t5">
                            Описание
                          </span>
                          {item.description}
                        </div>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <span className="t5">
                          Стоимость
                          </span>
                          {item.price} €/год
                        </div>
                        <div className={classNames(styles['all__table-item'], 't4')}>
                          <div className={styles['all__table-btn']}>
                            <BagIcon />
                            <span className="btn-text">Заказать услугу</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}