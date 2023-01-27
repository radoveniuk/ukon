import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from 'styles/OrderForm.module.scss';

type Props = {
  number: number;
  title: string;
  id?: string;
};

export default function FormItem ({ number, title, children, id } : PropsWithChildren<Props>) {
  return (
    <div className={styles.reg__item} id={id}>
      <div className={styles['reg__item-top']}>
        <div className={classNames(styles['reg__item-top-num'], 'body')}>{number < 10 ? `0${number}` : number}</div>
        <div className={classNames(styles['reg__item-top-title'], 't2')}>{title}</div>
      </div>
      <div className={styles['reg__item-bot']}>
        {children}
      </div>
    </div>
  );
};