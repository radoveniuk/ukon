import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';

import Button from 'common/components/Button';
import Checkbox from 'common/components/forms/Checkbox';
import SearchSelect from 'common/components/forms/SearchSelect';
import Select from 'common/components/forms/Select';
import { CloseIcon } from 'common/components/icons';

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

const FREE_TYPE = 'Volná';

type Props = {
  label: string;
  value: Activity;
  onChange(v: Activity | null): void;
};

const ActivitySelect = ({ label, value: defaulValue, onChange }: Props) => {
  const translation = useTranslation('forms');
  const [value, setValue] = useState<null | Activity>(null);

  useEffect(() => {
    if (!isEqual(value, defaulValue)) {
      setValue(defaulValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaulValue]);

  return (
    <div className={styles.activitySelectWrapper}>
      {!value && (
        <div className={styles.top}>
          <SearchSelect
            options={activities}
            pathToLabel="ru"
            label={label}
            placeholder={translation.t('activitySelectPlaceholder')}
            actions={false}
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
            onChange={(v) => {
              onChange(v);
            }}
            value={value}
          />
          <Button variant="outlined" className={styles.selectFromListButton}>{translation.t('selectFromList')}</Button>
        </div>
      )}
      {!!value && (
        <div className={classNames(styles.valueWrapper, 't5')}>
          <div className={classNames(styles.label, 't5')}>{label}</div>
          <div className={styles.value}>
            <div className={styles.name}>{value.ru}</div>
            <div className={styles.type}>{value.Type !== FREE_TYPE ? value.Type : ''}</div>
            <div className={styles.price}>{value.Type !== FREE_TYPE ? '+7.50€' : ''}</div>
            <div
              role="button"
              onClick={() => {
                onChange(null);
              }}
            >
              <CloseIcon size={20} />
            </div>
          </div>
          {value.Type !== FREE_TYPE && (
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
    </div>
  );
};

export default ActivitySelect;
