import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from 'styles/components/Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'outlined' | 'contained';
}

export default function Button ({ variant, children, className, ...rest }: Props) {
  return (
    <button className={classNames(styles.btn, className, variant === 'text' ? styles['btn-text'] : '', variant === 'outlined' ? styles['btn-transparent'] : '')} {...rest}>{children}</button>
  );
}