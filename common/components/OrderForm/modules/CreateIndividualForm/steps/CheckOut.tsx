import { ReactNode, useState } from 'react';
import { useFormContext, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import Button from 'common/components/Button';
import Checkbox from 'common/components/forms/Checkbox';
import FileInput from 'common/components/forms/FileInput';
import Radio, { RadioButton } from 'common/components/forms/Radio';
import SearchSelect from 'common/components/forms/SearchSelect';
import Select from 'common/components/forms/Select';
import EditIcon from 'common/components/icons/EditIcon';
import InfoIcon from 'common/components/icons/InfoIcon';
import UploadIcon from 'common/components/icons/UploadIcon';
import AccordionTable, { AccordionTableCell, AccordionTableRow } from 'common/components/OrderForm/components/AccordionTable';
import Docs, { Doc, DocSignature, DocTemplateDownload, DocUpload } from 'common/components/OrderForm/components/Docs';
import FormItems, { FormItem, FormItemRow } from 'common/components/OrderForm/components/FormItems';
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
    anchorField: 'fullname',
    getValue: (watch) => watch('fullname'),
  },
  {
    name: 'form.addressResidence',
    step: 1,
    anchorField: 'address',
    getValue: (watch) => {
      const address = watch('address');
      if (!address) {
        return '';
      }
      const { street, houseNumber, city, zip } = address;
      return `${street}, ${houseNumber}, ${city}, ${zip}, ${watch('residence.sk')}`;
    },
  },
  {
    name: 'form.addressSlovakResidence',
    step: 1,
    anchorField: 'addressSk',
    getValue: (watch) => {
      const address = watch('addressSk');
      if (!address) {
        return '';
      }
      const { street, houseRegNumber, houseNumber, city, zip } = address;
      return `${street}, ${houseRegNumber} / ${houseNumber}, ${city}, ${zip}`;
    },
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
    name: 'form.insurance',
    step: 1,
    anchorField: 'insurance',
    getValue: (watch) => watch('insurance.ru'),
    customField: true,
  },
  {
    name: 'form.docNumber',
    step: 1,
    anchorField: 'docNumber',
    getValue: (watch) => watch('docNumber'),
  },
  {
    name: 'form.companyName',
    step: 1,
    anchorField: 'companyName',
    getValue: (watch) => `${watch('fullname')} ${watch('companyName') ? `??? ${watch('companyName')}` : ''}`,
  },
  {
    name: 'form.companyNumber',
    step: 1,
    anchorField: 'companyNumber',
    getValue: (watch) => watch('companyNumber'),
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
    name: 'form.businessAddress',
    step: 0,
    anchorField: '',
    getValue: (watch, t) => {
      let output = '';
      const businessAddress = watch('businessAddress');
      if (businessAddress === 'ukon') {
        const ourBusinessAddress = watch('ourBusinessAddress.value');
        const vAddressTariff = watch('vAddressTariff');
        output += `${t('form.ourBusinessAddress')}, ${ourBusinessAddress}, ?????????? ${vAddressTariff?.price}???/??????`;
      }
      if (businessAddress === 'own') {
        const address = watch('ownBusinessAddress');
        if (!address) {
          return '';
        }
        const { street, houseRegNumber, houseNumber, city, zip } = address;
        output += `${street}, ${houseRegNumber} / ${houseNumber}, ${city}, ${zip}`;

      }
      return output;
    },
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
  const [invoiceTo, setInvoiceTo] = useState<'me' | 'other'>('me');

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

  const PAYMENT_TYPES = [
    { value: 'online', name: translation.t('paymentByCard') },
    { value: 'invoice', name: translation.t('paymentByInvoice') },
  ];

  const INVOICE_OPTIONS = [
    { value: 'me', name: watch('fullname') },
    { value: 'other', name: translation.t('invoiceToOther') },
  ];

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('checkoutText') }} />
      <FormItems>
        <FormItem iconSrc="/images/order-form/form-items/CheckData.svg" title={translation.t('data')}>
          <FormItemRow cols={1}>
            <AccordionTable title={t('completedDataControl')} gridTemplateColumns="356fr 634fr 1fr" className="t4" defaultOpen expanding={false}>
              {PersonalDataRows.map((row) => (
                <AccordionTableRow key={row.name}>
                  <AccordionTableCell className="t4">{t(row.name)}</AccordionTableCell>
                  <AccordionTableCell className="t4">{row.getValue(watch, t)}</AccordionTableCell>
                  <AccordionTableCell
                    className={styles['reg__table-edit']}
                    onClick={() => {
                      setStep(row.step);
                      setTimeout(() => { goToField(row.anchorField, row.customField); }, 100);
                    }}
                  >
                    <EditIcon />
                  </AccordionTableCell>
                </AccordionTableRow>
              ))}
            </AccordionTable>
          </FormItemRow>
          <Checkbox label={t('correctData')} className="mb-15" {...register('correctData')} />
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/Docs.svg" title={translation.t('docsUpload')}>
          <Docs>
            <Doc docName="proxyDoc">
              <DocSignature />
              <DocTemplateDownload />
              <DocUpload />
            </Doc>
            <Doc docName="identDoc">
              <DocUpload />
            </Doc>
            <Doc docName="nonConvictDoc">
              <DocUpload />
            </Doc>
          </Docs>
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/Billing.svg" title={translation.t('billing')}>
          <FormItemRow cols={2}>
            <Select
              options={PAYMENT_TYPES}
              pathToLabel="name"
              label={`${translation.t('paymentLink')}:`}
              value={PAYMENT_TYPES.find((item) => item.value === paymentType)}
              onChange={({ value }) => {
                setPaymentType(value);
              }}
            />
            <Select
              options={INVOICE_OPTIONS}
              pathToLabel="name"
              label={`${translation.t('invoiceType')}:`}
              value={INVOICE_OPTIONS.find((item) => item.value === invoiceTo)}
              onChange={({ value }) => {
                setInvoiceTo(value);
              }}
            />
            {paymentType === 'online' && <Button>{translation.t('paymentLink')}</Button>}
          </FormItemRow>
        </FormItem>
      </FormItems>
    </>
  );
}