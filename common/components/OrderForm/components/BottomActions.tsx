import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from 'styles/components/OrderForm/BottomActions.module.scss';

const BottomActions = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.bottomActions}>{children}</div>
  );
};

export default BottomActions;

type BottomActionProps = {
  variant?: 'outlined' | 'contained';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BottomAction = ({ children, variant = 'contained', ...rest }: PropsWithChildren<BottomActionProps>) => {
  return (
    <button role="button" className={classNames(styles.bottomAction, styles[variant])} {...rest}>{children}</button>
  );
};

export const BottomActionText = ({ children }: PropsWithChildren) => {
  return (
    <span className={styles.bottomActionText}>{children}</span>
  );
};