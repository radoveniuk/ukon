import classNames from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

import styles from 'styles/components/HowInfo.module.scss';

export const HowInfoHeader = ({ children }: PropsWithChildren) => (
  <div className="top">
    <div className="top__left">
      <div className="sub t3">Как это работает</div>
      {children}
    </div>
    <div className="btn btn-text open-pop-1 fade-in">
      Оформить заявку
    </div>
  </div>
);

export const HowInfoTitle = ({ children }: PropsWithChildren) => (
  <h2 className="h2 title">
    {children}
  </h2>
);

export const HowInfoDescription = ({ children }: PropsWithChildren) => (
  <p className={classNames('t2', styles.how__description)}>
    {children}
  </p>
);

export const HowInfoItems = ({ children }: PropsWithChildren) => (
  <div className={styles.how__items}>
    {children}
  </div>
);

type HowInfoItemProps = {
  title: string;
  minutes?: string;
  description: string;
  imageSvg?: ReactNode;
}

export const HowInfoItem = ({ title, minutes, description }: HowInfoItemProps) => (
  <div className={styles.how__item}>
    <div className={styles['how-figure']}></div>
    <p className={classNames(styles['how__item-title'], 'h4')}>
      {title} <br />
      {!!minutes && <span>{minutes}</span>}
    </p>
    <p className={classNames(styles['how__item-p'], 'body')}>
      {description}
    </p>
    <div className={styles['how-circle']}></div>
  </div>
);

export default function HowInfo ({ children }: PropsWithChildren) {
  return (
    <section className={classNames(styles.how, 'mb')}>
      <div className="container">
        {children}
        <div className="btn bot-btn btn-text open-pop-1 fade-in">Оформить заявку</div>
      </div>
    </section>
  );
}