import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, PropsWithChildren } from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format';
import classNames from 'classnames';

import styles from 'styles/components/forms/TextField.module.scss';

type LabelProps = {
  className?: string;
  label?: string;
  error?: string;
};

export function TextFieldLabel ({ className, label, error, children }: PropsWithChildren<LabelProps>) {
  return (
    <label className={classNames(className, styles.label)} >
      <span className="t5">{label}</span>
      {children}
      {!!error && <span className={styles.error}>{error}</span>}
    </label>
  );  
}

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

type FormatedProps = PatternFormatProps & {
  labelClassName?: string;
  label?: string;
  error?: string;
};

export const TextFieldFormated = forwardRef(({ labelClassName, className, label, error, ...rest }: FormatedProps, ref) => {
  return (
    <label className={classNames(labelClassName, styles.label)} >
      <span className="t5">{label}</span>
      <PatternFormat
        className={classNames(className, styles.input, 't5')}
        getInputRef={ref}
        {...rest}
      />
      {!!error && <span className={styles.error}>{error}</span>}
    </label>
  );  
});

TextFieldFormated.displayName = 'TextFieldFormated';

