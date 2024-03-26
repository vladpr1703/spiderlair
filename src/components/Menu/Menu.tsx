import Image from 'next/image';
import styles from './styles.module.css';
import img from '../../../assets/Botanix Logo.png';
import { useState } from 'react';
import { joinClasses } from '../../utils/joinClasses';
import { MessageModal } from '../MessageModal/MessageModal';

export const Menu = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const handleItemClick = (i: number) => {
    setActiveItem(i);
  };

  const handleSendMessage = () => {
    setIsVisible(true);
  };

  const MENU_ITEMS = [
    { label: 'My DM' },
    { label: 'Groups' },
    { label: 'Contacts' },
  ];

  return (
    <>
      {isVisible && <MessageModal onClose={() => setIsVisible(false)} />}
      <div className={styles.menu}>
        <Image className={styles.img} src={img} alt='' />
        <button
          className={styles['button-message']}
          onClick={handleSendMessage}
        >
          Message
        </button>
        {MENU_ITEMS.map((el, i) => (
          <button
            key={i}
            className={joinClasses(styles.button, [
              styles.active,
              i === activeItem,
            ])}
            onClick={() => handleItemClick(i)}
          >
            {el.label}
          </button>
        ))}
      </div>{' '}
    </>
  );
};
