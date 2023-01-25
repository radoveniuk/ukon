import { ChangeEvent, createContext, PropsWithChildren, useContext } from 'react';
import classNames from 'classnames';

import styles from 'styles/components/forms/Radio.module.scss';

const RadioContext = createContext<{ name: string } | undefined>(undefined);

type RadioProps = PropsWithChildren & {
  name: string;
  className?: string;
};

const Radio = ({ children, className, name }: RadioProps) => {
  return (
    <RadioContext.Provider value={{ name }}>
      <div className={className}>
        {children}
      </div>
    </RadioContext.Provider>
  );
};

export default Radio;

type RadioButtonProps = PropsWithChildren & {
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: () => void;
  dangerouslySetInnerHTML?: { __html: string; };
};

export const RadioButton = ({ children, className, dangerouslySetInnerHTML, onChange, onSelect, ...rest }: RadioButtonProps) => {
  const context = useContext(RadioContext);
  return (
    <label className={classNames(styles.radio, className)}>
      <span className={styles['radio-input']}>
        <input 
          type="radio" 
          name={context?.name}
          onChange={(e) => {
            onChange?.(e);
            if (e.target.checked) {
              onSelect?.();
            }
          }} 
          {...rest} 
        />
        <svg className={styles['radio-input-svg']} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 1.66699C5.41672 1.66699 1.66672 5.41699 1.66672 10.0003C1.66672 14.5837 5.41672 18.3337 10.0001 18.3337C14.5834 18.3337 18.3334 14.5837 18.3334 10.0003C18.3334 5.41699 14.5834 1.66699 10.0001 1.66699ZM10.0001 16.6672C6.33344 16.6672 3.33344 13.6672 3.33344 10.0005C3.33344 6.33388 6.33344 3.33388 10.0001 3.33388C13.6668 3.33388 16.6668 6.33388 16.6668 10.0005C16.6668 13.6672 13.6668 16.6672 10.0001 16.6672Z" fill="#A1A1A1"/>
        </svg>
        <svg className={styles['radio-input-svg-selected']} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 5.83388C7.6668 5.83388 5.83347 7.66721 5.83347 10.0005C5.83347 12.3339 7.6668 14.1672 10.0001 14.1672C12.3335 14.1672 14.1668 12.3339 14.1668 10.0005C14.1668 7.66721 12.3335 5.83388 10.0001 5.83388ZM10.0001 1.66699C5.41675 1.66699 1.66675 5.41699 1.66675 10.0003C1.66675 14.5837 5.41675 18.3337 10.0001 18.3337C14.5834 18.3337 18.3334 14.5837 18.3334 10.0003C18.3334 5.41699 14.5834 1.66699 10.0001 1.66699ZM10.0001 16.6672C6.33347 16.6672 3.33347 13.6672 3.33347 10.0005C3.33347 6.33388 6.33347 3.33388 10.0001 3.33388C13.6668 3.33388 16.6668 6.33388 16.6668 10.0005C16.6668 13.6672 13.6668 16.6672 10.0001 16.6672Z" fill="#44998A"/>
        </svg>
      </span>
      <span className={classNames(styles['radio-title'], 't4')} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
        {children}
      </span>
    </label>
  );
};