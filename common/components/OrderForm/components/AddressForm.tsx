import { useEffect, useState } from 'react';
import { RxSlash } from 'react-icons/rx';
import { useTranslation } from 'next-i18next';
import { isEqual } from 'lodash-es';

import TextField from 'common/components/forms/TextField';
import { Address } from 'common/types/address';

import styles from 'styles/components/OrderForm/AddressForm.module.scss';

import AddressSearch from './AddressSearch';

type Props = {
  country: string;
  label: string;
  value?: Address;
  onChange(v: Address | undefined): void;
};

const needRegNumber = (country: string) => ['cz', 'sk'].includes(country.toLowerCase());

const AddressForm = ({ country, label, value, onChange }: Props) => {
  const [address, setAddress] = useState<Address | undefined>(value);
  const translation = useTranslation('address');
  const t = (path: string) => translation.t(path);

  const updateAddress = (update: Partial<Address>) => {
    setAddress((prev) => ({
      ...(prev || {}),
      ...update,
    }));
  };

  useEffect(() => {
    onChange(address);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (!isEqual(value, address)) {
      setAddress(value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}><AddressSearch key={country} country={country} onSearchResult={updateAddress} label={label} /></div>
      <div className={styles.row}>
        <TextField
          label={t('street')}
          value={address?.street || ''}
          onChange={(e) => void updateAddress({ street: e.target.value })}
        />
        <div className={styles.cell}>
          {needRegNumber(country) && (
            <>
              <TextField
                label={t('houseRegNumber')}
                value={address?.houseRegNumber || ''}
                onChange={(e) => void updateAddress({ houseRegNumber: e.target.value })}
              />
              <RxSlash size={30} />
            </>
          )}
          <TextField
            label={t('houseNumber')}
            value={address?.houseNumber || ''}
            onChange={(e) => void updateAddress({ houseNumber: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <TextField
          label={t('city')}
          value={address?.city || ''}
          onChange={(e) => void updateAddress({ city: e.target.value })}
        />
        <TextField
          label={t('zip')}
          value={address?.zip || ''}
          onChange={(e) => void updateAddress({ zip: e.target.value })}
        />
      </div>
    </div>
  );
};

export default AddressForm;
