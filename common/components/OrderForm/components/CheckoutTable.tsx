import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import classNames from 'classnames';

import styles from 'styles/OrderForm.module.scss';

type Props = {
  title: string;
};

export default function CheckoutTable ({ title, children } : PropsWithChildren<Props>) {
  return (
    <div className={styles.reg__table}>
      <div className={styles['reg__table-top']}>
        <div className={classNames(styles['reg__table-top-title'], 't1')}>
          {title}
        </div>
        {/* <div onClick={prevStep} className={styles['reg__table-top-edit']}>{t('edit')}</div> */}
      </div>
      <div className={styles['reg__table-rows']}>
        {children}
      </div>
    </div>
  );
};

type CheckoutTableRowProps = {
  title: string;
  value: string | ReactNode;
  onEditClick(): void;
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