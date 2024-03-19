import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: '2990fca98e6a36e9c1196ce30b4f661a',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});