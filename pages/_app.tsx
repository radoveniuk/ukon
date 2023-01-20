import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import OrderModalProvider from 'common/providers/OrderModalProvider';

import Layout from '../common/components/Layout';

import '../styles/globals.scss';

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