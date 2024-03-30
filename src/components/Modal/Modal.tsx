import MUIModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import Image from 'next/image';
import imgSrc from '../../../assets/Vector.png';
import styles from './styles.module.scss';
import { ModalProps } from './types';

export const Modal = ({ onClose, width, height, children }: ModalProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

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
      <MUIModal
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
            width,
            height,
            borderRadius: '10px',
            bgcolor: '#1D1D1D',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
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
          {children}
        </Box>
      </MUIModal>
    </>
  );
};
