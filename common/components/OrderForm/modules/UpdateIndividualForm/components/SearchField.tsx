import React, { useState }  from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import TextField from 'common/components/forms/TextField';

import styles from 'styles/OrderForm.module.scss';

type Props = {
  onSearchResult(result: unknown): void;
};

const SearchField = ({ onSearchResult }: Props) => {
  const translation = useTranslation('forms');
  const t = (path: string) => translation.t(`forms:update-individual:${path}`, { interpolation: { escapeValue: false } });
  const [value, setValue] = useState('');

  const fetchSearchResult = (s: string) => {
    const url = `https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=${Number.isNaN(Number(s)) ? `name:${s}` : `cin:${s}`}&private_access_token=755e6dd8af690571fc0ed957dde2adc56ce823e6549c2286914295ffad427bd387b651eb3dc593e1`;
    fetch(url)
      .then((res) => res.json())
      .then(([res]) => {
        onSearchResult(res);
      });
  };

  return (
    <TextField
      label={t('form.nameOrId')}
      placeholder={t('form.nameOrIdInput')}
      className={classNames(styles['reg__item-input'], 'mb-15')}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          fetchSearchResult(value);
        }
      }}
    />
  );
};

export default SearchField;
