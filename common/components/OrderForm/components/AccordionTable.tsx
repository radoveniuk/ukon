import { HTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import classNames from 'classnames';

import DropdownIcon from 'common/components/icons/DropdownIcon';

import styles from 'styles/OrderForm.module.scss';

type Props = {
  title: string;
  gridTemplateColumns: string;
  defaultOpen?: boolean;
  className?: string;
  expanding?: boolean;
};

export default function AccordionTable ({ title, children, defaultOpen, gridTemplateColumns, className, expanding = true } : PropsWithChildren<Props>) {
  const [open, setOpen] = useState(defaultOpen);
  const [opened, setOpened] = useState(open);

  useEffect(() => {
    if (open) {
      setOpened(true);
    }
  }, [open]);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className={classNames(styles.reg__table, open ? styles.open : '', opened ? styles.opened : '', className)}>
      <div
        className={classNames(styles['reg__table-top'], expanding ? styles.expanding : '') }
        onClick={() => {
          if (expanding) {
            setOpen(prev => !prev);
          }
        }}
      >
        <div className={classNames(styles['reg__table-top-title'], 't1')}>
          {title}
        </div>
        {expanding && <div className={styles['reg__table-top-toggle']}><DropdownIcon /></div>}
      </div>
      <div className={styles['reg__table-rows']} style={{ gridTemplateColumns }}>
        {children}
      </div>
    </div>
  );
};

export const AccordionTableRow = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles['reg__table-row']}>
      {children}
    </div>
  );
};

export const AccordionTableCell = ({ className, children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={classNames(styles['reg__table-row-item'], className)} {...rest}>
      {children}
    </div>
  );
};