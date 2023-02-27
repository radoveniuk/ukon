import { createContext, PropsWithChildren, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from 'styles/OrderForm.module.scss';

type ContextType = string | undefined;

const FormItemsContext = createContext<ContextType>(undefined);

export default function FormItems ({ children }: PropsWithChildren) {
  const id = useId();

  return (
    <FormItemsContext.Provider value={id}>
      <div className={styles.reg__items} id={id}>
        {children}
      </div>
    </FormItemsContext.Provider>
  );
};

type FormItemProps = {
  number?: number;
  title: string;
  id?: string;
};

export function FormItem ({ number, title, children, id } : PropsWithChildren<FormItemProps>) {
  const containerId = useContext(FormItemsContext);
  const formItemId = useId();
  const [formItemNumber, setFormItemNumber] = useState(0);

  useEffect(() => {
    if (containerId) {
      const formItemsContainer = document.getElementById(containerId);
      const formItems = Array.from(formItemsContainer?.querySelectorAll('.form-item') || []);
      const currentNumber = formItems.findIndex((elem) => elem.id === (id || formItemId)) + 1;
      setFormItemNumber(currentNumber);
    }
  }, [containerId, formItemId, id, title]);

  const prepareNumber = (value: number) => value < 10 ? `0${value}` : value;

  return (
    <div className={classNames(styles.reg__item, 'form-item')} id={id || formItemId}>
      <div className={styles['reg__item-top']}>
        <div className={classNames(styles['reg__item-top-num'], 'body')}>{prepareNumber(number || formItemNumber)}</div>
        <div className={classNames(styles['reg__item-top-title'], 't2')}>{title}</div>
      </div>
      <div className={styles['reg__item-bot']}>
        {children}
      </div>
    </div>
  );
};