import * as React from 'react';
import classNames from 'classnames';
import { useCombobox } from 'downshift';
import _ from 'lodash-es';

import styles from 'styles/components/forms/Select.module.scss';

import DropdownIcon from '../icons/DropdownIcon';
import MinusIcon from '../icons/MinusIcon';

type CustomRenderMenuItem = (item: any) => React.ReactNode | string;

type ComboBoxProps = {
  options: any[];
  pathToLabel?: string;
  value: any | null;
  onChange(value: any): void;
  label?: string;
  placeholder?: string;
  className?: string;
  onBlur?(e: any): void;
  customRenderMenuItem?: CustomRenderMenuItem;
  state?: 'draft' | 'error' | 'success';
};

function ComboBox({
  options,
  pathToLabel,
  value = null,
  onChange,
  label,
  className,
  onBlur,
  placeholder,
  customRenderMenuItem,
  state = 'draft',
}: ComboBoxProps, ref: React.ForwardedRef<HTMLInputElement>
) {
  const [items, setItems] = React.useState(options);

  const itemToString = (item: any) => (pathToLabel ? _.get(item, pathToLabel) || '' : item) as string;

  function getOptionsFilter (inputValue = '') {
    return function filter (option: any) {
      return (
        !inputValue || itemToString(option).toLowerCase().includes(inputValue.toLowerCase())
      );
    };
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(options.filter(getOptionsFilter(inputValue)));
    },
    items,
    itemToString,
    selectedItem: value,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      onChange(newSelectedItem);
    },
  });

  return (
    <div className={classNames(styles.wrapper, className)} onBlur={onBlur}>
      <label className={classNames('t5', styles['select-label'])} {...getLabelProps()}>
        <div className={styles['select-label']}>
          {label}
        </div>
      </label>
      <div className={classNames(styles.select, styles[state])}>
        <input
          placeholder={placeholder}
          className="t5"
          ref={ref}
          {...getInputProps()}
        />
        {!value && (
          <div
            role="button"
            className={classNames(styles.toggleBtn, isOpen ? styles.active : '')}
            {...getToggleButtonProps()}
          >
            <DropdownIcon />
          </div>
        )}
        {!!value && (<div role="button" onClick={() => { onChange(null); }}><MinusIcon /></div>)}
      </div>
      {/* {isOpen && ( */}
      <div className={styles.dropdownMenuWrapper}>
        <ul
          {...getMenuProps()}
          className={styles.dropdownMenu}
        >
          {isOpen && items.map((item, index) => (
            <li
              className={classNames(styles.menuItem, 't5', index === highlightedIndex ? styles.active : '')}
              key={`${index}`}
              {...getItemProps({ item, index })}
            >
              {customRenderMenuItem?.(item) || itemToString(item)}
            </li>
          ))}
        </ul>
      </div>
      {/* )} */}
    </div>
  );
}

export default React.forwardRef(ComboBox);