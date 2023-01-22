import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from 'styles/components/forms/TextField.module.scss';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  labelClassName?: string;
  label?: string;
  error?: string;
};

function TextField ({ labelClassName, className, label, error, ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <label className={classNames(labelClassName, styles.label)} >
      <span className="t5">{label}</span>
      <input ref={ref} type="text" className={classNames(className, styles.input, 't5')} {...rest} />
      {!!error && <span className={styles.error}>{error}</span>}
    </label>
  );  
}

export default forwardRef(TextField);


