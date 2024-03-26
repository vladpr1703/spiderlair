import Head from 'next/head';
import { useAccount, useAccountEffect, useBalance } from 'wagmi';
import { config } from '../../../config';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ConnectButton } from '../../components/ConnectButton/ConnectButton';
import styles from './styles.module.css';
import { Menu } from '../../components/Menu/Menu';
import { DialogList } from '../../components/DialogList/DialogList';

export const MainPage = () => {
  const account = useAccount({ config });
  const router = useRouter();

  useAccountEffect({
    onDisconnect: () => router.push('/'),
  });

  return (
    <div className={styles.main}>
      <Menu />
      <div className={styles['right-side']}>
        <div className={styles.wrapper}>
          <ConnectButton />
        </div>
        <div className={styles.chat}>
          <DialogList />
        </div>
      </div>
    </div>
  );
};
