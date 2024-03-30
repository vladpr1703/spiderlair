import { Dialog } from './components/Dialog';
import { Props } from '../../types';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';

export const DialogList = ({
  contacts,
  setCurrentDialog,
  currentDialog,
}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [filtredContacts, setFiltredContacts] = useState(contacts);

  useEffect(() => {
    setFiltredContacts(contacts);
  }, [contacts]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value) {
      const filteredArray = contacts.filter((el) => {
        if (el.friend_nickname) {
          return el.friend_nickname.toLowerCase().includes(e.target.value);
        } else {
          return el.friend_address.toLowerCase().includes(e.target.value);
        }
      });
      setFiltredContacts(filteredArray);
    } else {
      setFiltredContacts(contacts);
    }
  };

  return (
    <div className={styles.list}>
      <div className={styles['search-block']}>
        <input
          placeholder='Search'
          onChange={handleChange}
          className={styles.input}
          value={searchValue}
        />
      </div>
      {filtredContacts?.map((el, i) => {
        return (
          <Dialog
            handleSetDialog={() => setCurrentDialog(el.friend_address)}
            key={i}
            isActive={currentDialog === el.friend_address}
            contactAddress={el.friend_address}
            contactName={el.friend_nickname || el.friend_address || ''}
          />
        );
      })}
    </div>
  );
};
