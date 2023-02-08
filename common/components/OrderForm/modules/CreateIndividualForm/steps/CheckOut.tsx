import { ReactNode, useState } from 'react';
import { useFormContext, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { DateTime } from 'luxon';

import Button from 'common/components/Button';
import Checkbox from 'common/components/forms/Checkbox';
import FileInput from 'common/components/forms/FileInput';
import Radio, { RadioButton } from 'common/components/forms/Radio';
import EditIcon from 'common/components/icons/EditIcon';
import InfoIcon from 'common/components/icons/InfoIcon';
import UploadIcon from 'common/components/icons/UploadIcon';
import CheckoutTable, { CheckoutTableCell, CheckoutTableRow } from 'common/components/OrderForm/components/CheckoutTable';
import FormItem from 'common/components/OrderForm/components/FormItem';
import Tooltip from 'common/components/Tooltip';

import styles from 'styles/OrderForm.module.scss';

import { useSteps } from '../contexts/StepsContext';

type CheckoutRow = {
  name: string;
  step: 0 | 1 | 2;
  anchorField: string;
  getValue(watch: UseFormWatch<Record<string, any>>, t: (path: string) => string): string | ReactNode;
  customField?: boolean;
};

const PersonalDataRows: CheckoutRow[] = [
  {
    name: 'personalName',
    step: 1,
    anchorField: 'name',
    getValue: (watch) => `${watch('namePrefix.Value') || ''} ${watch('name')} ${watch('surname')} ${watch('namePostfix.Value') || ''}`,
  },
  {
    name: 'form.physicalNumber',
    step: 1,
    anchorField: 'physicalNumber',
    getValue: (watch) => watch('physicalNumber'),
  },
  {
    name: 'form.birthdate',
    step: 1,
    anchorField: 'birthdate',
    getValue: (watch) => watch('birthdate'),
  },
  {
    name: 'form.docNumber',
    step: 1,
    anchorField: 'docNumber',
    getValue: (watch) => watch('docNumber'),
  },
  {
    name: 'form.addressResidence',
    step: 1,
    anchorField: 'street',
    getValue: (watch) => `${watch('street')}, ${watch('houseRegNumber')}, ${watch('houseNumber')}, ${watch('city')}, ${watch('zip')}, ${watch('country.ru')}`,
  },
  {
    name: 'form.addressSlovakResidence',
    step: 1,
    anchorField: 'streetSlovak',
    getValue: (watch) => `${watch('streetSlovak')}, ${watch('houseRegNumberSlovak')}, ${watch('houseNumberSlovak')}, ${watch('citySlovak')}, ${watch('zipSlovak')}, Slovensko`,
  },
  {
    name: 'form.insurance',
    step: 1,
    anchorField: 'insurance',
    getValue: (watch) => watch('insurance.ru'),
    customField: true,
  },
];

const CompanyDataRows: CheckoutRow[] = [
  {
    name: 'form.companyName',
    step: 1,
    anchorField: 'companyName',
    getValue: (watch) => `${watch('namePrefix.Value')} ${watch('name')} ${watch('surname')} ${watch('namePostfix.Value')} ${watch('companyName') ? `— ${watch('companyName')}` : ''}`,
  },
  {
    name: 'activities',
    step: 0,
    anchorField: 'mainActivity',
    getValue: (watch) => (
      <>
        <strong>{watch('mainActivity.ru')}</strong>
        <ul>
          {watch('otherActivities')?.map((activityItem: any) => (
            <li key={activityItem?.ru}>{activityItem?.ru}</li>
          ))}
        </ul>
      </>
    ),
  },
  {
    name: 'form.companyNumber',
    step: 1,
    anchorField: 'companyNumber',
    getValue: (watch) => watch('companyNumber'),
  },
  {
    name: 'form.businessAddress',
    step: 0,
    anchorField: '',
    getValue: (watch, t) => {
      let output = '';
      const businessAddress = watch('businessAddress');
      if (businessAddress === 'ukon') {
        const ourBusinessAddress = watch('ourBusinessAddress.value');
        const vAddressTariff = watch('vAddressTariff');
        output += `${t('form.ourBusinessAddress')}, ${ourBusinessAddress}, пакет ${vAddressTariff}€/год`;
      }
      if (businessAddress === 'own') {
        output += t('form.ownBusinessAddress');
      }
      if (businessAddress === 'other') {
        output += t('form.otherBusinessAddress');
      }
      return output;
    },
  },
  {
    name: 'form.registerDate',
    step: 1,
    anchorField: 'registerDate',
    getValue: (watch, t) => {
      const value = watch('registerDate');
      if (value  === 'asap') {
        return t('form.asap');
      }
      if (DateTime.fromJSDate(value).isValid) {
        return DateTime.fromJSDate(value).toFormat('dd.MM.yyyy');
      }
      return '';
    },
    customField: true,
  },
  {
    name: 'form.orderComment',
    step: 1,
    anchorField: 'comment',
    getValue: (watch) => watch('comment'),
  },
];

export default function CheckOut () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });
  const { setStep } = useSteps();

  const { watch, setFocus, register } = useFormContext();

  const [paymentType, setPaymentType] = useState<'online' | 'invoice'>('online');

  const goToField = (id: string, scroll = false) => {
    setFocus(id, { shouldSelect: true });
    if (scroll) {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
        });
      }
    }
  };

  const isCheckedForm = watch('correctData');

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('checkoutText') }} />
      <FormItem number={1} title="Контроль заполненных данных">
        <div className={styles.reg__tables}>
          <CheckoutTable title={t('personalData')} colorfull={!isCheckedForm}>
            {PersonalDataRows.map((row) => (
              <CheckoutTableRow key={row.name}>
                <CheckoutTableCell className="t4">{t(row.name)}</CheckoutTableCell>
                <CheckoutTableCell className="t4">{row.getValue(watch, t)}</CheckoutTableCell>
                <CheckoutTableCell
                  className={styles['reg__table-edit']}
                  onClick={() => {
                    setStep(row.step);
                    setTimeout(() => { goToField(row.anchorField, row.customField); }, 100);
                  }}
                >
                  <EditIcon />
                </CheckoutTableCell>
              </CheckoutTableRow>
            ))}
          </CheckoutTable>
          <CheckoutTable title={t('companyData')} colorfull={!isCheckedForm}>
            {CompanyDataRows.map((row) => (
              <CheckoutTableRow key={row.name}>
                <CheckoutTableCell className="t4">{t(row.name)}</CheckoutTableCell>
                <CheckoutTableCell className="t4">{row.getValue(watch, t)}</CheckoutTableCell>
                <CheckoutTableCell
                  className={styles['reg__table-edit']}
                  onClick={() => {
                    setStep(row.step);
                    setTimeout(() => { goToField(row.anchorField, row.customField); }, 100);
                  }}
                >
                  <EditIcon />
                </CheckoutTableCell>
              </CheckoutTableRow>
            ))}
          </CheckoutTable>
          <Checkbox label={t('correctData')} className="mb-15" {...register('correctData')} />
        </div>
      </FormItem>
      <FormItem number={2} title={t('docsUpload')}>
        <div className={styles['reg__docs']}>
          <div className={styles['reg__doc']}>
            <div className={styles['reg__doc-title']}>
              <div className={styles['reg__doc-title-text']}>{t('proxyDoc')}</div>
              <InfoIcon className={styles['reg__doc-info']} id="ProxyInfo" />
              <Tooltip anchorId="ProxyInfo" html={t('proxyDoc')} />
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
              <InfoIcon className={styles['reg__doc-info']} id="RealtyInfo" />
              <Tooltip anchorId="RealtyInfo" html={t('realtyDoc')} />
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
              <InfoIcon className={styles['reg__doc-info']} id="NotConvictInfo" />
              <Tooltip anchorId="NotConvictInfo" html={t('nonConvictDoc')} />
            </div>
            <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
              <UploadIcon />
              {t('upload')}
            </FileInput>
          </div>
          <div className={styles['reg__doc']}>
            <div className={styles['reg__doc-title']}>
              <div className={styles['reg__doc-title-text']}>{t('identDoc')}</div>
              <InfoIcon className={styles['reg__doc-info']} id="IdentDocInfo" />
              <Tooltip anchorId="IdentDocInfo" html={t('identDocPlaceholder')} />
            </div>
            <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
              <UploadIcon />
              {t('upload')}
            </FileInput>
          </div>
          <div className={styles['reg__doc']}>
            <div className={styles['reg__doc-title']}>
              <div className={styles['reg__doc-title-text']}>{t('residenceSkDoc')}</div>
              <InfoIcon className={styles['reg__doc-info']} id="ResidenceSkDocInfo" />
              <Tooltip anchorId="ResidenceSkDocInfo" html={t('residenceSkDoc')} />
            </div>
            <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
              <UploadIcon />
              {t('upload')}
            </FileInput>
          </div>
          <div className={styles['reg__doc']}>
            <div className={styles['reg__doc-title']}>
              <div className={styles['reg__doc-title-text']}>{t('permitResidenceDoc')} {watch('residence.ru')}</div>
              <InfoIcon className={styles['reg__doc-info']} id="PermitResidenceDocInfo" />
              <Tooltip anchorId="PermitResidenceDocInfo" html={t('permitResidenceDoc')} />
            </div>
            <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
              <UploadIcon />
              {t('upload')}
            </FileInput>
          </div>
        </div>
      </FormItem>
      <FormItem number={3} title={t('paymentType')}>
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
      <FormItem number={4} title={t('agree')}>
        <Checkbox label={t('agreeWithRules')} {...register('agreeWithRules')} />
      </FormItem>
    </>
  );
}