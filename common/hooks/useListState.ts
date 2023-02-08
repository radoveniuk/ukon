import { Dispatch, SetStateAction, useState } from 'react';
import { isEqual } from 'lodash-es';

type Dispatcher<T> = (v: T) => void;

const useListState = <T>(initialValue?: T[]): [T[], Dispatcher<T>, Dispatcher<T>, Dispatch<SetStateAction<T[]>>] => {
  const [value, setValue] = useState<T[]>(initialValue || []);

  const addItem = (v: T) => {
    setValue((prev) => [...prev, v]);
  };

  const removeItem = (v: T) => {
    setValue((prev) => prev?.filter((item) => !isEqual(item, v)));
  };

  return [value, addItem, removeItem, setValue];
};

export default useListState;
