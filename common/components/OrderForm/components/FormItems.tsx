import { PropsWithChildren } from 'react';
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
};

const DEFAULT_ICON = '/images/order-form/FormItem.svg';

export function FormItem ({ title, children, iconSrc = DEFAULT_ICON } : PropsWithChildren<FormItemProps>) {
  return (
    <div className={classNames(styles.card)}>
      <div className={styles.header}>
        <Image src={iconSrc} alt={title} height={20.15} width={23} />
        <div>{title}</div>
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
