import { ConnectButton as DefaultConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useAccount } from 'wagmi';
import { config } from '../../../config';
import { getRandomColor } from '../../utils/getRandomColor';

export const ConnectButton = () => {
  const router = useRouter();
  const { isConnected } = useAccount({ config });

  return (
    <DefaultConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!isConnected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type='button'
                    className={styles.connect}
                  >
                    Connect
                  </button>
                );
              }

              if (chain?.unsupported) {
                return (
                  <button onClick={openChainModal} type='button'>
                    Wrong network
                  </button>
                );
              }

              const avatar = account?.ensAvatar
                ? { backgroundImage: account.ensAvatar }
                : { backgroundColor: getRandomColor() };

              return (
                <div
                  style={{ display: 'flex', gap: 12 }}
                  onClick={openAccountModal}
                  className={styles['connected-button']}
                >
                  <div className={styles.avatar} style={avatar} />
                  {account?.displayName}
                </div>
              );
            })()}
          </div>
        );
      }}
    </DefaultConnectButton.Custom>
  );
};
