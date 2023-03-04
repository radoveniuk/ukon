import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import styles from 'styles/OrderForm.module.scss';

import MultiSelect from '../../../../forms/MultiSelect';
import Radio, { RadioButton } from '../../../../forms/Radio';
import Select from '../../../../forms/Select';
import TextField from '../../../../forms/TextField';
import FormItems, { FormItem } from '../../../components/FormItems';
import activities from '../../../data/activities.json';
import addresses from '../../../data/address.json';
import countries from '../../../data/countries.json';
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
                <Radio className={classNames('mb-15', styles['reg__item-radios'])} name="virtual">
                  <RadioButton checked={field.value === 'ukon'} onSelect={() => void field.onChange('ukon')} dangerouslySetInnerHTML={{ __html: t('form.ourBusinessAddressHtml') }} />
                  {residence?.en === 'Slovakia' && <RadioButton checked={field.value === 'own'} onSelect={() => void field.onChange('own')} dangerouslySetInnerHTML={{ __html: t('form.ownBusinessAddressHtml') }}  />}
                  <RadioButton checked={field.value === 'other'} onSelect={() => void field.onChange('other')} dangerouslySetInnerHTML={{ __html: t('form.otherBusinessAddress') }}  />
                </Radio>
                {field.value === 'ukon' && (
                  <Controller
                    control={control}
                    name="ourBusinessAddress"
                    defaultValue={addresses[0]}
                    render={({ field: addressField, fieldState: addressFieldState }) => (
                      <Select
                        {...addressField}
                        className={styles['reg__item-project-select']}
                        label={t('form.address')}
                        pathToLabel="value"
                        options={addresses}
                        state={!addressField.value && addressFieldState.isTouched ? 'error' : (addressFieldState.isDirty ? 'success' : 'draft')}
                      />
                    )}
                  />
                )}
              </>
            )}
          />
        </FormItem>
        <FormItem title={t('form.vAddressTariff')}>
          <Controller
            control={control}
            name="vAddressTariff"
            render={({ field }) => (
              <Radio className={styles['reg__item-radios']} name="vAddressTariff">
                <RadioButton onSelect={() => { updatePriceList({ vAddressTariff: 19 }); field.onChange(19); }}>
              «Стив Джобс» (19€)*<span className="t5">*открытие ИП</span>
                </RadioButton>
                <RadioButton onSelect={() => { updatePriceList({ vAddressTariff: 69 }); field.onChange(69); }}>
              «Билл Гейтс» (69€)*<span className="t5">*открытие ИП + Виртуальный адрес - Базовый пакет (до 5 писем в год)</span>
                </RadioButton>
                <RadioButton onSelect={() => { updatePriceList({ vAddressTariff: 114 }); field.onChange(114); }}>
              «Илон Маск» (114€)*<span className="t5">*открытие ИП + Виртуальный адрес - Cтандарт (до 100 писем в год)</span>
                </RadioButton>
              </Radio>
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