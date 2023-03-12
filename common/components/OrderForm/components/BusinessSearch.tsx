import React, { useEffect, useRef, useState }  from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import TextField from 'common/components/forms/TextField';
import useDebounce from 'common/hooks/useDebounce';
import useOutsideClick from 'common/hooks/useOutsideClick';

import styles from 'styles/components/OrderForm/Search.module.scss';

import { CorporateBody } from '../types';

type Props = {
  onSearchResult(result: CorporateBody): void;
};

const BusinessSearch = ({ onSearchResult }: Props) => {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);

  const [searchResults, setSearchResults] = useState([]);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  useOutsideClick(searchBoxRef, () => {
    setOpenSearchBox(false);
  });

  const fetchSearchResult = (s: string) => {
    fetch(`/api/corporate-bodies-search?search=${s}`)
      .then((res) => res.json())
      .then((res) => {
        setOpenSearchBox(true);
        setSearchResults(res.data.filter((item: CorporateBody) => item.type === 'individual'));
      });
  };

  useEffect(() => {
    if (debouncedSearchValue.length > 3) {
      fetchSearchResult(debouncedSearchValue);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchValue]);

  return (
    <div className={styles.searchWrapper} ref={searchBoxRef}>
      <TextField
        label={t('form.nameOrId')}
        placeholder={t('form.nameOrIdInput')}
        className={classNames(styles['reg__item-input'], 'mb-15')}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onClick={() => void setOpenSearchBox(true)}
      />
      {openSearchBox && (
        <div className={styles.searchResults}>
          {searchResults.map((item: CorporateBody) => (
            <div
              key={item.cin}
              role="button"
              className={classNames(styles.searchResultItem, 't4')}
              onClick={() => {
                setOpenSearchBox(false);
                onSearchResult(item);
              }}
            >
              {item.name}, IČO {item.cin}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessSearch;
