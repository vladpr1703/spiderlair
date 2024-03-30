import { useState } from 'react';
import { ChatBlock } from './components/ChatBlock';
import { DialogList } from './components/DialogList';
import styles from './styles.module.scss';
import { Contacts } from './types';

export const RightSide = ({ contacts }: { contacts: Contacts[] }) => {
  const [currentDialog, setCurrentDialog] = useState('');

  return (
    <div className={styles['right-side']}>
      <DialogList
        contacts={contacts}
        setCurrentDialog={setCurrentDialog}
        currentDialog={currentDialog}
      />
      <ChatBlock address={currentDialog} />
    </div>
  );
};
