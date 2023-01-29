import * as React from 'react';
import classNames from 'classnames';
import { useCombobox } from 'downshift';
import _ from 'lodash-es';

import styles from 'styles/components/forms/Select.module.scss';

import DropdownIcon from '../icons/DropdownIcon';
import MinusIcon from '../icons/MinusIcon';

type CustomRenderMenuItem = (item: unknown) => React.ReactNode;

type Props = {
  options: unknown[];
  selectedOptions?: unknown[];
  handleChange?: (item: unknown) => void;
  pathToLabel?: string;
  itemToStrimg?: (item: unknown) => string;
  customRenderMenuItem?: CustomRenderMenuItem;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  maxItems?: number;
  value: unknown;
  defaultValue?: unknown;
  state?: 'draft' | 'error' | 'success';
  onBlur?(e: any): void;
};

export default function Select ({ options, className, pathToLabel, defaultValue, customRenderMenuItem, handleChange, state = 'draft', label, placeholder, style, disabled, value, onBlur }: Props) {
  const [items, setItems] = React.useState(options);

  const getLabel = (item: unknown) => (pathToLabel ? _.get(item, pathToLabel) : item) as string;

  const {
    isOpen,
    toggleMenu,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
    reset,
    highlightedIndex,
    openMenu,
    inputValue,
  } = useCombobox({
    onInputValueChange({ inputValue = '' }) {
      setItems(options.filter(item => (
        getLabel(item).toLowerCase().includes(inputValue?.toLowerCase() || '')
      )));
    },
    items,
    defaultSelectedItem: defaultValue,
    itemToString: getLabel,
    onSelectedItemChange: (updates) => {
      handleChange?.(updates.selectedItem);
    },
  });

  return (
    <div className={classNames(styles.wrapper, className)} style={style} onBlur={onBlur}>
      <label className={classNames('t5', styles['select-label'])} {...getLabelProps()}>
        {label}
      </label>
      <div className={classNames(styles.select, styles[state])} onClick={openMenu}>
        <input
          {...getInputProps({
            placeholder,
            disabled,
            value: inputValue || '',
            className: classNames('t5'),
          })}
        />
        {!value && (<div role="button" className={classNames(styles.toggleBtn, isOpen ? styles.active : '')} onClick={toggleMenu}><DropdownIcon /></div>)}
        {!!value && (<div role="button" onClick={() => { reset(); handleChange?.(null); }}><MinusIcon /></div>)}
      </div>
      <div className={styles.dropdownMenuWrapper}>
        <ul {...getMenuProps({ className: styles.dropdownMenu })}>
          {isOpen && items.map((item, index) => (
            <li
              key={index}
              {...getItemProps({
                item,
                index,
                className: classNames(styles.menuItem, 't5', index === highlightedIndex ? styles.active : ''),
              })}
            >
              {customRenderMenuItem?.(item) || getLabel(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}