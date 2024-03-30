import Image from 'next/image';
import styles from './styles.module.scss';
import img from '../../../assets/logo.png';
import { useEffect, useState } from 'react';
import { joinClasses } from '../../utils/joinClasses';
import { MENU_ITEMS } from './constants';
import { useRouter } from 'next/router';
import { MessageModal } from './components/MessageModal';
import { useChainId, useSwitchChain } from 'wagmi';

export const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const chainId = useChainId();
  const handleItemClick = (i: number, path: string) => {
    router.push(path);
  };

  const handleSendMessage = () => {
    setIsVisible(true);
  };

  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (chainId !== 3636) {
      switchChain({ chainId: 3636 });
      return;
    }
  }, []);

  return (
    <>
      {isVisible && <MessageModal onClose={() => setIsVisible(false)} />}
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Image alt='logo' width={98} height={98} src={img} priority />
          <span>SpiderLair</span>
        </div>
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
              router.asPath === el.path,
            ])}
            onClick={() => handleItemClick(i, el.path)}
          >
            <Image
              alt='icon'
              src={router.asPath === el.path ? el.activeIcon : el.icon}
            />
            {el.label}
          </button>
        ))}
      </div>
    </>
  );
};
