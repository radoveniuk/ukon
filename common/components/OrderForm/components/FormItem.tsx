import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from 'styles/OrderForm.module.scss';

type Props = {
  number: number;
  title: string;
};

export default function FormItem ({ number, title, children } : PropsWithChildren<Props>) {
  return (
    <div className={styles.reg__item}>
      <div className={styles['reg__item-top']}>
        <div className={classNames(styles['reg__item-top-num'], 'body')}>{number}</div>
        <div className={classNames(styles['reg__item-top-title'], 't2')}>{title}</div>
      </div>
      <div className={styles['reg__item-bot']}>
        {children}
      </div>
    </div>
  ); 
};