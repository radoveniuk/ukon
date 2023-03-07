import { PropsWithChildren } from 'react';

import ConsentCookies from '../ConsentCookies';
import Header from '../Header';
import OrderModal from '../OrderModal';

export default function Layout ({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <ConsentCookies />
      <OrderModal />
    </>
  );
}