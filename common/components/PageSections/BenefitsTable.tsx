import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import styles from 'styles/components/BenefitsTable.module.scss';

export const BenefitsTableHeader = ({ children }: PropsWithChildren) => (
  <div className={styles.table__titles}>
    {children}
  </div>
);

export const BenefitsTableHeaderColumn = ({ children }: PropsWithChildren) => (
  <div className={classNames(styles['table-title'], 'h5')}>
    {children}
  </div>
);

export const BenefitsTableRow = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <>
    <div className={classNames(styles.table__sub, 't1')}>
      {title}
    </div>
    <div className={styles.table__elements}>
      {children}
    </div>
  </>
);

export const BenefitsTableCell = ({ children }: PropsWithChildren) => (
  <div className={classNames(styles.table__el, 't1')}>
    {children}
  </div>
);

export default function BenefitsTable({ children }: PropsWithChildren) {
  return (
    <div className={classNames(styles.table)}>
      <div className="container">
        <div className={styles.table__table}>
          {children}
        </div>
      </div>
    </div>
  );
}