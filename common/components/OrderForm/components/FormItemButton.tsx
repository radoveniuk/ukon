import { ButtonHTMLAttributes } from 'react';

import styles from 'styles/components/OrderForm/FormItemButton.module.scss';

const FormItemButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className={styles.button} />;
};

export default FormItemButton;