import React, { useEffect, useRef, useState }  from 'react';
import usePlacesAutocompleteService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import TextField from 'common/components/forms/TextField';
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
};

const AddressSearch = ({ onSearchResult }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:create-individual:${path}`, { interpolation: { escapeValue: false } });

  const [openSearchBox, setOpenSearchBox] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  useOutsideClick(searchBoxRef, () => {
    setOpenSearchBox(false);
  });

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesAutocompleteService({
    apiKey: 'AIzaSyAbbTlL3D-bcmHjdbKBmOl0Fw-Ie60uYNU',
    debounce: 500,
    language: 'sk',
  });

  return (
    <div className={styles.searchWrapper} ref={searchBoxRef}>
      <TextField
        label={t('form.address')}
        placeholder={t('form.address')}
        value={searchValue}
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
          setSearchValue(evt.target.value);
        }}
        onClick={() => void setOpenSearchBox(true)}
      />
      {openSearchBox && (
        <div className={styles.searchResults}>
          {placePredictions.map((item: any) => (
            <div
              key={item.place_id}
              role="button"
              className={classNames(styles.searchResultItem, 't4')}
              onClick={() => {
                setOpenSearchBox(false);
                setSearchValue(item.description);
                placesService?.getDetails(
                  { placeId: item.place_id },
                  ({ address_components }: GooglePlaceDetailes) => {
                    const result: Address = {};
                    (Object.keys(ADDRESS_MAP) as (keyof Address)[]).forEach((addressKey) => { result[addressKey] = address_components.find((_) => _.types.includes(ADDRESS_MAP[addressKey]))?.long_name; });
                    onSearchResult(result);
                  }
                );
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
