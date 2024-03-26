import { Dialog } from './components/Dialog/Dialog';
import defaultAvatar from '../../../assets/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png';
import styles from './styles.module.css';
import { useReadContract, useWalletClient } from 'wagmi';
import { config } from '../../../config';
import { abi } from '../../constants/abi';

export const DialogList = () => {
  const { data: walletClient } = useWalletClient();

  const contacts = useReadContract({
    config,
    abi: abi,
    address: '0xf37577167A93a177f26409EAA2DeFe696D2b5B59',
    functionName: 'getContacts',
    account: walletClient?.account,
    args: [walletClient?.account.address],
    chainId: 3636,
  });

  return (
    <div className={styles.list}>
      <div className={styles['search-block']}>
        <input placeholder='Search' className={styles.input}></input>
      </div>
      {(contacts.data as [])?.map((el) => {
        return (
          <Dialog
            key={el}
            contactName={el}
            shortMessage='message message message'
          />
        );
      }) || <div className={styles.preloader}>Loading</div>}
    </div>
  );
};
