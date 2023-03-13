import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';

import Button from 'common/components/Button';
import Checkbox from 'common/components/forms/Checkbox';
import MultiSelect from 'common/components/forms/MultiSelect';
import SearchSelect from 'common/components/forms/SearchSelect';
import Select from 'common/components/forms/Select';
import { CloseIcon } from 'common/components/icons';
import useListState from 'common/hooks/useListState';

import styles from 'styles/components/OrderForm/ActivitySelect.module.scss';

import activities from '../data/activities.json';

type Activity = {
  Id: number;
  List: string;
  Type: string;
  Code: number | string;
  Value: string;
  ru: string;
  uk: string;
  en: string;
  representative?: any;
};

const getIndex = (n: number) => {
  if (n < 10) {
    return `0${n}.`;
  }
  return `${n}.`;
};

const FREE_TYPE = 'Volná';

type Props = {
  label: string;
  value: Activity[];
  onChange(v: Activity[]): void;
};

const ActivityMultiselect = ({ label, value, onChange }: Props) => {
  const translation = useTranslation('forms');

  return (
    <MultiSelect
      actions={false}
      options={activities}
      pathToLabel="ru"
      label={label}
      placeholder={translation.t('activitySelectPlaceholder')}
      customRenderMenuItem={(item) => (
        <>
          <span>
            {item.ru}
          </span>
          <span className={styles.activityOptionPrice}>
            {item.Type !== FREE_TYPE ? '+7.50€' : ''}
          </span>
        </>
      )}
      handleChange={onChange}
      selectedOptions={value}
      endAdorment={<Button variant="outlined" style={{ maxHeight: 44 }}>{translation.t('selectFromList')}</Button>}
      customRenderValueItem={(item: Activity, index, remove) => (
        <div key={item.Id} className={classNames(styles.multiselectSelectedItem, 't5')}>
          <div className={styles.value}>
            <div className={styles.index}>{getIndex(index + 1)}</div>
            <div className={styles.name}>{item.ru}</div>
            <div className={styles.type}>{item.Type !== FREE_TYPE ? item.Type : ''}</div>
            <div className={styles.price}>{item.Type !== FREE_TYPE ? '+7.50€' : ''}</div>
            <div
              role="button"
              onClick={() => { remove(item); }}
            >
              <CloseIcon size={20} />
            </div>
          </div>
          {item.Type !== FREE_TYPE && (
            <div className={styles.representative}>
              <Select
                label="Representative"
                options={[]}
                value={null}
                onChange={() => {}}
              />
              <Checkbox className={styles.representativeCheckbox} label="I certify that I have the appropriate education for entrepreneurship in this type of activity." />
            </div>
          )}
        </div>
      )}
    />
  );
};

export default ActivityMultiselect;
