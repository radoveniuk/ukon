import { ButtonHTMLAttributes, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { iterateMap } from 'common/utils/common';

import styles from 'styles/OrderForm.module.scss';

import PriceProvider, { usePriceContext } from './contexts/PriceContext';
import StepsProvider, { STEPS, useSteps } from './contexts/StepsContext';
import CheckOut from './steps/CheckOut';
import IndividualInfoForm from './steps/IndividualInfoForm';
import PriceForm from './steps/PriceForm';

const PrevButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={styles['reg__left-top-prev']} {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.7803 16.7803C14.4874 17.0732 14.0126 17.0732 13.7197 16.7803L9.71967 12.7803C9.42678 12.4874 9.42678 12.0126 9.71967 11.7197L13.7197 7.71967C14.0126 7.42678 14.4874 7.42678 14.7803 7.71967C15.0732 8.01256 15.0732 8.48744 14.7803 8.78033L11.3107 12.25L14.7803 15.7197C15.0732 16.0126 15.0732 16.4874 14.7803 16.7803Z" fill="black"/>
    </svg>
  </button>
);

function CreateIndividualFormRender () {
  const { step, prevStep, nextStep, setStep }= useSteps();
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const formMethods = useForm();

  const [priceList] = usePriceContext();

  return (
    <>
      <div className={styles.reg__cont}>
        <div className={styles.reg__left}>
          <div className={classNames(styles['reg-title'], 'h2')}>
            {t('pageTitle')}
          </div>
          <div className={styles['reg__left-cont']}>
            <div className={styles['reg__left-top']}>
              <PrevButton disabled={step === 0} onClick={prevStep} />
              <div className={classNames(styles['reg__left-top-title'], 'h5')}>
                {t(`steps.${step}`)}
              </div>
              <div className={classNames(styles['reg__left-top-num'], 'body')}>
                <span className={styles['reg__left-top-num-current']}>{step + 1}</span>/
                <span className={styles['reg__left-top-num-all']}>{STEPS}</span>
              </div>
            </div>
            <div className={styles.reg__steps}>
              {iterateMap(STEPS, (index) => (
                <div role="button" key={index} className={classNames(styles.reg__step, index === step ? styles.active : '')} onClick={() => void setStep(index)} />
              ))}
            </div>
            <div className={styles.reg__tabs}>
              <FormProvider {...formMethods}>
                <div className={classNames(styles.reg__tab, step === 0 ? styles.active : '')}>
                  <PriceForm />
                </div>
                <div className={classNames(styles.reg__tab, step === 1 ? styles.active : '')}>
                  <IndividualInfoForm />
                </div>
                <div className={classNames(styles.reg__tab, step === 2 ? styles.active : '')}>
                  <CheckOut />
                </div>
              </FormProvider>
            </div>
          </div>
        </div>
        <div className={styles.reg__right}>
          <div className={styles['reg__right-cont']}>
            <div className={styles['reg__right-change']} onClick={() => void setStep(0)}>
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
      <div onClick={nextStep} className={classNames(styles['reg-next'], styles.active, 'btn-text')}>
        Следующий шаг
      </div>
    </>
  );
}

export default function CreateIndividualForm () {
  return (
    <PriceProvider>
      <StepsProvider>
        <CreateIndividualFormRender />
      </StepsProvider>
    </PriceProvider>
  );
}