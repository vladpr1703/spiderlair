import { Dialog } from './components/Dialog/Dialog';
import defaultAvatar from '../../../assets/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png';
import styles from './styles.module.css';

export const DialogList = () => (
  <div className={styles.list}>
    <div className={styles['search-block']}>
      <input placeholder='Search' className={styles.input}></input>
    </div>
    <Dialog
      contactName='Vlad'
      shortMessage='message message message'
      avatar={defaultAvatar}
    />
    <Dialog
      contactName='Vlad'
      shortMessage='message message message'
      avatar={defaultAvatar}
    />
    <Dialog
      contactName='Vlad'
      shortMessage='message message message'
      avatar={defaultAvatar}
    />
  </div>
);
