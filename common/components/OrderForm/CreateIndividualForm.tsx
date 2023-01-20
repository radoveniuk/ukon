import { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Controller,useForm } from 'react-hook-form';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import styles from 'styles/OrderForm.module.scss';

import MultiSelect from '../forms/MultiSelect';
import Select from '../forms/Select';

import activities from './activities.json';
import countries from './countries.json';

const STEPS = ['Формирование стоимости', 'Регистрация/авторизация', 'Персональные данные предпринимателя', 'Завершающий', 'Загрузка файлов'];

const PrevButton = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className={styles['reg__left-top-prev']} {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.7803 16.7803C14.4874 17.0732 14.0126 17.0732 13.7197 16.7803L9.71967 12.7803C9.42678 12.4874 9.42678 12.0126 9.71967 11.7197L13.7197 7.71967C14.0126 7.42678 14.4874 7.42678 14.7803 7.71967C15.0732 8.01256 15.0732 8.48744 14.7803 8.78033L11.3107 12.25L14.7803 15.7197C15.0732 16.0126 15.0732 16.4874 14.7803 16.7803Z" fill="black"/>
    </svg>
  </div>
);

export default function CreateIndividualForm () {
  const [step, setStep] = useState(0);
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, watch } = useForm();

  // form price list
  const [priceList, setPriceList] = useState({
    base: 19,
    mainActivity: 0,
    otherActivities: 0,
    citizenship: 0,
  });
  const updatePriceList = useCallback(
    (update: Partial<typeof priceList>) => {
      setPriceList((prev) => ({
        ...prev,
        ...update,
      }));
    },
    [],
  );

  const mainActivity = watch('mainActivity');
  const otherActivities = watch('otherActivities');
  const citizenship = watch('citizenship');
  useEffect(() => {
    if (mainActivity) {
      if (mainActivity.Type === 'Volná') {
        updatePriceList({ mainActivity: 0 });
      } else {
        updatePriceList({ mainActivity: 7.5 });
      }
    } else {
      updatePriceList({ mainActivity: 0 });
    }
    if (otherActivities?.length) {
      let otherActivitiesPrice = 0;
      otherActivities.forEach((activity: any) => {
        if (activity.Type !== 'Volná') {
          otherActivitiesPrice += 7.5;
        }
      });
      updatePriceList({ otherActivities: otherActivitiesPrice });
    } else {
      updatePriceList({ otherActivities: 0 });
    }
    if (citizenship?.en === 'Russia') {
      updatePriceList({ citizenship: 120 });
    } else if (citizenship?.en === 'Belarus') {
      updatePriceList({ citizenship: 100 });
    } else {
      updatePriceList({ citizenship: 0 });
    }
  }, [citizenship?.en, mainActivity, otherActivities, updatePriceList]);

  return (
    <>
      <div className={styles.reg__cont}>
        <div className={styles.reg__left}>
          <div className={classNames(styles['reg-title'], 'h2')}>
            {t('pageTitle')}
          </div>
          <div className={styles['reg__left-cont']}>
            <div className={styles['reg__left-top']}>
              <PrevButton />
              <div className={classNames(styles['reg__left-top-title'], 'h5')}>
                {t(`steps.${step}`)}
              </div>
              <div className={classNames(styles['reg__left-top-num'], 'body')}>
                <span className={styles['reg__left-top-num-current']}>{step + 1}</span>/
                <span className={styles['reg__left-top-num-all']}>5</span>
              </div>
            </div>
            <div className={styles.reg__steps}>
              {STEPS.map((stepItem, index) => (
                <div role="button" key={stepItem} className={classNames(styles.reg__step, index === step ? styles.active : '')} onClick={() => void setStep(index)} />
              ))}
            </div>
            <div className={styles.reg__tabs}>
              <div className={classNames(styles.reg__tab, styles.active)}>
                <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('entryText') }} />
                <div className={styles.reg__items}>
                  <div className={styles.reg__item}>
                    <div className={styles['reg__item-top']}>
                      <div className={classNames(styles['reg__item-top-num'], 'body')}>01</div>
                      <div className={classNames(styles['reg__item-top-title'], 't2')}>
                        {t('form.mainActivity')}
                      </div>
                    </div>
                    <div className={styles['reg__item-bot']}>
                      <div className={styles['reg__item-project']}>
                        <Controller
                          control={control}
                          name="mainActivity"
                          render={({ field }) => (
                            <Select 
                              className={styles['reg__item-project-select']}
                              label={t('form.activitySearch')} 
                              options={activities}
                              pathToLabel="ru"
                              handleChange={field.onChange}
                              placeholder={t('form.activitySelectPlaceholder')}
                              customRenderMenuItem={(item: any) => (
                                <>
                                  <span className={styles['reg__item-project-select-wrapper-bot-item-title']}>
                                    {item.ru}
                                  </span>
                                  <span className={styles['reg__item-project-select-wrapper-bot-item-price']}>
                                    {item.Type !== 'Volná' ? 7.5 : 0}€
                                  </span>
                                </>
                              )}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.reg__item}>
                    <div className={styles['reg__item-top']}>
                      <div className={classNames(styles['reg__item-top-num'], 'body')}>
                        02
                      </div>
                      <div className={classNames(styles['reg__item-top-title'], 't2')}>
                        {t('form.otherActivities')}
                      </div>
                    </div>
                    <div className={styles['reg__item-bot']}>
                      <div className={styles['reg__item-project']}>
                        <Controller
                          control={control}
                          name="otherActivities"
                          render={({ field }) => (
                            <MultiSelect 
                              className={styles['reg__item-project-select']}
                              label={t('form.activitySearch')} 
                              pathToLabel="ru"
                              options={activities}
                              handleChange={field.onChange} 
                              placeholder={t('form.activitySelectPlaceholder')}
                              customRenderMenuItem={(item: any) => (
                                <>
                                  <span className={styles['reg__item-project-select-wrapper-bot-item-title']}>
                                    {item.ru}
                                  </span>
                                  <span className={styles['reg__item-project-select-wrapper-bot-item-price']}>
                                    {item.Type !== 'Volná' ? 7.5 : 0}€
                                  </span>
                                </>
                              )}
                            />
                          )}
                        />
                        <div className={classNames(styles['reg__item-project-btn'], 'btn-text', 'btn-transparent')}>
                          {t('form.activitiesList')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.reg__item}>
                    <div className={styles['reg__item-top']}>
                      <div className={classNames(styles['reg__item-top-num'], 'body')}>
                          03
                      </div>
                      <div className={classNames(styles['reg__item-top-title'], 't2')}>
                        {t('form.citizenshipAndResidence')}
                      </div>
                    </div>
                    <div className={styles['reg__item-bot']}>
                      <div className={styles['reg__item-project']} style={{ gap: 20 }}>
                        <Controller
                          control={control}
                          name="citizenship"
                          render={({ field }) => (
                            <Select
                              label={t('form.citizenship')}
                              placeholder={t('form.countryPlaceholder')}
                              options={countries}
                              pathToLabel="ru"
                              handleChange={field.onChange}
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name="residence"
                          render={({ field }) => (
                            <Select
                              label={t('form.residence')}
                              placeholder={t('form.countryPlaceholder')}
                              className={styles['reg__item-project-country-select']}
                              options={countries}
                              pathToLabel="ru"
                              handleChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reg__right}>
          <div className={styles['reg__right-cont']}>
            <div className={styles['reg__right-change']}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.03642 17.3818H7.8546C8.80005 17.3818 9.67278 17.0182 10.3273 16.3636L17.8182 8.87273C18.9091 7.78182 18.9091 5.96364 17.8182 4.87273C17.3091 4.29091 16.5819 4 15.8546 4C15.1273 4 14.4001 4.29091 13.8182 4.8L6.32732 12.3636C5.67278 13.0182 5.30914 13.9636 5.30914 14.9091V16.7273C5.30914 17.0909 5.67278 17.3818 6.03642 17.3818ZM6.76369 14.8364C6.76369 14.2545 6.98187 13.7455 7.34551 13.3818L13.3091 7.41818L14.3273 8.36364C14.4728 8.50909 14.691 8.58182 14.8364 8.58182C15.0546 8.58182 15.2001 8.50909 15.3455 8.36364C15.6364 8.07273 15.6364 7.63636 15.3455 7.34545L14.3273 6.32727L14.8364 5.81818C15.1273 5.6 15.491 5.45455 15.8546 5.45455C16.2182 5.45455 16.5819 5.6 16.8001 5.89091C17.3091 6.4 17.3091 7.34545 16.8001 7.85455L9.30914 15.3455C8.94551 15.7091 8.36369 15.9273 7.8546 15.9273H6.76369V14.8364Z" fill="#717171"/>
                <path d="M19.2727 18.5459H4.72727C4.29091 18.5459 4 18.8368 4 19.2732C4 19.7095 4.29091 20.0004 4.72727 20.0004H19.2727C19.7091 20.0004 20 19.7095 20 19.2732C20 18.8368 19.7091 18.5459 19.2727 18.5459Z" fill="#717171"/>
              </svg>
            </div>
            <div className={classNames(styles['reg__right-title'], 'h4')}>Корзина</div>
            <div className={styles['reg__right-rows']}>
              <div className={styles['reg__right-row']}>
                <div className={styles['reg__right-row-item']}>
                  <div className={styles['reg__right-row-item-left']}>
                    <div className={classNames(styles['reg__right-row-item-title'], 'body')}>Оформление ИП</div>
                  </div>
                  <div className={styles['reg__right-row-item-right']}>
                    <div className={classNames('reg__right-row-item-price', 'body')}>19,00 €</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['reg__right-sum']}>
              <div className={classNames(styles['reg__right-sum-left'], 'h5')}>Итого:</div>
              <div className={classNames(styles['reg__right-sum-right'], 'h5')}>
                {Object.values(priceList).reduce((partialSum, a) => partialSum + a, 0)} €
              </div>
            </div>
          </div>
          <div className={styles['reg__right-img']}>
            <Image width={250} height={173} src="/images/form-order.png" alt="" />
          </div>
        </div>
      </div>
      <div className={classNames(styles['reg-next'], 'btn-text')}
        data-next-step="Следующий шаг"
        data-login="Войти"
        data-check="Проверка данных"
        data-end="Завершить оформление"
      >
    Следующий шаг
      </div>
    </>
  );
}