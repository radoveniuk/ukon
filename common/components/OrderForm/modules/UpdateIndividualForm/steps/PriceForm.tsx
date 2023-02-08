import { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import Button from 'common/components/Button';
import Checkbox from 'common/components/forms/Checkbox';
import TextArea from 'common/components/forms/TextArea';
import EditIcon from 'common/components/icons/EditIcon';
import useListState from 'common/hooks/useListState';

import styles from 'styles/OrderForm.module.scss';

import MultiSelect from '../../../../forms/MultiSelect';
import Radio, { RadioButton } from '../../../../forms/Radio';
import Select from '../../../../forms/Select';
import TextField, { TextFieldFormated } from '../../../../forms/TextField';
import AccordionTable, { AccordionTableCell, AccordionTableRow } from '../../../components/AccordionTable';
import FormItem from '../../../components/FormItem';
import activities from '../../../data/activities.json';
import addresses from '../../../data/address.json';
import countries from '../../../data/countries.json';
import prefixes from '../../../data/prefixes.json';
import { usePriceContext } from '../contexts/PriceContext';

const PUBLIC_DATA = [
  {
    key: 'id',
    label: 'form.companyId',
    value: () => '54 943 990',
    editable: false,
  },
  {
    key: 'companyName',
    label: 'form.companyName',
    value: () => 'Mária Michalíková',
  },
  {
    key: 'personalName',
    label: 'form.personalName',
    value: () => 'Mária Michalíková',
  },
  {
    key: 'businessAddress',
    label: 'form.businessAddress',
    value: () => '01863 Ladce, Cementárska ulica 164/22',
  },
];

const ACTIVITIES = [
  {
    name: 'Skladovanie a pomocné činnosti v doprave',
    startDate: '28.09.2022',
    status: 'open',
  },
  {
    name: 'Skladovanie a pomocné činnosti v doprave',
    startDate: '28.09.2022',
    status: 'stopped',
  },
];

const ADDITIONAL_DATA = [
  {
    key: 'addressResidence',
    label: 'form.addressResidence',
    value: () => '01863 Ladce, Cementárska ulica 164/22, Slovenská republika',
  },
  {
    key: 'citizenship',
    label: 'form.citizenship',
    value: () => 'Slovenská republika',
  },
];

export default function PriceForm() {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });

  const { control, watch, register, setValue, formState: { errors, touchedFields } } = useFormContext();
  const [, updatePriceList] = usePriceContext();

  // auth
  const [isRegistered, setIsRegistered] = useState(true);

  const [editFields, addEditField, removeEditField] = useListState<string>();

  const { name, surname, namePrefix, namePostfix } = watch();
  const companyNamePrefix = useMemo(() => {
    return `${namePrefix?.Value ?? ''} ${name ?? ''} ${surname ?? ''} ${namePostfix?.Value ?? ''}`.trim().replaceAll(/  +/g, ' ');
  }, [name, namePostfix, namePrefix, surname]);

  const [activities] = useListState(ACTIVITIES);

  return (
    <>
      <div className={classNames(styles['reg-p'], 't2')} dangerouslySetInnerHTML={{ __html: t('entryText') }} />
      <div className={styles.reg__items}>
        <FormItem number={1} title={t('form.nameOrId')}>
          <TextField
            label={t('form.nameOrId')}
            placeholder={t('form.nameOrIdInput')}
            className={classNames(styles['reg__item-input'], 'mb-15')}
          />
        </FormItem>
        <FormItem number={2} title={t('form.actualData')}>
          <AccordionTable title={t('publicData')} gridTemplateColumns="356fr 634fr 1fr" className="t4" defaultOpen>
            {PUBLIC_DATA.map((dataItem) => (
              <AccordionTableRow key={dataItem.key}>
                <AccordionTableCell>{t(dataItem.label)}</AccordionTableCell>
                <AccordionTableCell>{dataItem.value()}</AccordionTableCell>
                <AccordionTableCell>
                  {dataItem.editable !== false && (
                    <EditIcon className={styles['reg__table-edit']} onClick={() => !editFields?.includes(dataItem.key) ? addEditField(dataItem.key) : removeEditField(dataItem.key)} />
                  )}
                </AccordionTableCell>
              </AccordionTableRow>
            ))}
          </AccordionTable>
          <AccordionTable title={t('activities')} gridTemplateColumns="356fr 634fr" className="t4" defaultOpen>
            {activities.map((activityItem, index) => (
              <AccordionTableRow key={`${activityItem.name}${index}`}>
                <AccordionTableCell>{index+1}. {activityItem.name} (от {activityItem.startDate})</AccordionTableCell>
                <AccordionTableCell className={styles['reg__table-actions']}>
                  {activityItem.status === 'open' && <Button color="warning">{t('stop')}</Button>}
                  {activityItem.status === 'stopped' && <Button>{t('start')}</Button>}
                  {activityItem.status === 'stopped' && <Button color="error">{t('close')}</Button>}
                </AccordionTableCell>
              </AccordionTableRow>
            ))}
          </AccordionTable>
          <AccordionTable title={t('additionalData')} gridTemplateColumns="356fr 634fr 1fr" className="t4" defaultOpen>
            {ADDITIONAL_DATA.map((dataItem) => (
              <AccordionTableRow key={dataItem.key}>
                <AccordionTableCell>{t(dataItem.label)}</AccordionTableCell>
                <AccordionTableCell>{dataItem.value()}</AccordionTableCell>
                <AccordionTableCell>
                  <EditIcon className={styles['reg__table-edit']} onClick={() => !editFields?.includes(dataItem.key) ? addEditField(dataItem.key) : removeEditField(dataItem.key)} />
                </AccordionTableCell>
              </AccordionTableRow>
            ))}
          </AccordionTable>
        </FormItem>
        <FormItem number={3} title={t('form.editor')}>
          {editFields?.includes('companyName') && (
            <div className={classNames(styles['reg__item-input'], styles['reg__item-company-name'])}>
              {!!companyNamePrefix && <strong>{companyNamePrefix}</strong>}
              <TextField label={t('form.companyName')} {...register('companyName')} />
            </div>
          )}
          {editFields?.includes('personalName') && (
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
          )}
          {editFields.includes('businessAddress') && (
            <Controller
              control={control}
              name="businessAddress"
              rules={{ required: true }}
              defaultValue="ukon"
              render={({ field }) => (
                <>
                  <Radio className={classNames('mb-15', styles['reg__item-radios'])} name="virtual">
                    <RadioButton checked={field.value === 'ukon'} onSelect={() => void field.onChange('ukon')} dangerouslySetInnerHTML={{ __html: t('form.ourBusinessAddressHtml') }} />
                    <RadioButton checked={field.value === 'own'} onSelect={() => void field.onChange('own')} dangerouslySetInnerHTML={{ __html: t('form.ownBusinessAddressHtml') }}  />
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
          )}
          {editFields.includes('addressResidence') && (
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
          )}
          {editFields.includes('citizenship') && (
            <div className={styles['reg__item-project']}>
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
                  />
                )}
              />
            </div>
          )}
        </FormItem>
        <FormItem number={4} title={t('dataForEditings')}></FormItem>
        <FormItem title={t('form.orderComment')} number={5}>
          <TextArea
            label={t('form.comment')}
            placeholder={t('form.inputComment')}
            style={{ height: 120 }}
            {...register('comment')}
          />
        </FormItem>
        <FormItem number={6} title={t('form.promo')}>
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
        </FormItem>
        <FormItem title={t('form.saveToProfile')} number={7}>
          <Checkbox label={t('form.save')} {...register('saveToProfile', { value: true })} />
        </FormItem>
        <FormItem number={8} title={t('form.isRegistered')}>
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
            <FormItem number={9} title={t('form.email')}>
              <TextField
                label={t('form.email')}
                className={styles['reg__item-input']}
              />
            </FormItem>
            <FormItem number={10} title={t('form.pass')}>
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
            <FormItem number={9} title={t('form.email')}>
              <TextField
                label={t('form.email')}
                className={styles['reg__item-input']}
              />
            </FormItem>
            <FormItem number={10} title={t('form.pass')}>
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
            <FormItem number={11} title={t('form.phone')}>
              <TextField
                label={t('form.phone')}
                className={styles['reg__item-input']}
              />
            </FormItem>
          </>
        )}
      </div>
    </>
  );
}