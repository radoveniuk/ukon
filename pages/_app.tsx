import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import Layout from '../common/components/Layout';
import OrderModalProvider from 'common/providers/OrderModalProvider';

function App({ Component, pageProps }: AppProps) {
  return (
    <OrderModalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </OrderModalProvider>
  );
}

export default appWithTranslation(App);