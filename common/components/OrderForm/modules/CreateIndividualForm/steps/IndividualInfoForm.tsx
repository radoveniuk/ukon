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
import { isValidDate } from 'common/utils/date';

import styles from 'styles/OrderForm.module.scss';

import countries from '../../../data/countries.json';
import insurances from '../../../data/iтsurance.json';
import prefixes from '../../../data/prefixes.json';

export default function IndividualInfoForm () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, register, resetField, watch } = useFormContext();
  
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
                  handleChange={field.onChange}
                />
              )}
            />
            <TextField label={t('form.name')} placeholder={t('form.inputName')} {...register('name')} />
            <TextField label={t('form.surname')} placeholder={t('form.inputSurname')} {...register('surname')} />
            <Controller
              control={control}
              name="namePostfix"
              render={({ field }) => (
                <Select
                  label={t('form.namePostfix')}
                  placeholder={t('form.inputNamePostfix')}
                  options={prefixes.filter((item) => item.Type === 'Postfix')}
                  pathToLabel="Value"
                  handleChange={field.onChange}
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
              {...register('physicalNumber', { 
                required: true, 
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

                    const birthdateFormNumber = DateTime.fromFormat(`${dd}.${mm}.${yyyy}`, 'dd.MM.yyyy').toJSDate();
                    if (isValidDate(birthdateFormNumber)) {
                      resetField('birthdate', { defaultValue: birthdateFormNumber });
                    }
                  }
                },
              })}  
            />
            <Controller
              control={control}
              name="birthdate"
              render={({ field }) => (
                // <TextFieldFormated format="##.##.####" label={t('form.birthdate')} placeholder="01.07.2000" value={field.value || null} onChange={field.onChange} />
                <DatePicker placeholder="01.07.2000" value={field.value || null} onChange={field.onChange} label={t('form.birthdate')} />
              )}
            />
          </div>
        </FormItem>
        <FormItem title={t('form.docNumber')} number={3}>
          <TextField label={t('form.docNumber')} placeholder={t('form.inputDocNumber')} className={styles['reg__item-input']} {...register('docNumber', { required: true })} />
        </FormItem>
        <FormItem title={t('form.adress')} number={4}>
          <span className={classNames('t4', styles['reg__item-subtitle'])}>{t('form.adressResidence')}</span>
          <div className={styles['reg__item-adress-inputs']}>
            <TextField label={t('form.street')} placeholder={t('form.inputStreet')} {...register('street')} />
            <TextFieldFormated 
              format="########" 
              label={t('form.houseRegNumber')}
              {...register('houseRegNumber', { required: true })} 
            />
            <TextField
              label={t('form.houseNumber')}
              {...register('houseNumber', { required: true })} 
            />
            <TextField label={t('form.city')} placeholder={t('form.city')} {...register('city')} />
            <TextFieldFormated 
              format="#####"
              label={t('form.zip')}
              {...register('zip', { required: true })} 
            />
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select
                  label={t('form.countryPlaceholder')}
                  placeholder={t('form.countryPlaceholder')}
                  options={countries}
                  pathToLabel="ru"
                  handleChange={field.onChange}
                />
              )}
            />
          </div>
          <span className={classNames('t4', styles['reg__item-subtitle'])}>{t('form.adressSlovakResidence')}</span>
          <div className={styles['reg__item-adress-inputs']}>
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
        <FormItem title={t('form.insurance')} number={5}>
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
        <FormItem title={t('form.registerDate')} number={8}>
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