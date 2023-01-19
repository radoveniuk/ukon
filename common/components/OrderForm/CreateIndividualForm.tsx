import { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useFormContext, Controller } from 'react-hook-form';

import MultiSelect from '../forms/MultiSelect';

import styles from 'styles/OrderForm.module.scss';

import activities from './activities.json';

const STEPS = ['Формирование стоимости', 'Регистрация/авторизация', 'Персональные данные предпринимателя', 'Завершающий', 'Загрузка файлов'];

export default function CreateIndividualForm () {
  const [step, setStep] = useState(0);
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control } = useFormContext();

  return (
    <>
      <div className={styles['reg__left-top']}>
        <div className={styles['reg__left-top-prev']}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M14.7803 16.7803C14.4874 17.0732 14.0126 17.0732 13.7197 16.7803L9.71967 12.7803C9.42678 12.4874 9.42678 12.0126 9.71967 11.7197L13.7197 7.71967C14.0126 7.42678 14.4874 7.42678 14.7803 7.71967C15.0732 8.01256 15.0732 8.48744 14.7803 8.78033L11.3107 12.25L14.7803 15.7197C15.0732 16.0126 15.0732 16.4874 14.7803 16.7803Z" fill="black"/>
          </svg>
        </div>
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
                <div className={classNames(styles['reg__item-top-num'], 'body')}>
                  01
                </div>
                <div className={classNames(styles['reg__item-top-title'], 't2')}>
                  {t('form.mainActivity')}
                </div>
              </div>
              <div className={styles['reg__item-bot']}>
                <div className={styles['reg__item-project']}>
                  <Controller
                    name="mainActivity"
                    render={({ field }) => (
                      <MultiSelect 
                        className={styles['reg__item-project-select']}
                        label={t('form.activitySearch')} 
                        options={activities}
                        maxItems={1}
                        handleSelectedItemChange={(changes) => void field.onChange(changes.selectedItem)}
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
                  02
                </div>
                <div className={classNames(styles['reg__item-top-title'], 't2')}>
                  {t('form.otherActivities')}
                </div>
              </div>
              <div className={styles['reg__item-bot']}>
                <div className={styles['reg__item-project']}>
                  <Controller
                    name="otherActivities"
                    render={({ field }) => (
                      <MultiSelect 
                        className={styles['reg__item-project-select']}
                        label={t('form.activitySearch')} 
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
          </div>
        </div>
      </div>
    </>
  );
}