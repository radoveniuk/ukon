import { Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { DateTime } from 'luxon';

import DatePicker from 'common/components/forms/DatePicker';
import Select from 'common/components/forms/Select';
import TextField from 'common/components/forms/TextField';
import FormItem from 'common/components/OrderForm/components/FormItem';
import { isValidDate } from 'common/utils/date';

import styles from 'styles/OrderForm.module.scss';

import prefixes from '../../../data/prefixes.json';

export default function IndividualInfoForm () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, register, resetField } = useFormContext();

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('individualInfoText') }} />
      <div className={styles.reg__items}>
        <FormItem number={1} title={t('form.physicalInfo')}>
          <div className={styles['reg__item-inputs']}>
            <Select placeholder={t('form.namePrefix')} label={t('form.inputNamePrefix')} options={prefixes.filter((item) => item.Type === 'Prefix')} pathToLabel="Value" />
            <TextField label={t('form.name')} placeholder={t('form.inputName')} />
            <TextField label={t('form.surname')} placeholder={t('form.inputSurname')} />
            <Select placeholder={t('form.namePostfix')} label={t('form.inputNamePostfix')} options={prefixes.filter((item) => item.Type === 'Postfix')} pathToLabel="Value" />
          </div>
        </FormItem>
        <FormItem number={2} title={t('form.numberAndBirthDate')}>
          <div className={styles['reg__item-inputs']}>
            <PatternFormat
              format="######/####" 
              customInput={(props) => <TextField label={t('form.physicalNumber')} placeholder="XXXXXX/QQQQ" {...props} />} 
              {...register('physicalNumber', { 
                required: true, 
                onChange(event) {
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
                <DatePicker placeholder="01.07.2000" value={field.value || null} onChange={field.onChange} label={t('form.birthdate')} />
              )}
            />
          </div>
        </FormItem>
        <FormItem title={t('form.docNumber')} number={3}>
          <PatternFormat 
            format="##########" 
            customInput={(props) => <TextField label={t('form.docNumber')} placeholder={t('form.inputDocNumber')} {...props} />}
            className={styles['reg__item-input']} 
            {...register('docNumber', { required: true })} 
          />
        </FormItem>
      </div>
    </>
  );
}