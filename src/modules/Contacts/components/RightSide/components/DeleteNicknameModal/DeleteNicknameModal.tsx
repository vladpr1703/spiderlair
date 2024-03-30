import { useContext } from 'react';
import { Modal } from '../../../../../../components/Modal';
import styles from './styles.module.scss';
import { ContactsConext } from '../../../../Contacts';
import { deleteNickname, fetchContacts } from '../../../../../../../api';

export const DeleteNicknameModal = ({
  onClose,
  friendAddress,
}: {
  onClose: VoidFunction;
  friendAddress: string;
}) => {
  const { walletAddress, setContacts } = useContext(ContactsConext);

  const handleDeleteNickname = async () => {
    await deleteNickname({
      userAddress: walletAddress,
      friendAddress,
    });
    const res = await fetchContacts({ address: walletAddress });
    setContacts(res);
    onClose();
  };

  return (
    <Modal width={400} height={130} onClose={onClose}>
      <div className={styles.content}>
        <span>Are you sure?</span>
        <div className={styles.buttons}>
          <button className={styles.yes} onClick={handleDeleteNickname}>
            Yes
          </button>
          <button onClick={onClose} className={styles.no}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};
