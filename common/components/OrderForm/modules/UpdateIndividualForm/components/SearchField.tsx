import React, { useEffect, useRef, useState }  from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import TextField from 'common/components/forms/TextField';
import useDebounce from 'common/hooks/useDebounce';
import useOutsideClick from 'common/hooks/useOutsideClick';

import styles from 'styles/OrderForm.module.scss';

type Props = {
  onSearchResult(result: unknown): void;
};

const SearchField = ({ onSearchResult }: Props) => {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);

  const [searchResults, setSearchResults] = useState([]);
  const [openSearchBox, setOpenSeacrhBox] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  useOutsideClick(searchBoxRef, () => {
    setOpenSeacrhBox(false);
  });

  const fetchSearchResult = (s: string) => {
    fetch(`/api/corporate-bodies-search?search=${s}`)
      .then((res) => res.json())
      .then((res) => {
        setOpenSeacrhBox(true);
        setSearchResults(res.filter((item: any) => item.legal_form === 'Podnikateľ-fyzická osoba-nezapísaný v obchodnom registri'));
      });
  };

  const fetchSelectedItem = (s: string) => {
    fetch(`/api/corporate-bodies?search=${s}`)
      .then((res) => res.json())
      .then((res) => {
        onSearchResult(res.data);
      });
  };

  useEffect(() => {
    if (debouncedSearchValue.length > 3) {
      fetchSearchResult(debouncedSearchValue);
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
        onClick={() => void setOpenSeacrhBox(true)}
      />
      {openSearchBox && (
        <div className={styles.searchResults}>
          {searchResults.map((item: any) => (
            <div
              key={item.id}
              role="button"
              className={classNames(styles.searchResultItem, 't4')}
              onClick={() => {
                setOpenSeacrhBox(false);
                fetchSelectedItem(item.cin);
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

export default SearchField;
