import { Dispatch, SetStateAction, useState } from 'react';
import { isEqual } from 'lodash-es';

type Dispatcher<T> = (v: T) => void;

const useListState = <T>(initialValue?: T[]): [T[], { add: Dispatcher<T>, remove: Dispatcher<T>, toggle: Dispatcher<T> }, Dispatch<SetStateAction<T[]>>] => {
  const [value, setValue] = useState<T[]>(initialValue || []);

  const addItem = (v: T) => {
    setValue((prev) => [...prev, v]);
  };

  const removeItem = (v: T) => {
    setValue((prev) => prev.filter((item) => !isEqual(item, v)));
  };

  const toggleItem = (v: T) => {
    setValue((prev) => !prev.some((item) => isEqual(item, v)) ? [...prev, v] : prev.filter((item) => !isEqual(item, v)));
  };

  return [value, { add: addItem, remove: removeItem, toggle: toggleItem }, setValue];
};

export default useListState;
