import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from 'styles/components/forms/Checkbox.module.scss';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string;
}

function Checkbox ({ label, className, ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <label className={classNames(styles.wrapper, className)}>
      <span className={styles.checkbox}>
        <input type="checkbox" {...rest} ref={ref} />
        <svg className={styles.checkboxIcon} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.75" y="3.25" width="14.5" height="14.5" rx="1.25" stroke="#A1A1A1" strokeWidth="1.5"/>
        </svg>
        <svg className={styles.checkboxIconSelected} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="16" height="16" rx="2" fill="#44998A"/>
          <path d="M7.5 10L9.5 12L13.5 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span className={classNames(styles.checkboxLabel, 't4')}>
        {label}
      </span>
    </label>
  );
}

export default forwardRef(Checkbox);