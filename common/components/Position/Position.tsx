import { ReactNode } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import styles from 'styles/components/Position.module.scss';

type Props = {
  children: ReactNode;
};

export default function Position ({ children }: Props) {
  return (
    <section className={styles.position}>
      <div className={classNames(styles.container, 'container')}>
        {children}
      </div>
    </section>
  );
}

type PositionItemProps = {
  href: string;
  children: ReactNode;
};

export function PositionItem ({ href, children }: PositionItemProps) {
  return (
    <div className={styles.position__link}>
      <Link href={href} className="t5">{children}</Link>
      <span className="t5">|</span>
    </div>
  );
}