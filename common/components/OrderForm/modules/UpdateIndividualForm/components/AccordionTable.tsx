import { createContext, HTMLAttributes, PropsWithChildren, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import DropdownIcon from 'common/components/icons/DropdownIcon';

import styles from 'styles/OrderForm.module.scss';

type Props = {
  title: string;
  gridTemplateColumns: string;
  defaultOpen?: boolean;
  className?: string;
};

const TableContext = createContext<string | undefined>(undefined);

export default function AccordionTable ({ title, children, defaultOpen, gridTemplateColumns, className } : PropsWithChildren<Props>) {
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
    <TableContext.Provider value={gridTemplateColumns}>
      <div className={classNames(styles.reg__table, open ? styles.open : '', opened ? styles.opened : '', className)}>
        <div className={styles['reg__table-top']} onClick={() => void setOpen(prev => !prev)}>
          <div className={classNames(styles['reg__table-top-title'], 't1')}>
            {title}
          </div>
          <div className={styles['reg__table-top-toggle']}><DropdownIcon /></div>
        </div>
        <div className={styles['reg__table-rows']}>
          {children}
        </div>
      </div>
    </TableContext.Provider>
  );
};

export const AccordionTableRow = ({ children }: PropsWithChildren) => {
  const gridTemplateColumns = useContext(TableContext);
  return (
    <div className={styles['reg__table-row']} style={{ gridTemplateColumns }}>
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