import { PropsWithChildren, ReactNode } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from 'styles/components/OrderForm/FormItems.module.scss';

export default function FormItems ({ children }: PropsWithChildren) {
  return (
    <div className={styles.list}>
      {children}
    </div>
  );
};

type FormItemProps = {
  title: string;
  iconSrc?: string;
  id?:string;
  disabled?: boolean;
  actions?: ReactNode;
};

const DEFAULT_ICON = '/images/order-form/FormItem.svg';

export function FormItem ({ title, children, iconSrc = DEFAULT_ICON, disabled = false, actions } : PropsWithChildren<FormItemProps>) {
  return (
    <div className={classNames(styles.card, disabled ? styles.disabled : '')}>
      <div className={styles.header}>
        <Image priority={false} src={iconSrc} alt={title} height={20.15} width={23} />
        <div>{title}</div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};

export function FormItemRow ({ children, cols = 1 } : PropsWithChildren<{ cols: number }>) {
  return (
    <div className={styles.row} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {children}
    </div>
  );
};

export function FormItemSideInfo ({ children }: PropsWithChildren) {
  return (
    <div className={styles.sideInfo}>
      {children}
    </div>
  );
}
