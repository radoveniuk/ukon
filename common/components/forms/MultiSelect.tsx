import * as React from 'react';
import classNames from 'classnames';
import { useCombobox, UseComboboxStateChange, useMultipleSelection } from 'downshift';
import _ from 'lodash-es';

import styles from 'styles/components/forms/MultiSelect.module.scss';

import InfoIcon from '../icons/InfoIcon';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import SearchIcon from '../icons/SearchIcon';
import Tooltip from '../Tooltip';
// import Tooltip from '../Tooltip';

type CustomRenderMenuItem = (item: unknown) => React.ReactNode;

type Props = {
  options: unknown[];
  selectedOptions?: unknown[];
  handleSelectedItemChange?: (changes: UseComboboxStateChange<unknown>) => void;
  handleChange?: (items: unknown[]) => void;
  pathToLabel?: string;
  itemToStrimg?: (item: unknown) => string;
  customRenderMenuItem?: CustomRenderMenuItem;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  placeholder?: string;
  tooltip?: string;
  isLoading?: boolean;
  disabled?: boolean;
  maxItems?: number;
};

function MultiSelect({
  placeholder, label,  pathToLabel, options, handleSelectedItemChange, customRenderMenuItem, className, maxItems, handleChange, tooltip, selectedOptions = [],
}: Props) {
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState<unknown[]>(selectedOptions);

  React.useEffect(() => {
    if (selectedOptions.length) {
      setSelectedItems(selectedOptions);
    }
  }, [selectedOptions]);

  const [items, setItems] = React.useState(options);

  const tooltipId = React.useId();

  const getLabel = (item: unknown) => (pathToLabel ? _.get(item, pathToLabel) : item) as string;

  const getFilteredItems = (prevItems: unknown[], selectedItems: unknown[]) => {
    const filteredItems = (
      prevItems.filter(item => selectedItems.every((selectedItem) => !_.isEqual(selectedItem, item)))
    );
    return filteredItems;
  };

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems = [], type }) {
      switch (type) {
      case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
      case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
      case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
      case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
        setSelectedItems(newSelectedItems);
        handleChange?.(newSelectedItems);
        setItems(getFilteredItems(options, newSelectedItems));
        break;
      default:
        break;
      }
    },
  });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    openMenu,
    getItemProps,
  } = useCombobox({
    items,
    inputValue,
    selectedItem: null,
    onSelectedItemChange: handleSelectedItemChange,
    onInputValueChange: ({ inputValue = '', selectedItem }) => {
      if (selectedItem) return;
      setItems(getFilteredItems(options.filter(item => (
        getLabel(item).toLowerCase().includes(inputValue.toLowerCase())
      )), selectedItems));
    },
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputBlur:
        return {
          ...changes,
          ...(!!changes.selectedItem && { isOpen: true, highlightedIndex: 0 }),
        };
      default:
        return changes;
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
      case useCombobox.stateChangeTypes.ItemClick:
        if (newSelectedItem) {
          setInputValue('');
          if (maxItems && maxItems < [...selectedItems, newSelectedItem].length) {
            const [, ...availableItems] = selectedItems;
            const newSelectedItems = [...availableItems, newSelectedItem];
            setSelectedItems(newSelectedItems);
            setItems(getFilteredItems(options, newSelectedItems));
            handleChange?.(newSelectedItems);
          } else {
            const newSelectedItems = [...selectedItems, newSelectedItem];
            setSelectedItems(newSelectedItems);
            setItems(prev => getFilteredItems(prev, newSelectedItems));
            handleChange?.(newSelectedItems);
          }
        }
        break;
      case useCombobox.stateChangeTypes.InputChange:
        setInputValue(newInputValue || '');
        break;
      default:
        break;
      }
    },
  });

  return (
    <div className={classNames(styles.wrapper, className)}>
      <label
        className={classNames('t5', styles['select-label'])}
        {...getLabelProps()}
      >
        {label}
      </label>
      <div className={styles.selectWrapper} onClick={openMenu}>
        <div className={styles.selectContent}>
          <div className={styles.select}>
            <input
              {...getInputProps(getDropdownProps({
                preventKeyAction: isOpen,
                placeholder,
                className: classNames('t5'),
              }))}
            />
            <div role="button" {...getToggleButtonProps()}><SearchIcon /></div>
          </div>
          {!!tooltip &&(
            <>
              <Tooltip content={tooltip}>
                <InfoIcon id={tooltipId} />
              </Tooltip>
            </>
          )}
        </div>
        {selectedItems.map(function renderSelectedItem(
          selectedItemForRender,
          index,
        ) {
          return (
            <span
              key={`selected-item-${index}`}
              {...getSelectedItemProps({
                selectedItem: selectedItemForRender,
                index,
                className: classNames(styles.selectedItem, 't5') ,
              })}
            >
              <span className={classNames(styles.selectedItemIndex, 't5')}>{index + 1}.&nbsp;</span>
              {customRenderMenuItem?.(selectedItemForRender) || getLabel(selectedItemForRender)}
              <div
                role="button"
                className={styles.removeSelectedItem}
                onClick={e => {
                  e.stopPropagation();
                  removeSelectedItem(selectedItemForRender);
                }}
              >
                <MinusIcon />
              </div>
            </span>
          );
        })}
      </div>
      <div className={classNames(styles.dropdownMenuWrapper, isOpen ? styles.open : '')}>
        <ul {...getMenuProps({ className: styles.dropdownMenu })}>
          {items.map((item, index) => (
            <li
              key={index}
              {...getItemProps({
                item,
                index,
                className: classNames(styles.menuItem, 't5'),
              })}
            >
              {customRenderMenuItem?.(item) || getLabel(item)}
              <PlusIcon style={{ minWidth: 24 }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MultiSelect;