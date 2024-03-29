import Head from 'next/head';
import { useAccount, useAccountEffect, useWalletClient } from 'wagmi';
import { config } from '../../../config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ConnectButton } from '../../components/ConnectButton/ConnectButton';
import styles from './styles.module.css';
import { Menu } from '../../components/Menu/Menu';
import { RightSide } from '../../components/RightSide/RightSide';
import { fetchContacts } from '../../../api';

export const Direct = () => {
  const account = useAccount({ config });
  const router = useRouter();
  const { data: wallet } = useWalletClient();
  const [contacts, setContacts] = useState([]);

  useAccountEffect({
    onDisconnect: () => router.push('/'),
  });

  useEffect(() => {
    if (wallet?.account.address) {
      const getContacts = async () => {
        try {
          const res = await fetchContacts({ address: wallet?.account.address });
          setContacts(res);
        } catch (e) {
          console.log(e);
        }
      };
      getContacts();
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
