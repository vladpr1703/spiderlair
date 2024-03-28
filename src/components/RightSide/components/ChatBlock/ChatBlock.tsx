import Image from 'next/image';
import sendButton from '../../../../../assets/send-button.png';
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
import { abi } from '../../../../constants/abi';
import { CONTRACT_ADDRESS } from '../../../../constants/common';

export const ChatBlock = ({ address }: { address: string }) => {
  const { data: wallet } = useWalletClient();
  const [messages, setMessages] = useState<Messages>([]);
  const chainId = useChainId();
  const [txHash, setTxHash] = useState('');

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

  const fetchMessages = async () => {
    const response = await fetch(
      `${process.env.API_URL}/get_messages_endpoint/${wallet?.account.address}/${address}`
    );
    const result: Messages = await response.json();
    setMessages(result);
  };

  useEffect(() => {
    if (wallet?.account.address && address) {
      fetchMessages();
    }
  }, [address, wallet?.account.address]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (wallet?.account.address && address) {
      interval = setInterval(() => fetchMessages(), 30000);
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
    if (inputRef.current !== null && txHash) {
      const sendMessage = async () => {
        await fetch(
          `${process.env.API_URL}/send_message_special_endpoint_test`,
          {
            method: 'POST',
            body: JSON.stringify({
              transaction_hash: txHash,
              message_hash: keccak256(toHex(inputRef.current?.value || '')),
              message: inputRef.current?.value,
            }),
          }
        );
      };
      sendMessage();
    }
  }, [txHash]);

  return (
    <div className={styles.chat}>
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
    </div>
  );
};
