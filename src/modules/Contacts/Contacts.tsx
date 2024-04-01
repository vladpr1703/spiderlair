import { useAccount, useAccountEffect, useWalletClient } from 'wagmi';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import { ConnectButton } from '../../components/ConnectButton/ConnectButton';
import styles from './styles.module.scss';
import { Menu } from '../../components/Menu/Menu';
import { RightSide } from './components/RightSide/RightSide';
import { fetchContacts } from '../../../api';
import { Contacts as ContactsType } from './components/RightSide/types';

export const ContactsConext = createContext({
  contacts: [] as ContactsType[],
  setContacts: (contacts: ContactsType[]) => {},
  walletAddress: '',
  isLoading: false,
});

export const Contacts = () => {
  const router = useRouter();
  const { data: wallet } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState<ContactsType[]>(
    [] as ContactsType[]
  );

  useAccountEffect({
    onDisconnect: () => router.push('/'),
  });

  useEffect(() => {
    if (wallet?.account.address) {
      const getContacts = async () => {
        setIsLoading(true);
        try {
          const res = await fetchContacts({ address: wallet?.account.address });
          const table: { [key: string]: number } = {};
          const result = res.filter(
            (el: ContactsType) =>
              !table[el.friend_address] && (table[el.friend_address] = 1)
          );
          setContacts(result);
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      };
      getContacts();
    }
  }, [wallet?.account.address]);

  return (
    <ContactsConext.Provider
      value={{
        contacts,
        setContacts,
        walletAddress: wallet?.account.address || '',
        isLoading,
      }}
    >
      <div className={styles.main}>
        <Menu />
        <div className={styles['right-side']}>
          <div className={styles.wrapper}>
            <ConnectButton />
          </div>
          <RightSide contacts={contacts} />
        </div>
      </div>
    </ContactsConext.Provider>
  );
};
