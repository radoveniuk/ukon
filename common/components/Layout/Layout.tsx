import ConsentCookies from '../ConsentCookies';
import Footer from '../Footer';
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
      <Footer />
      <ConsentCookies />
      <OrderModal />
    </>
  );
}