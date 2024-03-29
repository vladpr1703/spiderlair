import { Contacts } from '../../../../components/RightSide/types';
import { Contact } from './Contact/Contact';
import styles from './styles.module.scss';

export const RightSide = ({ contacts }: { contacts: Contacts[] }) => {
  return (
    <div className={styles['right-side']}>
      {contacts.map((el) => (
        <Contact
          key={el.friend_address}
          address={el.friend_address}
          nickName={el.friend_nickname}
        />
      ))}
    </div>
  );
};
