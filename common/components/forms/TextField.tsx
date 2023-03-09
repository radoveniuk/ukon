import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, PropsWithChildren, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
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
  error?: string | boolean;
  success?: boolean;
  prefix?: string;
};

function TextField ({ labelClassName, className, label, error, success, prefix, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) {
  const [type, setType] = useState(props.type);
  return (
    <label className={classNames(labelClassName, styles.label)} >
      <span className="t5">{label}</span>
      <div className={classNames(className, styles.input, 't5', error ? styles['input-error'] : '', success ? styles['input-success'] : '')}>
        {!!prefix && <>{prefix}&nbsp;</>}
        <input
          {...props}
          ref={ref}
          type={type}
        />
        {props.type === 'password' && (
          <div
            role="button"
            onClick={() => {
              setType((prev) => prev === 'password' ? 'text' : 'password');
            }}
          >
            {type === 'password' ? <AiOutlineEyeInvisible size={20} color="#717171" /> : <AiOutlineEye color="#44998A" size={20} />}
          </div>
        )}
      </div>
      {!!error && typeof error === 'string' && <span className={styles.error}>{error}</span>}
    </label>
  );
}

export default forwardRef(TextField);

type FormatedProps = PatternFormatProps & {
  labelClassName?: string;
  label?: string;
  error?: string | boolean;
  success?: boolean;
};

export const TextFieldFormated = forwardRef(({ labelClassName, className, label, error, success, ...rest }: FormatedProps, ref) => {
  return (
    <label className={classNames(labelClassName, styles.label)} >
      <span className="t5">{label}</span>
      <PatternFormat
        className={classNames(className, styles.input, 't5', error ? styles['input-error'] : '', success ? styles['input-success'] : '')}
        getInputRef={ref}
        {...rest}
      />
      {!!error && typeof error === 'string' && <span className={styles.error}>{error}</span>}
    </label>
  );
});

TextFieldFormated.displayName = 'TextFieldFormated';

