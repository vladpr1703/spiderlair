import { ConnectButton as DefaultConnectButton } from '@rainbow-me/rainbowkit';
import styles from './styles.module.css';
import { useAccount } from 'wagmi';
import { config } from '../../../config';
import { useEffect, useState } from 'react';
import { MetaMaskAvatar } from 'react-metamask-avatar';

export const ConnectButton = () => {
  const { isConnected } = useAccount({ config });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
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
                  <div onClick={openConnectModal} className={styles.connect}>
                    Connect
                  </div>
                );
              }

              return (
                <div
                  style={{ display: 'flex', gap: 12 }}
                  onClick={openAccountModal}
                  className={styles['connected-button']}
                >
                  {account?.address && (
                    <MetaMaskAvatar size={24} address={account?.address} />
                  )}
                  {account?.displayName}
                </div>
              );
            })()}
          </div>
        );
      }}
    </DefaultConnectButton.Custom>
  ) : (
    <div>Loading</div>
  );
};
