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
import CheckOut from './steps/CheckOut';
import UpdateData from './steps/UpdateData';

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
                <UpdateData />
              </div>
              <div className={classNames(styles.reg__tab, step === 1 ? styles.active : '')}>
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
      <button onClick={nextStep} className={classNames(styles['reg-next'], styles.active, 'btn-text')}>
        {step === STEPS - 1 && t('finish')}
        {step !== STEPS - 1 && t('nextStep')}
      </button>
    </>
  );
};

export default function UpdateIndividualForm () {
  const formMethods = useForm({ mode: 'all' });
  const { watch, setValue } = formMethods;
  useFormPersist('UpdateIndividualForm', { watch, setValue, storage: window.localStorage });
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