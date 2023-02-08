import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from 'styles/components/Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'warning' | 'error';
}

export default function Button ({ variant, children, className, color = 'primary', ...rest }: Props) {
  return (
    <button className={classNames(styles.btn, className, variant === 'text' ? styles['btn-text'] : '', variant === 'outlined' ? styles['btn-transparent'] : '', styles[color])} {...rest}>{children}</button>
  );
}