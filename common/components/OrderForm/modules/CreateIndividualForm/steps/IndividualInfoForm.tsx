import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import _ from 'lodash-es';
import { DateTime } from 'luxon';

import FileInput from 'common/components/forms/FileInput';
import Select from 'common/components/forms/Select';
import TextArea from 'common/components/forms/TextArea';
import TextField, { TextFieldFormated } from 'common/components/forms/TextField';
import InfoIcon from 'common/components/icons/InfoIcon';
import UploadIcon from 'common/components/icons/UploadIcon';
import AddressForm from 'common/components/OrderForm/components/AddressForm';
import FormItems, { FormItem, FormItemRow } from 'common/components/OrderForm/components/FormItems';
import Tooltip from 'common/components/Tooltip';

import styles from 'styles/OrderForm.module.scss';

import insurances from '../../../data/insurance.json';

export default function IndividualInfoForm () {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, register, setValue, watch, formState: { errors, touchedFields } } = useFormContext();

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
        <FormItem iconSrc="/images/order-form/form-items/Profile.svg" title={t('fullname')}>
          <FormItemRow cols={2}>
            <TextField
              label={t('form.inputFullname')}
              placeholder={t('form.inputFullnamePlaceholder')}
              error={errors.fullname?.message?.toString()}
              success={!!touchedFields.fullname && !errors.fullname}
              {...register('fullname', { required: t('form.requiredFieldText') })}
            />
          </FormItemRow>
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/Residence.svg" title={t('form.addressResidence')}>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <AddressForm
                country={getAddressMode()}
                label={t('form.address')}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/ResidenceSk.svg" title={t('form.addressSlovakResidence')} >
          <Controller
            control={control}
            name="addressSk"
            render={({ field }) => (
              <AddressForm
                country="sk"
                label={t('form.address')}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/AdditionalProfile.svg" title={t('additionalPersonalData')}>
          <FormItemRow cols={2}>
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
            <Controller
              control={control}
              name="insurance"
              render={({ field }) => (
                <Select
                  label={t('form.insurance')}
                  options={insurances}
                  pathToLabel="ru"
                  {...field}
                />
              )}
            />
            <TextField
              label={t('form.docNumber')}
              placeholder={t('form.inputDocNumber')}
              className={styles['reg__item-input']}
              error={errors.docNumber?.message?.toString()}
              success={!!touchedFields.docNumber && !errors.docNumber}
              {...register('docNumber', { required: t('form.requiredFieldText') })}
            />
          </FormItemRow>
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/BusinessData.svg" title={t('businessData')}>
          <TextField prefix={`${watch('fullname')} -`} label={t('form.companyName')} {...register('companyName')} />
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/Note.svg" title={t('form.orderComment')}>
          <TextArea
            label={t('form.comment')}
            placeholder={t('form.inputComment')}
            style={{ height: 120 }}
            {...register('comment')}
          />
        </FormItem>
        <FormItem iconSrc="/images/order-form/form-items/Docs.svg" title={t('docsUpload')}>
          <div className={styles['reg__docs']}>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('proxyDoc')}</div>
                <Tooltip content={t('proxyDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="ProxyInfo" />
                </Tooltip>
              </div>
              <div className={classNames(styles['reg__doc-body'], 't4')}>
                <div className={styles.filesLink}>{t('downloadTemplate')}</div>
                <div className={styles.filesLink}>{t('sendTemplate')}</div>
                <div className={styles.filesLink}>{t('signOnline')}</div>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            {/* <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('realtyDoc')}</div>
                <Tooltip content={t('realtyDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="RealtyInfo" />
                </Tooltip>
              </div>
              <div className={classNames(styles['reg__doc-body'], 't4')}>
                <div className={styles.filesLink}>{t('downloadTemplate')}</div>
                <div className={styles.filesLink}>{t('sendTemplate')}</div>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div> */}
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('identDoc')}</div>
                <Tooltip content={t('identDocPlaceholder')}>
                  <InfoIcon className={styles['reg__doc-info']} id="IdentDocInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('nonConvictDoc')}</div>
                <Tooltip content={t('nonConvictDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="NotConvictInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div>
            {/* <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('residenceSkDoc')}</div>
                <Tooltip content={t('residenceSkDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="ResidenceSkDocInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div> */}
            {/* <div className={styles['reg__doc']}>
              <div className={styles['reg__doc-title']}>
                <div className={styles['reg__doc-title-text']}>{t('permitResidenceDoc')} {watch('residence.ru')}</div>
                <Tooltip content={t('permitResidenceDoc')}>
                  <InfoIcon className={styles['reg__doc-info']} id="PermitResidenceDocInfo" />
                </Tooltip>
              </div>
              <FileInput className={classNames(styles['reg__doc-fileinput'], 't2')}>
                <UploadIcon />
                {t('upload')}
              </FileInput>
            </div> */}
          </div>
        </FormItem>
      </FormItems>
    </>
  );
}
