import * as React from 'react';
import classNames from 'classnames';
import { useCombobox, UseComboboxStateChange } from 'downshift';
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
  defaultValue?: unknown; 
};

export default function Select ({ options, className, pathToLabel, customRenderMenuItem, handleChange, defaultValue, label, placeholder, style }: Props) {
  const [items, setItems] = React.useState(options);

  const getLabel = (item: unknown) => (pathToLabel ? _.get(item, pathToLabel) : item) as string;
  
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
    selectedItem,
    reset,
    highlightedIndex,
  } = useCombobox({
    onInputValueChange({ inputValue = '' }) {
      setItems(options.filter(item => (
        getLabel(item).toLowerCase().includes(inputValue.toLowerCase())
      )));
    },
    selectedItem: defaultValue,
    items,
    itemToString: getLabel,
    onSelectedItemChange: (updates) => void handleChange?.(updates.selectedItem),
  });

  return (
    <div className={classNames(styles.wrapper, className)} style={style}>
      <label className={classNames('t5', styles['select-label'])} {...getLabelProps()}>
        {label}
      </label>
      <div className={styles.select}>
        <input
          {...getInputProps({ 
            placeholder,
            className: classNames('t5'),
          })}
        />
        {!selectedItem && (<div role="button" {...getToggleButtonProps({ className: classNames(styles.toggleBtn, isOpen ? styles.active : '' ) })}><DropdownIcon /></div>)}
        {!!selectedItem && (<div role="button" onClick={reset}><MinusIcon /></div>)}
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