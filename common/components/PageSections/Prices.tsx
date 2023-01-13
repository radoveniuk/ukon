import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import styles from 'styles/components/Prices.module.scss';

export const PricesHeader = ({ children }: PropsWithChildren) => (
  <>
    <div className="top top_center">
      <div className="top__left">
        <div className="sub t3">
          Цена
        </div>
        <h2 className="h2 title">
          {children}
        </h2>
      </div>
    </div>
  </>
);

export const PricesDescription = ({ children }: PropsWithChildren) => (
  <p className={classNames(styles['price-p'], 'body')}>
    {children}
  </p>
);

export default function Prices({ children }: PropsWithChildren) {
  return (
    <section className={classNames(styles.price, 'mb')}>
      <div className="container">
        {children}
        <div className={styles.price__items}>
          <div className={styles.price__item}>
            <h3 className={classNames(styles['price__item-title'], 'h4')}>
              «Стив Джобс»
            </h3>
            <div className={classNames(styles['price__item-price'], 'h2')}>
                    250€
            </div>
            <div className={classNames(styles['price__item-p'], 't2')}>
                    Пакет для предпринимателей, у которых есть регистрационный адрес. Например, имеется собственная или арендованная недвижимость, где вы желаете прописать свою компанию.
            </div>
            <div className={styles['price__item-items']}>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                            оплата госпошлины
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           подготовка необходимых документов
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           подача заявки на запись компании в торговый реестр
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                          уведомления на каждом этапе регистрации
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                            доступ к личному кабинету
                </span>
              </div>
              <div className={classNames(styles['price__item-item'], 'hide')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.46409 15.5359L15.5352 8.46484" stroke="#F16F6F" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8.46409 8.46409L15.5352 15.5352" stroke="#F16F6F" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>

                <span className="t2">
                           юридический  адрес на 1 год
                </span>
              </div>
              <div className={classNames(styles['price__item-item'], 'hide')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.46409 15.5359L15.5352 8.46484" stroke="#F16F6F" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8.46409 8.46409L15.5352 15.5352" stroke="#F16F6F" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>

                <span className="t2">
                           учет почты (до 100 писем в год)
                </span>
              </div>
              <div className={classNames(styles['price__item-item'], 'hide')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.46409 15.5359L15.5352 8.46484" stroke="#F16F6F" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8.46409 8.46409L15.5352 15.5352" stroke="#F16F6F" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>

                <span className="t2">
                           виртуальный почтовый секретарь в личном кабинете
                </span>
              </div>
            </div>
            <div className={classNames(styles['price__item-btn'], 'btn', 'btn-text')}>
                    Заказать
            </div>
          </div>
          <div className={styles.price__item}>
            <h3 className={classNames(styles['price__item-title'], 'h4')}>
                    «Билл Гейтс»
            </h3>
            <div className={classNames(styles['price__item-price'], 'h2')}>
                    340€
            </div>
            <div className={classNames(styles['price__item-p'], 't2')}>
                    Негде зарегистрировать ваш бизнес или не хочется использовать свой домашний адрес? Не беда, мы предоставим вам юридический адрес и немного позаботимся о вашей почте.
            </div>
            <div className={styles['price__item-items']}>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                            оплата госпошлины
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           подготовка необходимых документов
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           подача заявки на запись компании в торговый реестр
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                          уведомления на каждом этапе регистрации
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                            доступ к личному кабинету
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           юридический  адрес на 1 год
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           учет почты (до 100 писем в год)
                </span>
              </div>
              <div className={classNames(styles['price__item-item'], 'hide')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.46409 15.5359L15.5352 8.46484" stroke="#F16F6F" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8.46409 8.46409L15.5352 15.5352" stroke="#F16F6F" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>

                <span className="t2">
                           виртуальный почтовый секретарь в личном кабинете
                </span>
              </div>
            </div>
            <div className={classNames(styles['price__item-btn'], 'btn', 'btn-text')}>
                    Заказать
            </div>
          </div>
          <div className={styles.price__item}>
            <h3 className={classNames(styles['price__item-title'], 'h4')}>
                    «Илон Маск»
            </h3>
            <div className={classNames(styles['price__item-price'], 'h2')}>
                    450€
            </div>
            <div className={classNames(styles['price__item-p'], 't2')}>
                    Пакет для компаний, которым нужен регистрационный адрес и полноценный учет почты. Вы получите не только регистрацию ООО с юридическим адресом, но и почтового секретаря.
            </div>
            <div className={styles['price__item-items']}>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                            оплата госпошлины
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           подготовка необходимых документов
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           подача заявки на запись компании в торговый реестр
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                          уведомления на каждом этапе регистрации
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                            доступ к личному кабинету
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           юридический  адрес на 1 год
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           учет почты (до 100 писем в год)
                </span>
              </div>
              <div className={styles['price__item-item']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="#44998A"/>
                </svg>
                <span className="t2">
                           виртуальный почтовый секретарь в личном кабинете
                </span>
              </div>
            </div>
            <div className={classNames(styles['price__item-btn'], 'btn', 'btn-text')}>
                    Заказать
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}