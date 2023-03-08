import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import AddressForm from 'common/components/OrderForm/components/AddressForm';
import BusinessAdressSelectCard, { CardsContainer, Checkmark, Checkmarks, OwnAddressWrapper } from 'common/components/OrderForm/components/BusinessAdressSelect';

import styles from 'styles/OrderForm.module.scss';

import MultiSelect from '../../../../forms/MultiSelect';
import Radio, { RadioButton } from '../../../../forms/Radio';
import Select from '../../../../forms/Select';
import TextField from '../../../../forms/TextField';
import FormItems, { FormItem, FormItemRow } from '../../../components/FormItems';
import { usePriceContext } from '../../../contexts/PriceContext';
import activities from '../../../data/activities.json';
import addresses from '../../../data/address.json';
import countries from '../../../data/countries.json';
import virtualAddressTariffs from '../../../data/virtualAddressTariffs.json';

export default function PriceForm() {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, watch, setValue } = useFormContext();
  const [, updatePriceList] = usePriceContext();

  const residence = watch('residence');
  const mainActivity = watch('mainActivity');
  const otherActivities = watch('otherActivities');
  const citizenship = watch('citizenship');
  const vAddressPrice = watch('vAddressTariff.price');
  useEffect(() => {
    if (mainActivity) {
      if (mainActivity.Type === 'Volná') {
        updatePriceList({ mainActivity: 0 });
      } else {
        updatePriceList({ mainActivity: 7.5 });
      }
    } else {
      updatePriceList({ mainActivity: 0 });
    }
    if (otherActivities?.length) {
      let otherActivitiesPrice = 0;
      otherActivities.forEach((activity: any) => {
        if (activity.Type !== 'Volná') {
          otherActivitiesPrice += 7.5;
        }
      });
      updatePriceList({ otherActivities: otherActivitiesPrice });
    } else {
      updatePriceList({ otherActivities: 0 });
    }
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

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('entryText') }} />
      <FormItems>
        <FormItem title={t('activities')}>
          <Controller
            control={control}
            name="mainActivity"
            rules={{ required: t('form.requiredFieldText') }}
            defaultValue={null}
            render={({ field, fieldState }) => (
              <Select
                options={activities}
                pathToLabel="ru"
                label={t('form.mainActivity')}
                placeholder={t('form.activitySelectPlaceholder')}
                customRenderMenuItem={(item: any) => (
                  <>
                    <span className={styles['reg__item-project-select-wrapper-bot-item-title']}>
                      {item.ru}
                    </span>
                    <span className={styles['reg__item-project-select-wrapper-bot-item-price']}>
                      {item.Type !== 'Volná' ? 7.5 : 0}€
                    </span>
                  </>
                )}
                state={fieldState.error ? 'error' : (fieldState.isDirty ? 'success' : 'draft')}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="otherActivities"
            render={({ field }) => (
              <MultiSelect
                label={t('form.otherActivities')}
                pathToLabel="ru"
                options={activities}
                selectedOptions={field.value}
                handleChange={field.onChange}
                placeholder={t('form.activitySelectPlaceholder')}
                customRenderMenuItem={(item: any) => (
                  <>
                    <span className={styles['reg__item-project-select-wrapper-bot-item-title']}>
                      {item.ru}
                    </span>
                    <span className={styles['reg__item-project-select-wrapper-bot-item-price']}>
                      {item.Type !== 'Volná' ? 7.5 : 0}€
                    </span>
                  </>
                )}
              />
            )}
          />
        </FormItem>
        <FormItem title={t('form.businessAddress')}>
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
                        title="Úkon.sk Business Address & Virtual Mail Service"
                        checked={field.value === 'ukon'}
                        onSelect={() => { field.onChange('ukon'); }}
                      >
                        <Image height={90} width={90} src="/images/order-form/BusinessAddressUkon.svg" alt="" />
                        <div>This will be your principal company address:</div>
                        <Controller
                          control={control}
                          name="ourBusinessAddress"
                          defaultValue={addresses[0]}
                          render={({ field: addressField, fieldState: addressFieldState }) => (
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
                        title="Use My Own Address"
                        checked={field.value === 'own'}
                        onSelect={() => { field.onChange('own'); setValue('vAddressTariff', null); }}
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
                name="ownBusinessData"
                render={({ field }) => (
                  <OwnAddressWrapper>
                    <AddressForm country="sk" label="Company Address (Your Own Address)" value={field.value} onChange={field.onChange} />
                  </OwnAddressWrapper>
                )}
              />
            )}
          </>
        </FormItem>
        <FormItem title={t('additionalData')}>
          <FormItemRow cols={2}>
            <Controller
              control={control}
              name="citizenship"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  label={t('form.citizenship')}
                  placeholder={t('form.countryPlaceholder')}
                  options={countries}
                  pathToLabel="ru"
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
                <Select
                  label={t('form.residence')}
                  placeholder={t('form.countryPlaceholder')}
                  options={countries}
                  pathToLabel="ru"
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
                  defaultValue={{ value: true, name: t('yes') }}
                  render={({ field }) => (
                    <Select
                      label={t('form.skPermit')}
                      options={[
                        { value: true, name: t('yes') },
                        { value: false, name: t('no') },
                      ]}
                      pathToLabel="name"
                      {...field}
                    />
                  )}
                />
              </>
            )}
          </FormItemRow>
        </FormItem>
        <FormItem title={t('form.regAuth')}>
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
                    label={t('form.email')}
                  />
                  <TextField
                    label={t('form.pass')}
                    type="password"
                  />
                </>
              )}
              {!isRegistered && (
                <>
                  <TextField
                    label={t('form.email')}
                  />
                  <TextField
                    label={t('form.phone')}
                  />
                  <TextField
                    label={t('form.pass')}
                    type="password"
                  />
                  <TextField
                    label={t('form.passRepeat')}
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