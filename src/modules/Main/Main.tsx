import Head from 'next/head';
import { useAccount, useAccountEffect, useWalletClient } from 'wagmi';
import { config } from '../../../config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ConnectButton } from '../../components/ConnectButton/ConnectButton';
import styles from './styles.module.css';
import { Menu } from '../../components/Menu/Menu';
import { RightSide } from '../../components/RightSide/RightSide';

export const MainPage = () => {
  const account = useAccount({ config });
  const router = useRouter();
  const { data: wallet } = useWalletClient();
  const [contacts, setContacts] = useState([]);

  useAccountEffect({
    onDisconnect: () => router.push('/'),
  });

  useEffect(() => {
    if (wallet?.account.address) {
      const fetchContacts = async () => {
        const response = await fetch(
          `${process.env.API_URL}/get_contacts_special/${wallet?.account.address}`
        );
        const res = await response.json();
        setContacts(res);
      };

      fetchContacts();
    }
  }, [wallet?.account.address]);

  return (
    <div className={styles.main}>
      <Menu />
      <div className={styles['right-side']}>
        <div className={styles.wrapper}>
          <ConnectButton />
        </div>
        <RightSide contacts={contacts} />
      </div>
    </div>
  );
};
