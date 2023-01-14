import classNames from 'classnames';
import { HTMLAttributes, PropsWithChildren, useState } from 'react';

import styles from 'styles/components/SeoText.module.scss';

type SeoTextTitleProps = {
  subtitle?: string;
};

export const SeoTextTitle = ({ children, subtitle }: PropsWithChildren<SeoTextTitleProps>) => (
  <div className="top">
    <div className="top__left">
      <div className="sub t3">
        {subtitle}
      </div>
      <h2 className="h2 title">
        {children}
      </h2>
    </div>
  </div>
);

export const SeoTextBody = ({ children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div className={classNames(styles['text-p'], 'body')} {...rest}>
    {children}
  </div>
);

export default function SeoText ({ children }: PropsWithChildren) {
  const [active, setActive] = useState(false);
  return (
    <section className={classNames(styles.text, active ? styles.active : '')}>
      <div className="container">
        {children}
        <div className="btn-more" onClick={() => void setActive((prev) => !prev)}>
          <svg className="btn-more-prev" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 16L7.5 12H21.5M21.5 12L18 9M21.5 12L18 15" stroke="#44998A" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <span className="btn-text">
            {active ? 'Свернуть' : 'Развернуть'}
          </span>
          <svg className="btn-more-next" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L15.5 9M19 12L15.5 15" stroke="#44998A" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
};
