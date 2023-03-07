
import { HTMLAttributes, PropsWithChildren } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import EditIcon from 'common/components/icons/EditIcon';

import styles from 'styles/components/OrderForm/Cart.module.scss';

const Cart = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
};

export default Cart;

export const CartHeader = ({ children, onClick }: HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation('forms');
  return (
    <div className={styles.header}>
      <div className={classNames(styles.top)}>
        {t('cart')}
        <div role="button" onClick={onClick}>
          <EditIcon />
        </div>
      </div>
      <div className={classNames(styles.bottom)}>{children}</div>
      <div className={styles.separator} />
    </div>
  );
};

export const CartBody = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.body}>{children}</div>
  );
};

export const PriceItem = ({ className, children, price, ...rest }: HTMLAttributes<HTMLDivElement> & { price: number }) => {
  return (
    <div className={classNames(styles.priceItem, className)} {...rest}>
      <div className={styles.name}>{children}</div>
      <div className={styles.price}>{price} €</div>
    </div>
  );
};