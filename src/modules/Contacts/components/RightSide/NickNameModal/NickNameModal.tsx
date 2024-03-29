import { Box, Modal } from '@mui/material';
import Image from 'next/image';
import React, { useContext, useRef, useState } from 'react';
import imgSrc from '../../../../../../assets/Vector.png';
import styles from './styles.module.scss';
import { ColorRing } from 'react-loader-spinner';
import { ContactsConext } from '../../../Contacts';
import { createNickname, fetchContacts } from '../../../../../../api';

export const NickNameModal = ({
  onClose,
  friendAddress,
}: {
  onClose: VoidFunction;
  friendAddress: string;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const { walletAddress, setContacts } = useContext(ContactsConext);

  const handleChangeNickname = async () => {
    if (nicknameRef.current?.value) {
      await createNickname({
        userAddress: walletAddress,
        friendAddress,
        nickname: nicknameRef.current.value,
      });
      const res = await fetchContacts({ address: walletAddress });
      setContacts(res);
      onClose();
    }
  };

  return (
    <>
      <Box
        sx={{
          height: '100%',
          flexGrow: 1,
          position: 'absolute',
          zIndex: 100,
          top: '50%',
          opacity: 0.3,
          left: '50%',
          backgroundColor: '#141414',
          minWidth: '100%',
          transform: 'translate(-50%, -50%)',
        }}
        ref={rootRef}
      />
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby='server-modal-title'
        aria-describedby='server-modal-description'
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        container={() => rootRef.current!}
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 160,
            borderRadius: '10px',
            bgcolor: '#1D1D1D',
            border: '2px solid #000',
            boxShadow: 24,
            p: 3,
          }}
        >
          <Image
            className={styles['close-button']}
            width={24}
            height={24}
            src={imgSrc}
            alt=''
            onClick={onClose}
          />
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
        </Box>
      </Modal>
    </>
  );
};
