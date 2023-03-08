import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import _ from 'lodash-es';
import { DateTime } from 'luxon';

import Checkbox from 'common/components/forms/Checkbox';
import DatePicker from 'common/components/forms/DatePicker';
import Radio, { RadioButton } from 'common/components/forms/Radio';
import Select from 'common/components/forms/Select';
import TextArea from 'common/components/forms/TextArea';
import TextField, { TextFieldFormated } from 'common/components/forms/TextField';
import AddressForm from 'common/components/OrderForm/components/AddressForm';
import AddressSearch from 'common/components/OrderForm/components/AddressSearch';
import FormItems, { FormItem } from 'common/components/OrderForm/components/FormItems';

import styles from 'styles/OrderForm.module.scss';

import insurances from '../../../data/insurance.json';
import prefixes from '../../../data/prefixes.json';

export default function IndividualInfoForm () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, register, setValue, watch, formState: { errors, touchedFields } } = useFormContext();

  const { name, surname, namePrefix, namePostfix } = watch();
  const companyNamePrefix = useMemo(() => {
    return `${namePrefix?.Value ?? ''} ${name ?? ''} ${surname ?? ''} ${namePostfix?.Value ?? ''}`.trim().replaceAll(/  +/g, ' ');
  }, [name, namePostfix, namePrefix, surname]);

  const getAddressMode = () => {
    const countriesMap: { [key: number]: 'sk' | 'cz' } = {
      703: 'sk',
      203: 'cz',
    };
    const countryCode = watch('residence.Code');
    return countriesMap[countryCode] || 'google';
  };

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('individualInfoText') }} />
      <FormItems>
        <FormItem  title={t('form.physicalInfo')}>
          <div className={styles['reg__item-name-inputs']}>
            <div className={styles['reg__item-name-inputs-name']}>
              <Controller
                control={control}
                name="namePrefix"
                render={({ field }) => (
                  <Select
                    label={t('form.namePrefix')}
                    placeholder={t('form.inputNamePrefix')}
                    options={prefixes.filter((item) => item.Type === 'Prefix')}
                    pathToLabel="Value"
                    {...field}
                  />
                )}
              />
              <TextField
                label={t('form.name')}
                placeholder={t('form.inputName')}
                error={errors.name?.message?.toString()}
                success={!!touchedFields.name && !errors.name}
                {...register('name', { required: t('form.requiredFieldText') })}
              />
            </div>
            <div className={styles['reg__item-name-inputs-surname']}>
              <TextField
                label={t('form.surname')}
                placeholder={t('form.inputSurname')}
                error={errors.surname?.message?.toString()}
                success={!!touchedFields.surname && !errors.surname}
                {...register('surname', { required: t('form.requiredFieldText') })}
              />
              <Controller
                control={control}
                name="namePostfix"
                render={({ field }) => (
                  <Select
                    label={t('form.namePostfix')}
                    placeholder={t('form.inputNamePostfix')}
                    options={prefixes.filter((item) => item.Type === 'Postfix')}
                    pathToLabel="Value"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </FormItem>
        <FormItem  title={t('form.numberAndBirthDate')}>
          <div className={styles['reg__item-inputs']}>
            <Controller
              control={control}
              name="physicalNumber"
              rules={{
                required: t('form.requiredFieldText'),
                validate: {
                  minLength: (v) =>  v.replaceAll(' ', '').length === 11,
                },
                onChange (event) {
                  const val = event.target.value.replaceAll(' ', '') as string;
                  if (val.length === 11) {
                    const [dateBody] = val.split('/');
                    const yy = Number(dateBody.slice(0, 2));

                    let yyyy = '';
                    const currentYear = DateTime.now().year;

                    if (yy > currentYear - 2000) {
                      yyyy = `${1900 + yy}`;
                    } else {
                      yyyy = `${2000 + yy}`;
                    }

                    const im = dateBody.slice(2, 4);
                    let mm = '';
                    if (im.startsWith('1') || im.startsWith('0')) {
                      mm = im;
                    } else {
                      mm = `0${im.slice(1, 2)}`;
                    }

                    let dd = dateBody.slice(4, 6);

                    const birthdateFormNumber = DateTime.fromFormat(`${dd}.${mm}.${yyyy}`, 'dd.MM.yyyy');
                    if (birthdateFormNumber.isValid) {
                      setValue('birthdate', `${dd}.${mm}.${yyyy}`);
                    }
                  }
                },
              }}
              render={({ field }) => (
                <TextFieldFormated
                  label={t('form.physicalNumber')}
                  format="######/####"
                  placeholder="XXXXXX/QQQQ"
                  className={classNames('input', 't5')}
                  error={errors.physicalNumber?.message?.toString() || !!errors.physicalNumber}
                  success={!!touchedFields.physicalNumber && !errors.physicalNumber}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="birthdate"
              rules={{
                required: t('form.requiredFieldText'),
                validate: {
                  minLength: (v) => v.replaceAll('.', '').replaceAll('_', '').length === 8,
                },
              }}
              render={({ field, fieldState }) => (
                <TextFieldFormated
                  format="##.##.####"
                  label={t('form.birthdate')}
                  placeholder="01.07.2000"
                  mask="_"
                  error={fieldState.error?.message || !!fieldState.error}
                  success={!!fieldState.isTouched && !fieldState.error}
                  {...field}
                />
              )}
            />
          </div>
        </FormItem>
        <FormItem title={t('form.docNumber')} >
          <TextField
            label={t('form.docNumber')}
            placeholder={t('form.inputDocNumber')}
            className={styles['reg__item-input']}
            error={errors.docNumber?.message?.toString()}
            success={!!touchedFields.docNumber && !errors.docNumber}
            {...register('docNumber', { required: t('form.requiredFieldText') })}
          />
        </FormItem>
        <FormItem title={t('form.addressResidence')} >
          <AddressForm
            country={getAddressMode()}
            label={t('form.address')}
            onChange={(values) => {
              setValue('street', values?.street, { shouldValidate: true });
              setValue('houseNumber', values?.houseNumber, { shouldValidate: true });
              setValue('city', values?.city, { shouldValidate: true });
              setValue('zip', values?.zip, { shouldValidate: true });
            }}
          />
        </FormItem>
        <FormItem title={t('form.addressSlovakResidence')} >
          <AddressForm
            country="sk"
            label={t('form.address')}
            onChange={(values) => {
              setValue('streetSlovak', values?.street, { shouldValidate: true });
              setValue('houseRegNumberSlovak', values?.houseRegNumber);
              setValue('houseNumberSlovak', values?.houseNumber, { shouldValidate: true });
              setValue('citySlovak', values?.city, { shouldValidate: true });
              setValue('zipSlovak', values?.zip, { shouldValidate: true });
            }}
          />
        </FormItem>
        <FormItem id="insurance" title={t('form.insurance')} >
          <Controller
            control={control}
            name="insurance"
            render={({ field }) => (
              <Radio name="insurance" className={styles['reg__item-radios']}>
                {insurances.map((item) => (
                  <RadioButton key={item.Code} onChange={(e) => e.target.checked && field.onChange(item)} checked={_.isEqual(field.value, item)}>{item.ru}</RadioButton>
                ))}
              </Radio>
            )}
          />
        </FormItem>
        <FormItem title={t('form.companyName')} >
          <div className={classNames(styles['reg__item-input'], styles['reg__item-company-name'])}>
            <TextField prefix={`${companyNamePrefix} -`} label={t('form.companyName')} {...register('companyName')} />
          </div>
        </FormItem>
        <FormItem title={t('form.companyNumber')}>
          <TextFieldFormated
            format="########"
            className={styles['reg__item-input']}
            label={t('form.companyNumber')}
            {...register('companyNumber')}
          />
        </FormItem>
        <FormItem id="registerDate" title={t('form.registerDate')}>
          <Controller
            control={control}
            name="registerDate"
            defaultValue={null}
            render={({ field }) => (
              <>
                <Radio className={styles['reg__item-radios']} name="registerDate">
                  <RadioButton checked={field.value === 'asap'} onSelect={() => field.onChange('asap')}>{t('form.asap')}</RadioButton>
                  <RadioButton checked={field.value !== 'asap' && field.value !== null} onSelect={() => field.onChange('')}>{t('form.certainDate')}</RadioButton>
                </Radio>
                {field.value !== 'asap' && field.value !== null && (
                  <DatePicker
                    min={DateTime.now().plus({ month: 1 }).toJSDate()}
                    value={field.value ? new Date(field.value) : null}
                    onChange={field.onChange}
                    label={t('form.registerDate')}
                    className={styles['reg__item-input']}
                  />
                )}
              </>
            )}
          />
        </FormItem>
        <FormItem title={t('form.saveToProfile')}>
          <Checkbox label={t('form.save')} {...register('saveToProfile', { value: true })} />
        </FormItem>
        <FormItem title={t('form.orderComment')}>
          <TextArea
            label={t('form.comment')}
            placeholder={t('form.inputComment')}
            style={{ height: 120 }}
            {...register('comment')}
          />
        </FormItem>
      </FormItems>
    </>
  );
}
