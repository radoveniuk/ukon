import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BsCheck2 } from 'react-icons/bs';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import BuisnessAdressSelectCard, { CardsContainer, Checkmark, Checkmarks } from 'common/components/OrderForm/components/BuisnessAdressSelectCard';

import styles from 'styles/OrderForm.module.scss';

import MultiSelect from '../../../../forms/MultiSelect';
import Radio, { RadioButton } from '../../../../forms/Radio';
import Select from '../../../../forms/Select';
import TextField from '../../../../forms/TextField';
import FormItems, { FormItem } from '../../../components/FormItems';
import activities from '../../../data/activities.json';
import addresses from '../../../data/address.json';
import countries from '../../../data/countries.json';
import virtualAddressTariffs from '../../../data/virtualAddressTariffs.json';
import { usePriceContext } from '../contexts/PriceContext';

export default function PriceForm() {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, watch, register, setValue, formState: { errors } } = useFormContext();
  const [, updatePriceList] = usePriceContext();

  const residence = watch('residence');
  const mainActivity = watch('mainActivity');
  const otherActivities = watch('otherActivities');
  const citizenship = watch('citizenship');
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
  }, [citizenship?.en, mainActivity, otherActivities, residence?.en, updatePriceList]);

  // auth
  const [isRegistered, setIsRegistered] = useState(true);

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('entryText') }} />
      <FormItems>
        <FormItem title={t('form.mainActivity')}>
          <div className={styles['reg__item-project']}>
            <Controller
              control={control}
              name="mainActivity"
              rules={{ required: t('form.requiredFieldText') }}
              defaultValue={null}
              render={({ field, fieldState }) => (
                <Select
                  options={activities}
                  pathToLabel="ru"
                  label={t('form.activitySearch')}
                  className={styles['reg__item-project-select']}
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
          </div>
        </FormItem>
        <FormItem title= {t('form.otherActivities')}>
          <div className={styles['reg__item-project']}>
            <Controller
              control={control}
              name="otherActivities"
              render={({ field }) => (
                <MultiSelect
                  tooltip="<div>В случае добавления ремесленного или регулируемого вида деятельности необходимо установить ответственного представителя имеющего соответствующую квалификацию.<br>Также, будет необходимо приложить к заявке документы подтверждающие квалификацию ответственного лица и его согласие<br>За каждый регулируемый и ремесленный вид деятельности к стоимости добавляется 7,5 евро</div>"
                  className={styles['reg__item-project-select']}
                  label={t('form.activitySearch')}
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
            {/* <div className={classNames(styles['reg__item-project-btn'], 'btn-text', 'btn-transparent')}>
              {t('form.activitiesList')}
            </div> */}
          </div>
        </FormItem>
        <FormItem title={t('form.citizenshipAndResidence')}>
          <div className={styles['reg__item-project']} style={{ gap: 20 }}>
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
                  className={styles['reg__item-project-country-select']}
                  options={countries}
                  pathToLabel="ru"
                  state={fieldState.error ? 'error' : (fieldState.isDirty ? 'success' : 'draft')}
                  {...field}
                />
              )}
            />
          </div>
        </FormItem>
        <FormItem title={t('form.businessAddress')}>
          <Controller
            control={control}
            name="businessAddress"
            rules={{ required: true }}
            defaultValue="ukon"
            render={({ field }) => (
              <>
                <Radio className={classNames('mb-15')} name="businessAddress">
                  <CardsContainer>
                    <BuisnessAdressSelectCard
                      title="Úkon.sk Business Address & Virtual Mail Service"
                      checked={field.value === 'ukon'}
                      onSelect={() => void field.onChange('ukon')}
                    >
                      <Image height={90} width={90} src="/images/order-form/BuisnessAddressUkon.svg" alt="" />
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
                            state={!addressField.value && addressFieldState.isTouched ? 'error' : (addressFieldState.isDirty ? 'success' : 'draft')}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="vAddressTariff"
                        defaultValue={virtualAddressTariffs[0]}
                        render={({ field: tariffField, fieldState: tariffFieldState }) => (
                          <Select
                            {...tariffField}
                            pathToLabel="name"
                            onChange={(value) => {
                              tariffField.onChange(value);
                              updatePriceList({ vAddressTariff: value?.price });
                            }}
                            options={virtualAddressTariffs.map((tariff) => ({ ...tariff, name: `Package of services — ${tariff.name} (${tariff.price}€)` }))}
                            state={!tariffField.value && tariffFieldState.isTouched ? 'error' : (tariffFieldState.isDirty ? 'success' : 'draft')}
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
                    </BuisnessAdressSelectCard>
                    <BuisnessAdressSelectCard
                      title="Use My Own Address"
                      checked={field.value === 'own'}
                      onSelect={() => void field.onChange('own')}
                    >
                      <Image height={90} width={90} src="/images/order-form/BuisnessAddressOwn.svg" alt="" />
                      <div className="mb-15">I will provide my own Slovak business address and will personally keep up with the incoming mail.</div>
                      <div className="mb-15">Slovakia requires a physical street address (P.O Boxes are not accepted).</div>
                      <div className="mb-15">Any residential address provided to the state will be listed publicly.</div>
                      <div className="mb-15">You need authorized representative for mail, which must be a person with permanent residence in Slovakia, or Úkon.sk s.r.o. (40€)</div>
                    </BuisnessAdressSelectCard>
                  </CardsContainer>
                </Radio>
              </>
            )}
          />
        </FormItem>
        {/* <FormItem title={t('form.promo')}>
          <TextField
            label={t('form.inputPromo')}
            className={styles['reg__item-input']}
            onKeyDown={(event) => {
              const allowed = /^[a-zA-Z]+$/;
              if (!Number.isNaN(Number(event.key)) || allowed.test(event.key)) {
                return true;
              }
              event.preventDefault();
            }}
            {...register('promo')}
          />
        </FormItem> */}
        <FormItem title={t('form.isRegistered')}>
          <Radio className={styles['reg__item-radios']} name="isRegistered">
            <RadioButton checked={isRegistered} onSelect={() => void setIsRegistered(true)}>
              {t('yes')}
            </RadioButton>
            <RadioButton checked={!isRegistered} onSelect={() => void setIsRegistered(false)}>
              {t('no')}
            </RadioButton>
          </Radio>
        </FormItem>
        {isRegistered && (
          <>
            <FormItem title={t('form.email')}>
              <TextField
                label={t('form.email')}
                className={styles['reg__item-input']}
              />
            </FormItem>
            <FormItem title={t('form.pass')}>
              <TextField
                label={t('form.pass')}
                className={styles['reg__item-input']}
                type="password"
              />
            </FormItem>
          </>
        )}
        {!isRegistered && (
          <>
            <FormItem title={t('form.email')}>
              <TextField
                label={t('form.email')}
                className={styles['reg__item-input']}
              />
            </FormItem>
            <FormItem title={t('form.pass')}>
              <div className={styles['reg__item-project']} style={{ gap: 20 }}>
                <TextField
                  label={t('form.pass')}
                  className={styles['reg__item-input']}
                  type="password"
                />
                <TextField
                  label={t('form.passRepeat')}
                  className={styles['reg__item-input']}
                  type="password"
                />
              </div>
            </FormItem>
            <FormItem title={t('form.phone')}>
              <TextField
                label={t('form.phone')}
                className={styles['reg__item-input']}
              />
            </FormItem>
          </>
        )}
      </FormItems>
    </>
  );
}