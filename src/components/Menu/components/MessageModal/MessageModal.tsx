import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { keccak256, toHex } from 'viem';
import Image from 'next/image';
import { config } from '../../../../../config';
import {
  useChainId,
  useSwitchChain,
  useWalletClient,
  useWriteContract,
} from 'wagmi';
import { abi } from '../../../../constants/abi';
import successImg from '../../../../../assets/success.png';
import { ColorRing } from 'react-loader-spinner';
import styles from './styles.module.scss';
import { CONTRACT_ADDRESS } from '../../../../constants/common';
import { sendMessage } from '../../../../../api';
import { Modal } from '../../../Modal';

export const MessageModal = ({ onClose }: { onClose: VoidFunction }) => {
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const addressRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isSuccess, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [isLoading, setLoading] = useState(false);

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
          address: CONTRACT_ADDRESS,
          functionName: 'sendMessage',
          account: walletClient?.account,
          args: [
            walletClient?.account.address,
            addressRef.current.value,
            keccak256(toHex(messageRef.current.value)),
          ],
          chainId: 3636,
        });
        setTxHash(result);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (messageRef.current !== null && txHash) {
      setLoading(true);
      sendMessage({
        message: messageRef.current.value,
        txHash,
        onSuccess: () => setSuccess(true),
        onFinish: () => setLoading(false),
      });
    }
  }, [txHash]);

  return (
    <Modal width={646} height={418} onClose={onClose}>
      {isLoading ? (
        <div className={styles.success}>
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
      ) : isSuccess ? (
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
            <button className={styles['send-message']} onClick={handleClick}>
              Send message
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};
