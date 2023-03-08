import { HTMLAttributes,PropsWithChildren } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';
import classNames from 'classnames';

import { RadioButton, RadioButtonProps } from 'common/components/forms/Radio';

import styles from 'styles/components/OrderForm/BuisnessAdressSelectCard.module.scss';

type Props = {
  title: string;
} & RadioButtonProps;

const BuisnessAdressSelectCard = ({ children, title, ...radioButtonProps }: PropsWithChildren<Props>) => {
  return (
    <div onClick={radioButtonProps.onSelect} className={classNames(styles.card, radioButtonProps.checked ? styles.active : '', 't5')}>
      <div className={classNames(styles.header, 't3')}>{title}</div>
      <div className={styles.body}>{children}</div>
      <RadioButton className={styles.footer} {...radioButtonProps} />
    </div>
  );
};

export default BuisnessAdressSelectCard;

export const CardsContainer = ({ children }: PropsWithChildren) => (
  <div className={styles.cards}>
    {children}
  </div>
);

export const Checkmarks = ({ children }: PropsWithChildren) => (
  <div className={styles.checkmarks}>
    {children}
  </div>
);

export const Checkmark = ({ children, checked }: PropsWithChildren<{checked: boolean}>) => (
  <div className={styles.checkmark}>
    {checked ? <BsCheck2 color="#10826E" /> : <VscChromeClose color="red" />}
    {children}
  </div>
);

export const OwnAddressWrapper = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className={styles.ownAddressWrapper} {...props} />
);