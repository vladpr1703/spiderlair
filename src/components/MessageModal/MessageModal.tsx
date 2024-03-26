import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ReactElement, useRef, useState } from 'react';
import Image from 'next/image';
import imgSrc from '../../../assets/Vector.png';
import styles from './styles.module.scss';
import { config } from '../../../config';
import {
  useChainId,
  useSwitchChain,
  useWalletClient,
  useWriteContract,
} from 'wagmi';
import { abi } from '../../constants/abi';
import { toBytes32 } from '../../utils/asciiToHex';
import successImg from '../../../assets/success.png';

export const MessageModal = ({ onClose }: { onClose: VoidFunction }) => {
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const rootRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isSuccess, setSuccess] = useState(false);

  const { writeContractAsync } = useWriteContract({ config });

  const { switchChain } = useSwitchChain();

  const handleClick = async () => {
    if (chainId !== 3636) {
      switchChain({ chainId: 3636 });
      return;
    }

    if (addressRef.current?.value && messageRef.current?.value) {
      try {
        const result = await writeContractAsync({
          abi,
          address: '0xf37577167A93a177f26409EAA2DeFe696D2b5B59',
          functionName: 'sendMessage',
          account: walletClient?.account,
          args: [
            walletClient?.account.address,
            addressRef.current.value,
            toBytes32(messageRef.current.value),
          ],
          chainId: 3636,
        });
        setSuccess(true);
      } catch (e) {
        console.log(e);
      }
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
            width: 646,
            height: 418,
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
          {isSuccess ? (
            <div className={styles.success}>
              <Typography color='white' fontSize={20}>
                Message successfully sent
              </Typography>
              <Image
                width={200}
                height={200}
                alt='success'
                src={successImg}
              ></Image>
            </div>
          ) : (
            <>
              <div className={styles.header}>New message</div>
              <div className={styles['address-block']}>
                <input
                  ref={addressRef}
                  className={styles['input-address']}
                  placeholder='Please enter your address'
                />
              </div>
              <div className={styles.message}>
                <textarea
                  ref={messageRef}
                  placeholder='Please enter your message'
                />
              </div>
              <div className={styles['button-wrapper']}>
                <button
                  className={styles['send-message']}
                  onClick={handleClick}
                >
                  Send message
                </button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
