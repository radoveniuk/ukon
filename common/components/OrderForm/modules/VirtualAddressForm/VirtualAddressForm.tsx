import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import Button from 'common/components/Button';
import Radio, { RadioButton } from 'common/components/forms/Radio';
import Select from 'common/components/forms/Select';
import TextArea from 'common/components/forms/TextArea';
import TextField from 'common/components/forms/TextField';

import styles from 'styles/OrderForm.module.scss';

import Cart, { CartBody, CartHeader, PriceItem } from '../../components/Cart';
import FormItems, { FormItem, FormItemRow, FormItemSideInfo } from '../../components/FormItems';
import addresses from '../../data/address.json';
import virtualAddressTariffs from '../../data/virtualAddressTariffs.json';

const VirtualAddressForm = () => {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:v-address:${path}`, { interpolation: { escapeValue: false } });

  const { register, control, watch } = useForm();

  const [isRegistered, setIsRegistered] = useState(true);

  const [paymentType, setPaymentType] = useState<'online' | 'invoice'>('online');
  const [invoiceTo, setInvoiceTo] = useState<'me' | 'other'>('me');
  const PAYMENT_TYPES = [
    { value: 'online', name: translation.t('paymentByCard') },
    { value: 'invoice', name: translation.t('paymentByInvoice') },
  ];

  const INVOICE_OPTIONS = [
    { value: 'me', name: watch('fullname') },
    { value: 'other', name: translation.t('invoiceToOther') },
  ];

  const tariffs = virtualAddressTariffs.map((tariff) => ({ ...tariff, name: `Package of services — ${tariff.name} (${tariff.price}€)` }));

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
                <FormItems>
                  <FormItem iconSrc="/images/order-form/form-items/BusinessAddress.svg" title={t('form.addressInfo')}>
                    <FormItemRow cols={2}>
                      <Controller
                        control={control}
                        name="address"
                        defaultValue={addresses[0]}
                        render={({ field: addressField }) => (
                          <Select
                            {...addressField}
                            label={t('form.address')}
                            pathToLabel="value"
                            options={addresses}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="tariff"
                        defaultValue={tariffs[0]}
                        render={({ field }) => (
                          <Select
                            {...field}
                            pathToLabel="name"
                            label={t('form.tariff')}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                            options={tariffs}
                          />
                        )}
                      />
                    </FormItemRow>
                    <FormItemSideInfo>
                      <div className="t4">
                        We recommend using our Virtual Address service if maintaining your personal privacy is important.
                      </div>
                    </FormItemSideInfo>
                  </FormItem>
                  <FormItem iconSrc="/images/order-form/form-items/Info.svg" title={t('form.registrationDetails')}></FormItem>
                  <FormItem iconSrc="/images/order-form/form-items/Profile.svg" title={t('form.businessData')}></FormItem>
                  <FormItem iconSrc="/images/order-form/form-items/Auth.svg" title={translation.t('regAuth')}>
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
                  <FormItem iconSrc="/images/order-form/form-items/Note.svg" title={t('form.orderComment')}>
                    <TextArea
                      label={t('form.comment')}
                      placeholder={t('form.inputComment')}
                      style={{ height: 120 }}
                      {...register('comment')}
                    />
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
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reg__right}>
          <Cart>
            <CartHeader>
              50 €
            </CartHeader>
            <CartBody>
              <PriceItem className="t1" price={50}>{t('priceKeys.sum')}</PriceItem>
            </CartBody>
          </Cart>
        </div>
      </div>
    </>
  );
};

export default VirtualAddressForm;