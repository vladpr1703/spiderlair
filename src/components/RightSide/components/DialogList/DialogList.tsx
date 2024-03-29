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
      }) || (
        <div className={styles.preloader}>
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='color-ring-loading'
            wrapperStyle={{}}
            wrapperClass='color-ring-wrapper'
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
    </div>
  );
};
