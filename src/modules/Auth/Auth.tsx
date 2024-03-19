import Head from 'next/head';
import { useAccount, useBalance, useWalletClient } from 'wagmi';

import styles from './styles.module.css';
import { config } from '../../../config';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccountEffect } from 'wagmi';
import { ConnectButton } from '../../components/ConnectButton/ConnectButton';

export const Auth = () => {
  const router = useRouter();

  useAccountEffect({
    onConnect: () => router.push('/main'),
    onDisconnect: () => router.push('/'),
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectButton />
      </main>
    </div>
  );
};
