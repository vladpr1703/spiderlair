import React, { useContext, useRef } from 'react';
import styles from './styles.module.scss';
import { ContactsConext } from '../../../../Contacts';
import {
  createNickname,
  fetchContacts,
  updateNickname,
} from '../../../../../../../api';
import { DEFAULT_NICKNAME } from '../../../../../../constants/common';
import { Modal } from '../../../../../../components/Modal';

export const NickNameModal = ({
  onClose,
  friendAddress,
  nickName,
}: {
  onClose: VoidFunction;
  friendAddress: string;
  nickName: string;
}) => {
  const nicknameRef = useRef<HTMLInputElement>(null);

  const { walletAddress, setContacts } = useContext(ContactsConext);

  const handleChangeNickname = async () => {
    if (nicknameRef.current?.value) {
      if (nickName === DEFAULT_NICKNAME) {
        await createNickname({
          userAddress: walletAddress,
          friendAddress,
          nickname: nicknameRef.current.value,
        });
      } else {
        await updateNickname({
          userAddress: walletAddress,
          friendAddress,
          nickname: nicknameRef.current.value,
        });
      }
      const res = await fetchContacts({ address: walletAddress });
      setContacts(res);
      onClose();
    }
  };

  return (
    <Modal width={400} height={180} onClose={onClose}>
      <>
        <div className={styles.header}>Change nickname</div>
        <div className={styles['address-block']}>
          <input
            ref={nicknameRef}
            className={styles['input-address']}
            placeholder='Please enter nickname'
          />
        </div>
        <div className={styles['button-wrapper']}>
          <button
            className={styles['send-message']}
            onClick={handleChangeNickname}
          >
            Change
          </button>
        </div>
      </>
    </Modal>
  );
};
