import { ColorRing } from 'react-loader-spinner';
import { Contact } from './components/Contact/';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { ContactsConext } from '../../Contacts';
import { RightSideProps } from './types';

export const RightSide = ({ contacts }: RightSideProps) => {
  const { isLoading } = useContext(ContactsConext);
  return (
    <div className={styles['right-side']}>
      {isLoading ? (
        <div className={styles.loader}>
          <ColorRing
            visible={true}
            height='120'
            width='120'
            ariaLabel='color-ring-loading'
            wrapperStyle={{}}
            wrapperClass='color-ring-wrapper'
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      ) : (
        <div className={styles.contacts}>
          {contacts?.map((el) => (
            <Contact
              key={el.friend_address}
              address={el.friend_address}
              nickName={el.friend_nickname}
            />
          ))}
        </div>
      )}
    </div>
  );
};
