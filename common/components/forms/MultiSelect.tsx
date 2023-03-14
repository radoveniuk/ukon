import * as React from 'react';
import classNames from 'classnames';
import { useCombobox, UseComboboxStateChange, useMultipleSelection } from 'downshift';
import _ from 'lodash-es';

import styles from 'styles/components/forms/MultiSelect.module.scss';

import { CloseIcon, InfoIcon, PlusIcon, SearchIcon } from '../icons';
import Tooltip from '../Tooltip';

type CustomRenderMenuItem = (item: any) => React.ReactNode;

type Props = {
  options: any[];
  selectedOptions?: any[];
  handleSelectedItemChange?: (changes: UseComboboxStateChange<any>) => void;
  handleChange?: (items: any[]) => void;
  pathToLabel?: string;
  itemToStrimg?: (item: any) => string;
  customRenderMenuItem?: CustomRenderMenuItem;
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  label?: string;
  placeholder?: string | null;
  tooltip?: string;
  isLoading?: boolean;
  disabled?: boolean;
  maxItems?: number;
  actions?: boolean;
  customRenderValueItem?(item: any, index: number, removeFn: (v: any) => void): React.ReactNode;
  endAdorment?: React.ReactNode;
};

function MultiSelect({
  placeholder = '', label,  pathToLabel, options, handleSelectedItemChange,
  customRenderMenuItem, className, maxItems, handleChange, tooltip, selectedOptions = [], actions,
  customRenderValueItem, endAdorment, contentClassName,
}: Props) {
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState<any[]>(selectedOptions);

  React.useEffect(() => {
    if (selectedOptions.length) {
      setSelectedItems(selectedOptions);
    }
  }, [selectedOptions]);

  const [items, setItems] = React.useState(options);

  const tooltipId = React.useId();

  const getLabel = (item: any) => (pathToLabel ? _.get(item, pathToLabel) : item) as string;

  const getFilteredItems = (prevItems: any[], selectedItems: any[]) => {
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
        getLabel?.(item)?.toLowerCase()?.includes(inputValue?.toLowerCase())
      )), selectedItems));
    },
    stateReducer(state, actionAndChanges: any) {
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
    <>
      <div className={classNames(styles.wrapper, className)}>
        <div className={classNames(styles.contentWrapper, contentClassName)}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <label className={classNames('t5')} {...getLabelProps()}>
              <div className={styles['select-label']}>
                {label}
              </div>
            </label>
            <div className={styles.selectWrapper} onClick={openMenu}>
              <div className={styles.selectContent}>
                <div className={styles.select}>
                  <input
                    {...getInputProps(getDropdownProps({
                      preventKeyAction: isOpen,
                      placeholder: placeholder || undefined,
                      className: classNames('t5'),
                    }))}
                  />
                  {actions && <div role="button" {...getToggleButtonProps()}><SearchIcon /></div>}
                </div>
                {!!tooltip && (
                  <>
                    <Tooltip content={tooltip}>
                      <InfoIcon id={tooltipId} />
                    </Tooltip>
                  </>
                )}
              </div>
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
          {endAdorment}
        </div>
      </div>
      {selectedItems.map(function renderSelectedItem(
        selectedItemForRender,
        index,
      ) {
        if (!!customRenderValueItem) {
          return customRenderValueItem(selectedItemForRender, index, removeSelectedItem);
        }
        return (
          <div
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
              <CloseIcon size={20} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MultiSelect;