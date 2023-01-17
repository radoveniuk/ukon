import ConsentCookies from '../ConsentCookies';
import Header from '../Header';
import OrderModal from '../OrderModal';

type Props = {
  children: React.ReactNode;
}

export default function Layout ({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <ConsentCookies />
      <OrderModal />
    </>
  );
}