import type { GetServerSideProps, NextPage } from 'next';
import { Auth } from '../src/modules/Auth/Auth';
import { getServerSideProps } from 'next/dist/build/templates/pages';
import { UseAccountReturnType, useAccount } from 'wagmi';
import { config } from '../config';

const Home: NextPage = () => {
  return <Auth />;
};

export default Home;
