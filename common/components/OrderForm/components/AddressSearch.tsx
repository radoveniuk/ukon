import React, { useCallback, useEffect, useRef, useState }  from 'react';
import usePlacesAutocompleteService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { debounce, delay } from 'lodash-es';

import TextField from 'common/components/forms/TextField';
import useDebounce from 'common/hooks/useDebounce';
import useOutsideClick from 'common/hooks/useOutsideClick';

import styles from 'styles/OrderForm.module.scss';

type GooglePlaceDetailes = {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[]
}

type Address = {
  street?: string;
  houseNumber?: string;
  houseRegNumber?: string;
  city?: string;
  zip?: string;
  country?: string;
}

const ADDRESS_MAP = { street: 'route', houseNumber: 'street_number', city: 'locality', zip: 'postal_code', country: 'country', houseRegNumber: '' };

type Props = {
  onSearchResult(result: Address): void;
  mode?: 'google' | 'sk' | 'cz';
};

const AddressSearch = ({ onSearchResult, mode = 'google' }: Props) => {
  console.log(mode);

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const [openSearchBox, setOpenSearchBox] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  useOutsideClick(searchBoxRef, () => {
    setOpenSearchBox(false);
  });

  const { placesService, placePredictions, getPlacePredictions } = usePlacesAutocompleteService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY,
    debounce: 500,
    language: 'sk',
  });

  const [czskAddresses,  setCzskAddresses] = useState<(Address & { description: string })[]>([]);

  const getCzskSearchResults = useCallback((search: string) => {
    const headers = new Headers();
    headers.append('Authorization', 'Basic bmxBekY3Um56aDprT0h0NFU5Tw==');
    headers.append('Content-Type', 'application/json');

    fetch(`/api/smartform-addresses?search=${search}&country=${mode}`, {
      method: 'POST',
      headers,
      redirect: 'follow' })
      .then(response => response.json())
      .then(result => {
        setCzskAddresses(result.data);
      })
      .catch(error => console.log('error', error));
  }, [mode]);

  useEffect(() => {
    if (mode !== 'google' && debouncedSearchValue.length) {
      getCzskSearchResults(debouncedSearchValue);
    }
  }, [debouncedSearchValue, getCzskSearchResults, mode]);

  return (
    <div className={styles.searchWrapper} ref={searchBoxRef}>
      <TextField
        label={t('form.address')}
        placeholder={t('form.address')}
        value={searchValue}
        onChange={(evt) => {
          setSearchValue(evt.target.value);
          if (mode === 'google') {
            getPlacePredictions({ input: evt.target.value });
          }
        }}
        onClick={() => void setOpenSearchBox(true)}
      />
      {openSearchBox && (
        <div className={styles.searchResults}>
          {(mode === 'google' ? placePredictions : czskAddresses).map((item: any) => (
            <div
              key={item.description}
              role="button"
              className={classNames(styles.searchResultItem, 't4')}
              onClick={() => {
                setOpenSearchBox(false);
                setSearchValue(item.description);
                if (mode === 'google') {
                  placesService?.getDetails(
                    { placeId: item.place_id },
                    ({ address_components }: GooglePlaceDetailes) => {
                      const result: Address = {};
                      (Object.keys(ADDRESS_MAP) as (keyof Address)[]).forEach((addressKey) => { result[addressKey] = address_components.find((_) => _.types.includes(ADDRESS_MAP[addressKey]))?.long_name; });
                      onSearchResult(result);
                    }
                  );
                } else {
                  onSearchResult(item);
                }
              }}
            >
              {item.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressSearch;
