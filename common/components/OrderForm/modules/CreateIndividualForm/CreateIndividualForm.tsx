import { FormProvider, useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { iterateMap } from 'common/utils/common';

import styles from 'styles/OrderForm.module.scss';

import Cart, { CartBody, CartHeader, PriceItem } from '../../components/Cart';
import PrevButton from '../../components/PrevButton';
import PriceProvider, { usePriceContext } from '../../contexts/PriceContext';

import StepsProvider, { STEPS, useSteps } from './contexts/StepsContext';
import ValidationProvider, { useValidation } from './contexts/ValidationContext';
import CheckOut from './steps/CheckOut';
import IndividualInfoForm from './steps/IndividualInfoForm';
import PriceForm from './steps/PriceForm';



function CreateIndividualFormRender () {
  const { step, prevStep, nextStep, setStep }= useSteps();
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const [priceList] = usePriceContext();

  const isValidStep = useValidation();

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
                <IndividualInfoForm />
              </div>
              <div className={classNames(styles.reg__tab, step === 2 ? styles.active : '')}>
                <CheckOut />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reg__right}>
          <Cart>
            <CartHeader onClick={() => void setStep(0)}>
              {Object.values(priceList).reduce((partialSum, a) => partialSum + a, 0)} €
            </CartHeader>
            <CartBody>
              {Object.keys(priceList).filter((priceKey) => !!priceList[priceKey]).map((priceKey) => (
                <PriceItem key={priceKey} price={priceList[priceKey]}>{t(`priceKeys.${priceKey}`)}</PriceItem>
              ))}
              <PriceItem className="t1" price={Object.values(priceList).reduce((partialSum, a) => partialSum + a, 0)}>{t('priceKeys.sum')}</PriceItem>
            </CartBody>
          </Cart>
          <div className={styles['reg__right-img']}>
            <Image width={250} height={173} src="/images/form-order.png" alt="" />
          </div>
        </div>
      </div>
      <button onClick={nextStep} disabled={!isValidStep} className={classNames(styles['reg-next'], isValidStep ? styles.active : '', 'btn-text')}>
        {step === STEPS - 1 && t('finish')}
        {step !== STEPS - 1 && t('nextStep')}
      </button>
    </>
  );
}

export default function CreateIndividualForm () {
  const formMethods = useForm({ mode: 'all' });
  const { watch, setValue } = formMethods;
  useFormPersist('CreateIndividualForm', { watch, setValue, storage: window.localStorage });
  return (
    <FormProvider {...formMethods}>
      <StepsProvider>
        <ValidationProvider>
          <PriceProvider>
            <CreateIndividualFormRender />
          </PriceProvider>
        </ValidationProvider>
      </StepsProvider>
    </FormProvider>
  );
}