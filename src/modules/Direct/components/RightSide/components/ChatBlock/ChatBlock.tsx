import Image from 'next/image';
import sendButton from '../../../../../../../assets/send-button.png';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
  useChainId,
  useSwitchChain,
  useWalletClient,
  useWriteContract,
} from 'wagmi';
import { Messages } from './types';
import { keccak256, toHex } from 'viem';
import { abi } from '../../../../../../constants/abi';
import { CONTRACT_ADDRESS } from '../../../../../../constants/common';
import { fetchMessages, sendMessage } from '../../../../../../../api';
import { ColorRing } from 'react-loader-spinner';

export const ChatBlock = ({ address }: { address: string }) => {
  const { data: wallet } = useWalletClient();
  const [messages, setMessages] = useState<Messages>([]);
  const chainId = useChainId();
  const [txHash, setTxHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync } = useWriteContract();
  const { switchChain } = useSwitchChain();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessages = async (noLoading?: boolean) => {
    if (wallet?.account.address && address) {
      try {
        !noLoading && setIsLoading(true);
        const res = await fetchMessages({
          senderAddress: wallet?.account.address,
          recieverAddress: address,
        });
        setMessages(res);
      } catch (e) {
        console.log(e);
      } finally {
        !noLoading && setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getMessages();
  }, [address, wallet?.account.address]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (wallet?.account.address && address) {
      interval = setInterval(() => getMessages(true), 30000);
    }
    return () => clearInterval(interval);
  }, [wallet?.account.address, address]);

  const handleClick = async () => {
    if (chainId !== 3636) {
      switchChain({ chainId: 3636 });
      return;
    }
    if (inputRef.current?.value) {
      try {
        const result = await writeContractAsync({
          abi,
          address: CONTRACT_ADDRESS,
          functionName: 'sendMessage',
          account: wallet?.account,
          args: [
            wallet?.account.address,
            address,
            keccak256(toHex(inputRef.current.value)),
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
    if (inputRef.current?.value && txHash) {
      setIsLoading(true);
      sendMessage({
        message: inputRef.current.value,
        txHash,
        onFinish: () => {
          getMessages();
          setIsLoading(false);
        },
      });
    }
  }, [txHash, inputRef.current?.value]);

  return (
    <div className={styles.chat}>
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
      ) : address ? (
        <>
          <div className={styles.messages} ref={chatContainerRef}>
            {messages?.map((el) => {
              if (el.message) {
                if (el.sender_address === wallet?.account.address) {
                  return (
                    <div
                      key={Math.random() * Math.random()}
                      className={styles.outcome}
                    >
                      {el.message}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={Math.random() * Math.random()}
                      className={styles.income}
                    >
                      {el.message}
                    </div>
                  );
                }
              }
            })}
          </div>
          <div className={styles.message}>
            <input
              placeholder='Type a message...'
              className={styles['input-message']}
              ref={inputRef}
            />
            <div className={styles['send-message']} onClick={handleClick}>
              <Image alt='send' src={sendButton} />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
