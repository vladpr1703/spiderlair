import Image from 'next/image';
import styles from './styles.module.css';
import { DialogProps } from './types';

export const Dialog = ({ avatar, contactName, shortMessage }: DialogProps) => {
  return (
    <div className={styles.dialog}>
      <Image
        className={styles.avatar}
        width={65}
        height={65}
        src={avatar}
        alt='avatar'
      />
      <div>
        <div className={styles['contact-name']}>{contactName}</div>
        <div className={styles['short-message']}>{shortMessage}</div>
      </div>
    </div>
  );
};
