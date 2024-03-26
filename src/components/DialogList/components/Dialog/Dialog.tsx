import Image from 'next/image';
import styles from './styles.module.css';
import { DialogProps } from './types';
import { MetaMaskAvatar } from 'react-metamask-avatar';
import { prepareAddress } from '../../../../utils/prepareAddress';

export const Dialog = ({ contactName, shortMessage }: DialogProps) => {
  console.log(contactName);
  return (
    <div className={styles.dialog}>
      {contactName && <MetaMaskAvatar size={58} address={contactName} />}
      <div>
        <div className={styles['contact-name']}>
          {prepareAddress(contactName)}
        </div>
        <div className={styles['short-message']}>{shortMessage}</div>
      </div>
    </div>
  );
};
