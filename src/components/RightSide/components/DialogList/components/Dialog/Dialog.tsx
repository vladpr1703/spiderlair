import { DialogProps } from './types';
import { MetaMaskAvatar } from 'react-metamask-avatar';
import { prepareAddress } from '../../../../../../utils/prepareAddress';
import { joinClasses } from '../../../../../../utils/joinClasses';
import styles from './styles.module.scss';

export const Dialog = ({
  contactName,
  shortMessage,
  handleSetDialog,
  isActive,
}: DialogProps) => {
  return (
    <div
      className={joinClasses(styles.dialog, [styles['active'], isActive])}
      onClick={handleSetDialog}
    >
      {contactName && <MetaMaskAvatar size={58} address={contactName} />}
      <div>
        <div className={styles['contact-name']}>
          {prepareAddress(contactName)}
        </div>
        {shortMessage && (
          <div className={styles['short-message']}>{shortMessage}</div>
        )}
      </div>
    </div>
  );
};
