import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import EditIcon from 'common/components/icons/EditIcon';
import { iterateMap } from 'common/utils/common';

import styles from 'styles/OrderForm.module.scss';

import PrevButton from '../../components/PrevButton';

import PriceProvider, { usePriceContext } from './contexts/PriceContext';
import StepsProvider, { STEPS, useSteps } from './contexts/StepsContext';
import PriceForm from './steps/PriceForm';

function UpdateIndividualFormRender () {
  const translation = useTranslation('forms');
  const { step, prevStep, nextStep, setStep }= useSteps();
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });

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
              <div className={classNames(styles.reg__tab, step === 0 ? styles.active : '')}>
                <PriceForm />
              </div>
              <div className={classNames(styles.reg__tab, step === 1 ? styles.active : '')}>
                {/* <IndividualInfoForm /> */}
              </div>
              <div className={classNames(styles.reg__tab, step === 2 ? styles.active : '')}>
                {/* <CheckOut /> */}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reg__right}>
          <div className={styles['reg__right-cont']}>
            <div className={styles['reg__right-change']} onClick={() => void setStep(0)}>
              <EditIcon />
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
      <button onClick={nextStep} className={classNames(styles['reg-next'], styles.active, 'btn-text')}>
        {step === STEPS - 1 && t('finish')}
        {step !== STEPS - 1 && t('nextStep')}
      </button>
    </>
  );
};

export default function UpdateIndividualForm () {
  const formMethods = useForm({ mode: 'all' });
  return (
    <FormProvider {...formMethods}>
      <StepsProvider>
        {/* <ValidationProvider> */}
        <PriceProvider>
          <UpdateIndividualFormRender />
        </PriceProvider>
        {/* </ValidationProvider> */}
      </StepsProvider>
    </FormProvider>
  );
}