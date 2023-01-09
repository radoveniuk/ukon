import classNames from 'classnames';
import { useEffect, useState } from 'react';

import CALCULATOR_DATA from './calculator-data.json';

import styles from 'styles/components/home/We.module.scss';

const { serviceTypes } = CALCULATOR_DATA;

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('ip');
  const [activeService, setActiveService] = useState('create');
  const [total, setTotal] = useState<{[key: string]: number}>({});

  useEffect(() => { setActiveService('create'); }, [activeTab]);

  const changeHandler = (update: {[key: string]: number}) => {
    setTotal((prev) => ({
      ...prev,
      ...update,
    }));
  };

  return (
    <div className={classNames(styles.we__right, 'fade-in')}>
      <div className={styles.we__btns}>
        {serviceTypes.map((serviceType) => (
          <div key={serviceType.id} className={classNames(styles['we-btn'], 't3', activeTab === serviceType.id ? styles.active : '')} onClick={() => void setActiveTab(serviceType.id)}>
            {serviceType.label}
          </div>
        ))}
      </div>
      <div className={styles.we__tabs}>
        {serviceTypes.map((serviceType) => (
          <div key={serviceType.id} className={classNames(styles.we__tab, activeTab === serviceType.id ? styles.active : '')}>
            <div className={styles.we__links}>
              {serviceType.services?.map((service) => (
                <div key={service.id} className={classNames(styles.we__link, activeService === service.id ? styles.active : '')} onClick={() => void setActiveService(service.id)}>
                  <span className="t1">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="we__tab-items">
              {serviceType.services?.map((service) => (
                <div key={service.id} className={classNames(styles['we__tab-item'], activeService === service.id ? styles.active : '')}>
                  {service.services?.map((serviceItem) => (
                    <div key={serviceItem.id} className={styles['we__tab-item-el']}>
                      <div className={styles['we__tab-item-title']}>
                        {serviceItem.label}
                      </div>
                      <div className={styles['we__tab-item-radios']}>
                        {serviceItem.options.map((option) => (
                          <label key={option.id} className="radio">
                            <div className="radio-input">
                              <input type="radio" name={`${serviceItem.id}`} onChange={() => void changeHandler({ [serviceItem.id]: option.price })} />
                              <svg className="radio-svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.0003 1.66602C5.41699 1.66602 1.66699 5.41602 1.66699 9.99935C1.66699 14.5827 5.41699 18.3327 10.0003 18.3327C14.5837 18.3327 18.3337 14.5827 18.3337 9.99935C18.3337 5.41602 14.5837 1.66602 10.0003 1.66602ZM10.0004 16.6662C6.33371 16.6662 3.33371 13.6662 3.33371 9.99957C3.33371 6.3329 6.33371 3.3329 10.0004 3.3329C13.667 3.3329 16.667 6.3329 16.667 9.99957C16.667 13.6662 13.667 16.6662 10.0004 16.6662Z" fill="#717171"/>
                              </svg>
                              <svg className="radio-svg-selected" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.0004 5.8329C7.66705 5.8329 5.83371 7.66623 5.83371 9.99957C5.83371 12.3329 7.66705 14.1662 10.0004 14.1662C12.3337 14.1662 14.167 12.3329 14.167 9.99957C14.167 7.66623 12.3337 5.8329 10.0004 5.8329ZM10.0003 1.66602C5.41699 1.66602 1.66699 5.41602 1.66699 9.99935C1.66699 14.5827 5.41699 18.3327 10.0003 18.3327C14.5837 18.3327 18.3337 14.5827 18.3337 9.99935C18.3337 5.41602 14.5837 1.66602 10.0003 1.66602ZM10.0004 16.6662C6.33371 16.6662 3.33371 13.6662 3.33371 9.99957C3.33371 6.3329 6.33371 3.3329 10.0004 3.3329C13.667 3.3329 16.667 6.3329 16.667 9.99957C16.667 13.6662 13.667 16.6662 10.0004 16.6662Z" fill="#44998A"/>
                              </svg>
                            </div>
                            <span className="t5">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.we__bot}>
        <div className={classNames(styles['we__bot-left'], 'h4')}>ИТОГО</div>
        <div className={styles['we__bot-right']}>
          <div className={classNames(styles['we__bot-price'], 'h4')}>{Object.values(total).reduce((accumulator, a) => accumulator + a, 0)}€</div>
          <div className="we__bot-right-p t5">*за каждый регулируемый вид деятельности будет +7.50€</div>
        </div>
      </div>
    </div>
  );
};

export default function We() {
  return (
    <section className={classNames(styles.we, 'mb')}>
      <div className="container">
        <div className={styles.we__cont}>
          <div className={styles.we__left}>
            <div className="top">
              <div className="top__left">
                <div className="sub t3">
                  Мы предлагаем
                </div>
                <h2 className="h2 title">
                  Стоимость открытия ИП или ООО в Словакии
                </h2>
              </div>
            </div>
            <p className={classNames(styles['we-p'], 'body', 'fade-in')}>
              Чтобы узнать, сколько стоит открыть ИП или ООО онлайн для вас – воспользуйтесь нашим калькулятором. Выберите желаемую организационно-правовую форму, еще что-то, и нажмите на кнопку «Рассчитать».
            </p>
            <p className={classNames(styles['we-bold'], 'h4', 'fade-in')}>
              Вы убедитесь, что сервис Úkon – выгодный инструмент для вашего бизнеса.
            </p>
          </div>
          <Calculator />
        </div>
      </div>
    </section>
  );
}