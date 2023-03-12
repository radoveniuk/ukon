import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineSave } from 'react-icons/ai';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import styles from 'styles/OrderForm.module.scss';

import BottomActions, { BottomAction, BottomActionText } from '../../components/BottomActions';
import Cart, { CartBody, CartHeader, PriceItem } from '../../components/Cart';
import PriceProvider, { usePriceContext } from '../../contexts/PriceContext';

import DataProvider, { useData } from './contexts/DataContext';
import UpdateData from './steps/UpdateData';

function UpdateIndividualFormRender () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });
  const [data] = useData();

  const [priceList] = usePriceContext();
  return (
    <>
      <div className={styles.reg__cont}>
        <div className={styles.reg__left}>
          <div className={classNames(styles['reg-title'], 'h2')}>
            {t('pageTitle')}
          </div>
          <div className={styles['reg__left-cont']}>
            <div className={styles.reg__tabs}>
              <div className={classNames(styles.reg__tab, styles.active)}>
                <UpdateData />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reg__right}>
          <Cart>
            <CartHeader>
              {Object.values(priceList).reduce((partialSum, a) => partialSum + a, 0)} €
            </CartHeader>
            <CartBody>
              {Object.keys(priceList).filter((priceKey) => !!priceList[priceKey]).map((priceKey) => (
                <PriceItem key={priceKey} price={priceList[priceKey]}>{t(`priceKeys.${priceKey}`)}</PriceItem>
              ))}
              <PriceItem className="t1" price={Object.values(priceList).reduce((partialSum, a) => partialSum + a, 0)}>{t('priceKeys.sum')}</PriceItem>
            </CartBody>
          </Cart>
        </div>
      </div>
      <BottomActions>
        <BottomAction disabled={!data} variant="outlined"><AiOutlineSave /><BottomActionText>{translation.t('saveForFuture')}</BottomActionText></BottomAction>
        <BottomAction disabled={!data}>
          <BottomActionText>
            {t('finish')}
          </BottomActionText>
          <HiArrowNarrowRight />
        </BottomAction>
      </BottomActions>
    </>
  );
};

export default function UpdateIndividualForm () {
  const formMethods = useForm({ mode: 'all' });
  return (
    <FormProvider {...formMethods}>
      <DataProvider>
        {/* <ValidationProvider> */}
        <PriceProvider>
          <UpdateIndividualFormRender />
        </PriceProvider>
        {/* </ValidationProvider> */}
      </DataProvider>
    </FormProvider>
  );
}