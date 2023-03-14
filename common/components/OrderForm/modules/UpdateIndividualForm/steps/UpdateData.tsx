import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import Button from 'common/components/Button';
import Radio, { RadioButton } from 'common/components/forms/Radio';
import Select from 'common/components/forms/Select';
import TextArea from 'common/components/forms/TextArea';
import TextField from 'common/components/forms/TextField';
import { PauseIcon, PlayIcon, PlusIcon, TrashIcon } from 'common/components/icons';
import ActivityMultiselect from 'common/components/OrderForm/components/activities/ActivityMultiselect';
import Docs, { Doc,DocSignature, DocTemplateDownload, DocUpload } from 'common/components/OrderForm/components/Docs';
import { Activity } from 'common/components/OrderForm/types';

import styles from 'styles/OrderForm.module.scss';

import BusinessSearch from '../../../components/BusinessSearch';
import FormItemButton from '../../../components/FormItemButton';
import FormItems, { FormItem, FormItemRow } from '../../../components/FormItems';
import Activities from '../components/Activities';
import PersonalInfo from '../components/PersonalInfo';
import { useData } from '../contexts/DataContext';

export default function UpdateData() {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });

  const { register, watch, control } = useFormContext();
  // const [, updatePriceList] = usePriceContext();

  const [individualData, setIndividualData] = useData();

  // auth
  const [isRegistered, setIsRegistered] = useState(true);

  const [paymentType, setPaymentType] = useState<'online' | 'invoice'>('online');
  const [invoiceTo, setInvoiceTo] = useState<'me' | 'other'>('me');
  const PAYMENT_TYPES = [
    { value: 'online', name: translation.t('paymentByCard') },
    { value: 'invoice', name: translation.t('paymentByInvoice') },
  ];

  const INVOICE_OPTIONS = [
    { value: 'me', name: watch('fullname') || individualData?.name },
    { value: 'other', name: translation.t('invoiceToOther') },
  ];

  const [isAddingActivities, setIsAddingActivities] = useState(false);

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('entryText') }} />
      <FormItems>
        <FormItem iconSrc="/images/order-form/form-items/CheckData.svg" title={t('form.nameOrId')}>
          <FormItemRow cols={2}>
            <BusinessSearch
              onSearchResult={(res) => {
                setIndividualData(res);
                fetch(`/api/get-activities?id=${res.cin}`).then((res) => res.json())
                  .then((res: { data: Activity[] }) => {
                    setIndividualData((prev) => prev ? ({
                      ...prev,
                      activities: res.data,
                    }) : null);
                  });;
              }}
            />
          </FormItemRow>
        </FormItem>
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Profile.svg" title={t('form.actualData')}>
          <PersonalInfo />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <FormItemButton><PauseIcon size={20} />{t('pause')}</FormItemButton>
            <FormItemButton><TrashIcon size={20} />{t('liquidate')}</FormItemButton>
            <FormItemButton disabled><PlayIcon size={20} />{t('start')}</FormItemButton>
          </div>
        </FormItem>
        <FormItem
          disabled={!individualData}
          iconSrc="/images/order-form/form-items/Profile.svg"
          title={t('activities')}
          actions={<Button variant="outlined" onClick={() => void setIsAddingActivities(true)}><PlusIcon size={20} />{t('add')}</Button>}
        >
          <Activities />
          {isAddingActivities && (
            <Controller
              control={control}
              name="newActivities"
              render={({ field }) => (
                <ActivityMultiselect
                  label={t('activities')}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}
        </FormItem>
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Auth.svg" title={translation.t('regAuth')}>
          <Radio name="isRegistered">
            <FormItemRow cols={2}>
              <RadioButton className={styles.registeredRadio} checked={isRegistered} onSelect={() => void setIsRegistered(true)}>
                {translation.t('imRegistered')}
              </RadioButton>
              <RadioButton className={styles.registeredRadio} checked={!isRegistered} onSelect={() => void setIsRegistered(false)}>
                {translation.t('imNotRegistered')}
              </RadioButton>
              {isRegistered && (
                <>
                  <TextField
                    label={translation.t('email')}
                  />
                  <TextField
                    label={translation.t('pass')}
                    type="password"
                  />
                </>
              )}
              {!isRegistered && (
                <>
                  <TextField
                    label={translation.t('email')}
                  />
                  <TextField
                    label={translation.t('phone')}
                  />
                  <TextField
                    label={translation.t('pass')}
                    type="password"
                  />
                  <TextField
                    label={translation.t('passRepeat')}
                    type="password"
                  />
                </>
              )}
            </FormItemRow>
          </Radio>
        </FormItem>
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Note.svg" title={t('form.orderComment')}>
          <TextArea
            label={t('form.comment')}
            placeholder={t('form.inputComment')}
            style={{ height: 120 }}
            {...register('comment')}
          />
        </FormItem>
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Docs.svg" title={translation.t('docsUpload')}>
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
        <FormItem disabled={!individualData} iconSrc="/images/order-form/form-items/Billing.svg" title={translation.t('billing')}>
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