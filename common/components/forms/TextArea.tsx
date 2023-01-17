import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from 'styles/components/forms/TextField.module.scss';

type Props = HTMLAttributes<HTMLTextAreaElement> & {
  labelClassName?: string;
  label?: string;
  error?: string;
};

function TextArea ({ labelClassName, className, label, error, ...rest }: Props, ref: ForwardedRef<HTMLTextAreaElement>) {
  return (
    <label className={classNames(labelClassName, styles.label)} >
      <span className="t5">{label}</span>
      <textarea ref={ref} className={classNames(className, styles.input, 't5')} {...rest} />
      {!!error && <span className={styles.error}>{error}</span>}
    </label>
  );  
}

export default forwardRef(TextArea);


