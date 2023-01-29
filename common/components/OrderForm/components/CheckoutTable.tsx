import { HTMLAttributes, PropsWithChildren, ReactNode, useState } from 'react';
import classNames from 'classnames';

import DropdownIcon from 'common/components/icons/DropdownIcon';

import styles from 'styles/OrderForm.module.scss';

type Props = {
  title: string;
};

export default function CheckoutTable ({ title, children } : PropsWithChildren<Props>) {
  const [open, setOpen] = useState(true);
  return (
    <div className={styles.reg__table}>
      <div className={styles['reg__table-top']}>
        <div className={classNames(styles['reg__table-top-title'], 't1')}>
          {title}
        </div>
        <div className={classNames(styles['reg__table-top-toggle'], open ? styles.open : '')}><DropdownIcon onClick={() => void setOpen(prev => !prev)}/></div>
      </div>
      <div className={classNames(styles['reg__table-rows'], open ? styles.open : '')}>
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