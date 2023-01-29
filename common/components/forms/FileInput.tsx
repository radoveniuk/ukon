import React, { ForwardedRef, forwardRef, HTMLProps, PropsWithChildren, useId } from 'react';

// import styles from 'styles/components/forms/FileInput.module.scss';

type Props = HTMLProps<HTMLInputElement> & {
  id?: string;
  className?: string;
}

const FileInput = forwardRef(({ id, children, disabled, className, ...rest }: PropsWithChildren<Props>, ref: ForwardedRef<HTMLInputElement>) => {
  const fakeId = useId();
  return (
    <>
      <label htmlFor={id || fakeId} className={className}>
        {children}
      </label>
      <input
        {...rest}
        id={id || fakeId}
        ref={ref}
        type="file"
        disabled={disabled}
        hidden
      />
    </>
  );
});

FileInput.displayName = 'FileInput';

export default FileInput;
