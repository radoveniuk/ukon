import { HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import classNames from 'classnames';

import DropdownIcon from 'common/components/icons/DropdownIcon';

import styles from 'styles/OrderForm.module.scss';

type Props = {
  title: string;
  defaultOpen?: boolean;
  colorfull?: boolean;
};

export default function CheckoutTable ({ title, children, defaultOpen, colorfull = true } : PropsWithChildren<Props>) {
  const [open, setOpen] = useState(defaultOpen);
  const [opened, setOpened] = useState(open);

  useEffect(() => {
    if (open) {
      setOpened(true);
    }
  }, [open]);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className={classNames(styles.reg__table, open ? styles.open : '', opened ? styles.opened : '', colorfull ? styles.colorfull : '')}>
      <div className={styles['reg__table-top']} onClick={() => void setOpen(prev => !prev)}>
        <div className={classNames(styles['reg__table-top-title'], 't1')}>
          {title}
        </div>
        <div className={styles['reg__table-top-toggle']}><DropdownIcon /></div>
      </div>
      <div className={styles['reg__table-rows']}>
        {children}
      </div>
    </div>
  );
};

export const CheckoutTableRow = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles['reg__table-row']}>
      {children}
    </div>
  );
};

export const CheckoutTableCell = ({ className, children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={classNames(styles['reg__table-row-item'], className)} {...rest}>
      {children}
    </div>
  );
};