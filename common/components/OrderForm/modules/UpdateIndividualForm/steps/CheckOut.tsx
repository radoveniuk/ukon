import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';

import Button from 'common/components/Button';
import Checkbox from 'common/components/forms/Checkbox';
import FileInput from 'common/components/forms/FileInput';
import Radio, { RadioButton } from 'common/components/forms/Radio';
import InfoIcon from 'common/components/icons/InfoIcon';
import UploadIcon from 'common/components/icons/UploadIcon';
import FormItems, { FormItem } from 'common/components/OrderForm/components/FormItems';
import Tooltip from 'common/components/Tooltip';

import styles from 'styles/OrderForm.module.scss';

import insurances from '../../../data/insurance.json';

export default function CheckOut () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { watch, control, register } = useFormContext();

  const [paymentType, setPaymentType] = useState<'online' | 'invoice'>('online');

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('checkoutText') }} />
      <FormItems>
        <FormItem title={t('form.insurance')} >
          <Controller
            control={control}
            name="insurance"
            render={({ field }) => (
              <Radio name="insurance" className={styles['reg__item-radios']}>
                {insurances.map((item) => (
                  <RadioButton key={item.Code} onChange={(e) => e.target.checked && field.onChange(item)} checked={isEqual(field.value, item)}>{item.ru}</RadioButton>
                ))}
              </Radio>
            )}
          />
        </FormItem>
        <FormItem title={t('docsUpload')}>
          <div className={styles['reg__docs']}>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('proxyDoc')}</div>
                <Tooltip content={t('proxyDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="ProxyInfo" />
                </Tooltip>
              </div>
              <div className={classNames(styles['reg__doc-body'], 't4')}>
                <div className={styles.filesLink}>{t('downloadTemplate')}</div>
                <div className={styles.filesLink}>{t('sendTemplate')}</div>
                <div className={styles.filesLink}>{t('signOnline')}</div>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('realtyDoc')}</div>
                <Tooltip content={t('realtyDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="RealtyInfo" />
                </Tooltip>
              </div>
              <div className={classNames(styles['reg__doc-body'], 't4')}>
                <div className={styles.filesLink}>{t('downloadTemplate')}</div>
                <div className={styles.filesLink}>{t('sendTemplate')}</div>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('nonConvictDoc')}</div>
                <Tooltip content={t('nonConvictDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="NotConvictInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('identDoc')}</div>
                <Tooltip content={t('identDocPlaceholder')}>
                  <InfoIcon className={styles['reg__doc-info']} id="IdentDocInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('residenceSkDoc')}</div>
                <Tooltip content={t('residenceSkDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="ResidenceSkDocInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('permitResidenceDoc')} {watch('residence.ru')}</div>
                <Tooltip content={t('permitResidenceDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="PermitResidenceDocInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
          </div>
        </FormItem>
        <FormItem title={t('paymentType')}>
          <div className={styles['reg__item-payments']}>
            <div>
              <div className={styles['reg__item-payments-title']}>{t('paymentLink')}:</div>
              <Radio className={classNames(styles['reg__item-payments-radios'], 'mb-15')} name="paymentType">
                <RadioButton checked={paymentType === 'online'} onSelect={() => void setPaymentType('online')}>{t('paymentByCard')}</RadioButton>
                <RadioButton checked={paymentType === 'invoice'} onSelect={() => void setPaymentType('invoice')}>{t('paymentByInvoice')}</RadioButton>
              </Radio>
              {paymentType === 'online' && <Button>{t('paymentLink')}</Button>}
            </div>
            <div>
              <div className={styles['reg__item-payments-title']}>{t('invoiceType')}:</div>
              <Radio className={classNames(styles['reg__item-payments-radios'])} name="invoiceType">
                <RadioButton defaultChecked>{t('invoiceToCurrentIdividual')}</RadioButton>
                <RadioButton>{t('invoiceToOther')}</RadioButton>
              </Radio>
            </div>
          </div>
        </FormItem>
        <FormItem title={t('agree')}>
          <Checkbox label={t('agreeWithRules')} {...register('agreeWithRules')} />
        </FormItem>
      </FormItems>
    </>
  );
}