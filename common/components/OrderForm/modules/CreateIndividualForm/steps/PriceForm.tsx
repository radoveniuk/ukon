import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import CountrySelect from 'common/components/forms/CountrySelect';
import Select from 'common/components/forms/Select';
import ActivityMultiselect from 'common/components/OrderForm/components/activities/ActivityMultiselect';
import ActivitySelect from 'common/components/OrderForm/components/activities/ActivitySelect';
import AddressForm from 'common/components/OrderForm/components/AddressForm';
import BusinessAdressSelectCard, { CardsContainer, Checkmark, Checkmarks, OwnAddressWrapper } from 'common/components/OrderForm/components/BusinessAdressSelect';

import styles from 'styles/OrderForm.module.scss';

import Radio, { RadioButton } from '../../../../forms/Radio';
import TextField from '../../../../forms/TextField';
import FormItems, { FormItem, FormItemRow } from '../../../components/FormItems';
import { usePriceContext } from '../../../contexts/PriceContext';
import addresses from '../../../data/address.json';
import virtualAddressTariffs from '../../../data/virtualAddressTariffs.json';

export default function PriceForm() {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, watch, setValue, register } = useFormContext();
  const [, updatePriceList] = usePriceContext();

  const residence = watch('residence');
  const mainActivity = watch('mainActivity');
  const otherActivities = watch('otherActivities');
  const citizenship = watch('citizenship');
  const vAddressPrice = watch('vAddressTariff.price');
  useEffect(() => {
    let activitiesPrice = 0;
    if (mainActivity && mainActivity.Type !== 'Volná') {
      activitiesPrice += 7.5;
    }
    if (otherActivities?.length) {
      otherActivities.forEach((activity: any) => {
        if (activity.Type !== 'Volná') {
          activitiesPrice += 7.5;
        }
      });
    }
    updatePriceList({ activities: activitiesPrice });
    if (citizenship?.en === 'Russia') {
      updatePriceList({ citizenship: 120 });
    } else if (citizenship?.en === 'Belarus') {
      updatePriceList({ citizenship: 100 });
    } else {
      updatePriceList({ citizenship: 0 });
    }
    if (residence?.en === 'Russia') {
      updatePriceList({ residence: 120 });
    } else if (residence?.en === 'Belarus') {
      updatePriceList({ residence: 100 });
    } else {
      updatePriceList({ residence: 0 });
    }
    updatePriceList({ vAddressTariff: vAddressPrice || 0 });
  }, [citizenship?.en, mainActivity, otherActivities, residence?.en, updatePriceList, vAddressPrice]);

  // auth
  const [isRegistered, setIsRegistered] = useState(true);

  const tariffs = virtualAddressTariffs.map((tariff) => ({ ...tariff, name: `Package of services — ${tariff.name} (${tariff.price}€)` }));

  const TRUE_OPTION = { value: true, name: t('yes') };
  const FALSE_OPTION = { value: false, name: t('no') };
  const BOOLEAN_OPTIONS = [TRUE_OPTION, FALSE_OPTION];

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('entryText') }} />
      <FormItems>
        <FormItem iconSrc="/images/order-form/form-items/Activities.svg" title={t('activities')}>
          <Controller
            control={control}
            name="mainActivity"
            rules={{ required: t('form.requiredFieldText') }}
            defaultValue={null}
            render={({ field }) => (
              <ActivitySelect
                label={t('form.mainActivity')}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="otherActivities"
            render={({ field }) => (
              <ActivityMultiselect
                label={t('form.otherActivities')}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/BusinessAddress.svg" title={t('form.businessAddress')}>
          <>
            <Controller
              control={control}
              name="businessAddress"
              rules={{ required: true }}
              defaultValue="ukon"
              render={({ field }) => (
                <>
                  <Radio className={classNames('mb-15')} name="businessAddress">
                    <CardsContainer>
                      <BusinessAdressSelectCard
                        title={t('form.ourBusinessAddress')}
                        checked={field.value === 'ukon'}
                        onSelect={() => { field.onChange('ukon'); updatePriceList({ vAddressTariff: watch('vAddressTariff.price') }); }}
                      >
                        <Image height={90} width={90} src="/images/order-form/BusinessAddressUkon.svg" alt="" />
                        <div>{t('form.ourBusinessAddressSelect')}</div>
                        <Controller
                          control={control}
                          name="ourBusinessAddress"
                          defaultValue={addresses[0]}
                          render={({ field: addressField }) => (
                            <Select
                              {...addressField}
                              pathToLabel="value"
                              options={addresses}
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name="vAddressTariff"
                          defaultValue={tariffs[0]}
                          render={({ field: tariffField }) => (
                            <Select
                              {...tariffField}
                              pathToLabel="name"
                              onChange={(value) => {
                                tariffField.onChange(value);
                              }}
                              options={tariffs}
                            />
                          )}
                        />
                        <Checkmarks>
                          <Checkmark checked>Receive up to 100 emails per year</Checkmark>
                          <Checkmark checked>Instant alerts with 24/7 access to your mail online</Checkmark>
                        </Checkmarks>
                        {!!watch('vAddressTariff.price') && (
                          <>
                            <div className="h2">{watch('vAddressTariff.price')}&#8364;/Year</div>
                            <div className="t3">Cancel anytime</div>
                          </>
                        )}
                      </BusinessAdressSelectCard>
                      <BusinessAdressSelectCard
                        title={t('form.ownBusinessAddress')}
                        checked={field.value === 'own'}
                        onSelect={() => { field.onChange('own'); updatePriceList({ vAddressTariff: 0 }); }}
                      >
                        <Image height={90} width={90} src="/images/order-form/BusinessAddressOwn.svg" alt="" />
                        <div className="mb-15">I will provide my own Slovak business address and will personally keep up with the incoming mail.</div>
                        <div className="mb-15">Slovakia requires a physical street address (P.O Boxes are not accepted).</div>
                        <div className="mb-15">Any residential address provided to the state will be listed publicly.</div>
                        <div className="mb-15">You need authorized representative for mail, which must be a person with permanent residence in Slovakia, or Úkon.sk s.r.o. (40€)</div>
                      </BusinessAdressSelectCard>
                    </CardsContainer>
                  </Radio>
                </>
              )}
            />
            {watch('businessAddress') === 'own' && (
              <Controller
                control={control}
                name="ownBusinessAddress"
                render={({ field }) => (
                  <OwnAddressWrapper>
                    <AddressForm country="sk" label={t('form.ownBusinessAddress')} value={field.value} onChange={field.onChange} />
                  </OwnAddressWrapper>
                )}
              />
            )}
          </>
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/AdditionalData.svg" title={t('additionalData')}>
          <FormItemRow cols={2}>
            <Controller
              control={control}
              name="isPrevIndividual"
              defaultValue={FALSE_OPTION}
              render={({ field }) => (
                <Select
                  label={t('form.prevIndividual')}
                  options={BOOLEAN_OPTIONS}
                  pathToLabel="name"
                  {...field}
                />
              )}
            />
            {watch('isPrevIndividual.value') && (
              <TextField
                label={t('form.companyNumber')}
                {...register('companyNumber')}
              />
            )}
            <Controller
              control={control}
              name="citizenship"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <CountrySelect
                  {...field}
                  label={t('form.citizenship')}
                  placeholder={t('form.countryPlaceholder')}
                  state={fieldState.error ? 'error' : (fieldState.isDirty ? 'success' : 'draft')}
                  onChange={(value) => {
                    field.onChange(value);
                    setValue('residence', value, { shouldTouch: true, shouldDirty: true, shouldValidate: true });
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="residence"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <CountrySelect
                  label={t('form.residence')}
                  placeholder={t('form.countryPlaceholder')}
                  state={fieldState.error ? 'error' : (fieldState.isDirty ? 'success' : 'draft')}
                  {...field}
                />
              )}
            />
            {watch('residence.en') !== 'Slovakia' && (
              <>
                <Controller
                  control={control}
                  name="skPermit"
                  defaultValue={TRUE_OPTION}
                  render={({ field }) => (
                    <Select
                      label={t('form.skPermit')}
                      options={BOOLEAN_OPTIONS}
                      pathToLabel="name"
                      {...field}
                    />
                  )}
                />
              </>
            )}
          </FormItemRow>
        </FormItem>
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
      </FormItems>
    </>
  );
}