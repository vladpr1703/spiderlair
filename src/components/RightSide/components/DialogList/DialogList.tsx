import { Dialog } from './components/Dialog/Dialog';
import { useWalletClient } from 'wagmi';
import { Props } from '../../types';
import styles from './styles.module.css';
import { ColorRing } from 'react-loader-spinner';

export const DialogList = ({
  contacts,
  setCurrentDialog,
  currentDialog,
}: Props) => {
  return (
    <div className={styles.list}>
      <div className={styles['search-block']}>
        <input placeholder='Search' className={styles.input}></input>
      </div>
      {contacts?.map((el) => {
        return (
          <Dialog
            handleSetDialog={() => setCurrentDialog(el.friend_address)}
            key={el.friend_address}
            isActive={currentDialog === el.friend_address}
            contactName={el.friend_address || el.friend_nickname || ''}
          />
        );
      })}
    </div>
  );
};
