import classNames from 'classnames';
import { useOrderModalOpen } from 'common/providers/OrderModalProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
import styles from 'styles/components/OrderModal.module.scss';

const ORDER_ITEMS = [
  {
    name: 'Оформление ИП',
    img: '/images/home/services/2.png',
    link: '/services/create-individual',
  },
  {
    name: 'Оформление ООО',
    img: '/images/home/services/3.png',
    link: '/services/create-company',
  },
  {
    name: 'Внесения изменений в ИП',
    img: '/images/home/services/4.png',
    link: '/services/update-individual',
  },
  {
    name: 'Внесения изменений в ООО',
    img: '/images/home/services/5.png',
    link: '/services/update-company',
  },
  {
    name: 'Виртуальный адрес',
    img: '/images/home/services/6.png',
    link: '/services/v-adress',
  },
];

export default function OrderModal () {
  const [open, setOpen] = useOrderModalOpen();
    
  const router = useRouter();
  
  useEffect(() => {
    setOpen(false);
  }, [router.asPath, setOpen]);

  const closeHandler = () => void setOpen(false);
  return (
    <div className={classNames(styles.pop, styles['pop-1'], open ? styles.active : '')}>
      <div className={styles.pop__cont}>
        <svg onClick={closeHandler} className={styles['pop-close']} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.99997 17L17 7" stroke="#131313" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6.99997 6.99997L17 17" stroke="#131313" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div className={styles.pop__items}>
          {ORDER_ITEMS.map((orderItem) => (
            <div className={styles.pop__item} key={orderItem.link}>
              <Image width={292} height={156} src={orderItem.img} alt={orderItem.name} />
              <div className={styles.pop__text}>
                <div className={classNames(styles['pop__item-title'], 'h5')}>
                  {orderItem.name}
                </div>
                <Link href={orderItem.link} className={classNames(styles.btn, 'btn', 'btn-text')}>
                  Оформить
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['pop-bg']} onClick={closeHandler}></div>
    </div>
  );
};

export const OrderModalOpener = ({ children }: PropsWithChildren) => {
  const [, setOpen] = useOrderModalOpen();
  return (
    <div onClick={() => void setOpen(true)}>{children}</div>
  );
};