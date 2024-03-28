import { defineChain } from 'viem';
import { CONTRACT_ADDRESS } from './common';

export const botanix = /*#__PURE__*/ defineChain({
  id: 3636,
  name: 'Botanix Testnet',
  nativeCurrency: { name: 'BTC', symbol: 'BTC', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://node.botanixlabs.dev '],
    },
  },
  blockExplorers: {
    default: {
      name: 'BotanixScan',
      url: 'https://blockscout.botanixlabs.dev/',
      apiUrl: 'https://blockscout.botanixlabs.dev/',
    },
  },
  contracts: {
    multicall3: {
      address: CONTRACT_ADDRESS,
      blockCreated: 232347,
    },
  },
});
