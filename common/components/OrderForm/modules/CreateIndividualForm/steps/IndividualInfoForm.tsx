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
import FormItem from 'common/components/OrderForm/components/FormItem';

import styles from 'styles/OrderForm.module.scss';

import countries from '../../../data/countries.json';
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

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('individualInfoText') }} />
      <div className={styles.reg__items}>
        <FormItem number={1} title={t('form.physicalInfo')}>
          <div className={styles['reg__item-inputs']}>
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
        </FormItem>
        <FormItem number={2} title={t('form.numberAndBirthDate')}>
          <div className={styles['reg__item-inputs']}>
            <TextFieldFormated
              label={t('form.physicalNumber')}
              format="######/####"
              placeholder="XXXXXX/QQQQ"
              className={classNames('input', 't5')}
              error={errors.physicalNumber?.message?.toString() || !!errors.physicalNumber}
              success={!!touchedFields.physicalNumber && !errors.physicalNumber}
              {...register('physicalNumber', {
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
              })}
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
        <FormItem title={t('form.docNumber')} number={3}>
          <TextField
            label={t('form.docNumber')}
            placeholder={t('form.inputDocNumber')}
            className={styles['reg__item-input']}
            error={errors.docNumber?.message?.toString()}
            success={!!touchedFields.docNumber && !errors.docNumber}
            {...register('docNumber', { required: t('form.requiredFieldText') })}
          />
        </FormItem>
        <FormItem title={t('form.address')} number={4}>
          <span className={classNames('t4', styles['reg__item-subtitle'])}>{t('form.addressResidence')}</span>
          <div className={styles['reg__item-address-inputs']}>
            <TextField
              label={t('form.street')}
              placeholder={t('form.inputStreet')}
              error={errors.street?.message?.toString()}
              success={!!touchedFields.street && !errors.street}
              {...register('street', { required: t('form.requiredFieldText') })}
            />
            <TextFieldFormated
              format="########"
              label={t('form.houseRegNumber')}
              error={errors.houseRegNumber?.message?.toString()}
              success={!!touchedFields.houseRegNumber && !errors.houseRegNumber}
              {...register('houseRegNumber', { required: t('form.requiredFieldText') })}
            />
            <TextField
              label={t('form.houseNumber')}
              error={errors.houseNumber?.message?.toString()}
              success={!!touchedFields.houseNumber && !errors.houseNumber}
              {...register('houseNumber', { required: t('form.requiredFieldText') })}
            />
            <TextField
              label={t('form.city')}
              placeholder={t('form.city')}
              error={errors.city?.message?.toString()}
              success={!!touchedFields.city && !errors.city}
              {...register('city', { required: t('form.requiredFieldText') })}
            />
            <TextFieldFormated
              format="#####"
              label={t('form.zip')}
              error={errors.zip?.message?.toString()}
              success={!!touchedFields.zip && !errors.zip}
              {...register('zip', { required: t('form.requiredFieldText') })}
            />
            <Controller
              control={control}
              name="residence"
              render={({ field, fieldState }) => (
                <Select
                  label={t('form.countryPlaceholder')}
                  placeholder={t('form.countryPlaceholder')}
                  options={countries}
                  pathToLabel="ru"
                  state={fieldState.error ? 'error' : (fieldState.isDirty ? 'success' : 'draft')}
                  {...field}
                />
              )}
            />
          </div>
          <span className={classNames('t4', styles['reg__item-subtitle'])}>{t('form.addressSlovakResidence')}</span>
          <div className={styles['reg__item-address-inputs']}>
            <TextField disabled label={t('form.street')} placeholder={t('form.inputStreet')} {...register('streetSlovak')} />
            <TextFieldFormated
              format="###"
              disabled
              label={t('form.houseRegNumber')}
              {...register('houseRegNumberSlovak')}
            />
            <TextFieldFormated
              format="###"
              disabled
              label={t('form.houseNumber')}
              {...register('houseNumberSlovak')}
            />
            <TextField disabled label={t('form.city')} placeholder={t('form.city')} {...register('citySlovak')} />
            <TextFieldFormated
              format="#####"
              disabled
              label={t('form.zip')}
              {...register('zipSlovak')}
            />
            <TextField label={t('form.countryPlaceholder')} value="Slovensko" disabled />
          </div>
        </FormItem>
        <FormItem id="insurance" title={t('form.insurance')} number={5}>
          <Controller
            control={control}
            name="insurance"
            render={({ field }) => (
              <Radio name="insurance" className={styles['reg__item-radios']}>
                {insurances.map((item) => (
                  <RadioButton key={item.Code} onChange={(e) => e.target.checked && field.onChange(item)} defaultChecked={_.isEqual(field.value, item)}>{item.ru}</RadioButton>
                ))}
              </Radio>
            )}
          />
        </FormItem>
        <FormItem title={t('form.companyName')} number={6}>
          <div className={classNames(styles['reg__item-input'], styles['reg__item-company-name'])}>
            <strong>{companyNamePrefix}</strong>
            <TextField label={t('form.companyName')} {...register('companyName')} />
          </div>
        </FormItem>
        <FormItem title={t('form.companyNumber')} number={7}>
          <TextFieldFormated
            format="########"
            className={styles['reg__item-input']}
            label={t('form.companyNumber')}
            {...register('companyNumber')}
          />
        </FormItem>
        <FormItem id="registerDate" title={t('form.registerDate')} number={8}>
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
                    value={field.value || null}
                    onChange={field.onChange}
                    label={t('form.registerDate')}
                    className={styles['reg__item-input']}
                  />
                )}
              </>
            )}
          />
        </FormItem>
        <FormItem title={t('form.saveToProfile')} number={9}>
          <Checkbox label={t('form.save')} {...register('saveToProfile', { value: true })} />
        </FormItem>
        <FormItem title={t('form.orderComment')} number={10}>
          <TextArea
            label={t('form.comment')}
            placeholder={t('form.inputComment')}
            style={{ height: 120 }}
            {...register('comment')}
          />
        </FormItem>
      </div>
    </>
  );
}
