import { MetaMaskAvatar } from 'react-metamask-avatar';
import contactEdit from '../../../../../../../assets/contactEdit.svg';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { NickNameModal } from '../NickNameModal';
import { DEFAULT_NICKNAME } from '../../../../../../constants/common';
import { DeleteNicknameModal } from '../DeleteNicknameModal';

export const Contact = ({
  address,
  nickName,
}: {
  address: string;
  nickName?: string;
}) => {
  const [isNicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleChangeNick = () => {
    setNicknameModalOpen(true);
  };

  const handleDeleteNickname = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className={styles.contact}>
      <MetaMaskAvatar address={address} size={88} />
      <div className={styles.content}>
        <span className={styles.address}>
          {nickName || 'Nickname'}
          <div className={styles.edit} onClick={handleChangeNick}>
            <Image src={contactEdit} alt='edit' />
          </div>
        </span>
        <span className={styles.nick}>{address}</span>
        <button className={styles.delete} onClick={handleDeleteNickname}>
          Delete
        </button>
      </div>
      {isNicknameModalOpen && (
        <NickNameModal
          nickName={nickName || DEFAULT_NICKNAME}
          onClose={() => setNicknameModalOpen(false)}
          friendAddress={address}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteNicknameModal
          friendAddress={address}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};
