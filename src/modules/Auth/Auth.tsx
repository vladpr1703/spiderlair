import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useAccountEffect } from 'wagmi';
import { ConnectButton } from '../../components/ConnectButton/ConnectButton';
import bgImg from '../../../assets/background.png';
import Image from 'next/image';
import { Typography } from '@mui/material';

export const Auth = () => {
  const router = useRouter();

  useAccountEffect({
    onConnect: () => router.push('/main'),
    onDisconnect: () => router.push('/'),
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image alt='bg' src={bgImg} priority className={styles.bg} fill />
        <div className={styles.header}>
          Spiders<span>Lair</span>
        </div>
        <div className={styles.title}>
          <Typography color='white' fontSize={84} fontWeight={700}>
            Welcome to SpidersLair
          </Typography>
          <Typography className={styles.subtitle} color='white' fontSize={18}>
            New era for bitcoin with Spiders Enjoy new experience
          </Typography>
        </div>
        <div className={styles.button}>
          <ConnectButton />
        </div>
      </main>
    </div>
  );
};
