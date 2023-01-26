import { useFormContext } from 'react-hook-form';
import { AiFillEdit } from 'react-icons/ai';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import styles from 'styles/OrderForm.module.scss';

import { useSteps } from '../contexts/StepsContext';

export default function CheckOut () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });
  const { setStep, prevStep } = useSteps();

  const { watch } = useFormContext();

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('checkoutText') }} />
      <div className={styles.reg__tables}>
        <div className={styles.reg__table}>
          <div className={styles['reg__table-top']}>
            <div className={classNames(styles['reg__table-top-title'], 't1')}>
              {t('personalData')}
            </div>
            <div onClick={prevStep} className={styles['reg__table-top-edit']}>{t('edit')}</div>
          </div>
          <div className={styles['reg__table-rows']}>
            <div className={styles['reg__table-row']}>
              <div className={classNames(styles['reg__table-row-item'], 't4')}>{t('personalName')}</div>
              <div className={classNames(styles['reg__table-row-item'], 't4')}>{watch('namePrefix')?.Value} {watch('name')} {watch('surname')} {watch('namePostfix')?.Value}</div>
              <div onClick={prevStep} className={classNames(styles['reg__table-row-item'], styles['reg__table-edit'])}><AiFillEdit /></div>
            </div>
            <div className={styles['reg__table-row']}>
              <div className={classNames(styles['reg__table-row-item'], 't4')}>{t('form.physicalNumber')}</div>
              <div className={classNames(styles['reg__table-row-item'], 't4')}>{watch('physicalNumber')}</div>
              <div onClick={prevStep} className={classNames(styles['reg__table-row-item'], styles['reg__table-edit'])}><AiFillEdit /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}