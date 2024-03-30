import { MetaMaskAvatar } from 'react-metamask-avatar';
import contactEdit from '../../../../../../assets/contactEdit.svg';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { NickNameModal } from '../NickNameModal/NickNameModal';
import { DEFAULT_NICKNAME } from '../../../../../constants/common';

export const Contact = ({
  address,
  nickName,
}: {
  address: string;
  nickName?: string;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleChangeNick = () => {
    setModalOpen(true);
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
      </div>
      {isModalOpen && (
        <NickNameModal
          nickName={nickName || DEFAULT_NICKNAME}
          onClose={() => setModalOpen(false)}
          friendAddress={address}
        />
      )}
    </div>
  );
};
