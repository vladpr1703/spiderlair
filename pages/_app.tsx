import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import favicon from '../assets/favicon.ico';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '../config';
import Head from 'next/head';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Head>
            <title>SpidersLair</title>
            <link
              data-react-helmet='true'
              rel='shortcut icon'
              href='icon.ico'
              type='image/x-icon'
            />
          </Head>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
