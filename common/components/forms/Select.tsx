import * as React from 'react';
import classNames from 'classnames';
import { useSelect } from 'downshift';
import _ from 'lodash-es';

import styles from 'styles/components/forms/Select.module.scss';

import DropdownIcon from '../icons/DropdownIcon';

type CustomRenderMenuItem = (item: any) => React.ReactNode | string;

type SelectProps = {
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

function Select({
  options,
  pathToLabel,
  value = null,
  onChange,
  label,
  className,
  onBlur,
  customRenderMenuItem,
  state = 'draft',
}: SelectProps, ref: React.ForwardedRef<HTMLDivElement>
) {
  const itemToString = (item: any) => (pathToLabel ? _.get(item, pathToLabel) || '' : item) as string;

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    itemToString,
    selectedItem: value,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      onChange(newSelectedItem);
    },
  });

  return (
    <div ref={ref} className={classNames(styles.wrapper, className)} onBlur={onBlur}>
      <label className={classNames('t5')} {...getLabelProps()}>
        <div className={styles['select-label']}>
          {label}
        </div>
      </label>
      <div className={classNames(styles.select, styles[state])} {...getToggleButtonProps()}>
        <span className={classNames('t5', styles.selectBtnSpan)}>{value ? customRenderMenuItem?.(value) || itemToString(value) : label}</span>
        <div
          role="button"
          className={classNames(styles.toggleBtn, isOpen ? styles.active : '')}
        >
          <DropdownIcon />
        </div>
      </div>
      <div className={classNames(styles.dropdownMenuWrapper, isOpen ? styles.open : '')}>
        <ul
          {...getMenuProps()}
          className={styles.dropdownMenu}
        >
          {options.map((item, index) => (
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
    </div>
  );
}

export default React.forwardRef(Select);