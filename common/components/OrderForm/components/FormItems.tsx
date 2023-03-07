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
};

export function FormItem ({ title, children } : PropsWithChildren<FormItemProps>) {
  return (
    <div className={classNames(styles.card)}>
      <div className={styles.header}>
        <Image src="/images/order-form/FormItem.svg" alt={title} height={20.15} width={23} />
        <div>{title}</div>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};