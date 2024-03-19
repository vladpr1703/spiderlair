import Image from 'next/image';
import styles from './styles.module.css';
import img from '../../../assets/Botanix Logo.png';
import { useState } from 'react';
import { joinClasses } from '../../utils/joinClasses';

export const Menu = () => {
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (i: number) => {
    setActiveItem(i);
  };

  const MENU_ITEMS = [
    { label: 'My DM' },
    { label: 'Groups' },
    { label: 'Contacts' },
  ];
  return (
    <div className={styles.menu}>
      <Image className={styles.img} src={img} alt='' />
      <button className={styles['button-message']}>Message</button>
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
    </div>
  );
};
