import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IoSaveOutline } from 'react-icons/io5';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import Radio from 'common/components/forms/Radio';
import Select from 'common/components/forms/Select';
import TextField from 'common/components/forms/TextField';
import EditIcon from 'common/components/icons/EditIcon';
import AddressForm from 'common/components/OrderForm/components/AddressForm';
import BusinessAdressSelectCard, { CardsContainer, Checkmark, Checkmarks, OwnAddressWrapper } from 'common/components/OrderForm/components/BusinessAdressSelect';
import useListState from 'common/hooks/useListState';

import styles from 'styles/components/OrderForm/UpdatePersonalInfoTable.module.scss';

import addresses from '../../../data/address.json';
import virtualAddressTariffs from '../../../data/virtualAddressTariffs.json';
import { useData } from '../contexts/DataContext';

type DataRow = {
  key: string;
  label: string;
  value?(): string | undefined;
  editComponent?: ReactNode;
  formValue?: string;
  editable?: boolean;
};

const PersonalInfo = () => {
  const [data] = useData();
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });
  const { register, watch, control, formState: { errors, touchedFields } } = useFormContext();

  const [savedFields, { add: addSavedField, remove: removeSavedField }] = useListState<string>();
  const [editFields, { add: addEditField, remove: removeEditField }] = useListState<string>();

  const tariffs = virtualAddressTariffs.map((tariff) => ({ ...tariff, name: `Package of services — ${tariff.name} (${tariff.price}€)` }));

  const ROWS_DATA: DataRow[] = [
    {
      key: 'id',
      label: 'form.companyId',
      value: () => data?.cin,
      editable: false,
    },
    {
      key: 'personalName',
      label: 'form.personalName',
      value: () => data?.name,
      editComponent: (
        <TextField
          label={t('form.name')}
          placeholder={t('form.inputName')}
          error={errors.name?.message?.toString()}
          success={!!touchedFields.name && !errors.name}
          {...register('fullname', { required: t('form.requiredFieldText') })}
        />
      ),
      formValue: watch('fullname') || '',
    },
    {
      key: 'companyName',
      label: 'form.companyName',
      value: () => data?.companyName,
      editComponent: (
        <div className={classNames(styles['reg__item-input'], styles['reg__item-company-name'])}>
          <TextField prefix={`${watch('fullname') || data?.name} -`} label={t('form.companyName')} {...register('companyName')} />
        </div>
      ),
      formValue: `${watch('fullname') || data?.name} - ${watch('companyName')}`,
    },
    {
      key: 'addressResidence',
      label: 'form.addressResidence',
      value: () => data?.address,
      editComponent: (
        <Controller
          control={control}
          name="addressResidence"
          render={({ field }) => (
            <AddressForm
              country="google"
              label={t('form.addressResidence')}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
      ),
      formValue: `${watch('addressResidence.street')}, ${watch('addressResidence.houseNumber')}, ${watch('addressResidence.city')}, ${watch('addressResidence.zip')}`,
    },
    {
      key: 'businessAddress',
      label: 'form.businessAddress',
      value: () => data?.businessAddress,
      editComponent: (
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
                      onSelect={() => { field.onChange('ukon'); }}
                    >
                      <Image height={90} width={90} src="/images/order-form/BusinessAddressUkon.svg" alt="" />
                      <div>{t('form.ourBusinessAddressSelect')}</div>
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
                      title={t('form.ownBusinessAddress')}
                      checked={field.value === 'own'}
                      onSelect={() => { field.onChange('own'); }}
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
      ),
    },
  ];

  const editRowRender = (dataItem: DataRow) => (
    <>
      <div className={styles.cell}>{t(dataItem.label)}</div>
      <div className={styles.cell}>
        {editFields.includes(dataItem.key) && <s>{dataItem.value?.()}</s>}
        {!editFields.includes(dataItem.key) && !savedFields.includes(dataItem.key) && <div>{dataItem.value?.()}</div>}
        {!editFields.includes(dataItem.key) && savedFields.includes(dataItem.key) && <p><s style={{ color: '#9e395d' }}>{dataItem.value?.()}</s>&nbsp;<span style={{ color: '#10826E' }}>{dataItem.formValue}</span></p> }
      </div>
      <div className={styles.cell}>
        {dataItem.editable !== false && !editFields.includes(dataItem.key) && (
          <EditIcon onClick={() => { addEditField(dataItem.key); removeSavedField(dataItem.key); }} />
        )}
        {editFields.includes(dataItem.key) && (
          <IoSaveOutline
            size={20}
            onClick={() => {
              removeEditField(dataItem.key);
              addSavedField(dataItem.key);
            }}
          />
        )}
      </div>
      {editFields.includes(dataItem.key) && (
        <div className={styles.editCell}>
          {dataItem.editComponent}
        </div>
      )}
    </>
  );

  return (
    <div className={styles.tableWrapper}>
      {ROWS_DATA.map((dataItem) => (
        <div className={styles.row} key={dataItem.key}>
          {editRowRender(dataItem)}
        </div>
      ))}
    </div>
  );
};

export default PersonalInfo;
