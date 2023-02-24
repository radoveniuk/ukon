import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from 'styles/components/IconButton.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'primary' | 'warning' | 'error' | 'info' | 'default';
}

export default function IconButton ({ children, className, color = 'default', ...rest }: Props) {
  return (
    <button className={classNames(styles.btn, className, styles[color])} {...rest}>{children}</button>
  );
}