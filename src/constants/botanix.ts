import { defineChain } from 'viem';

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
      address: '0xf37577167A93a177f26409EAA2DeFe696D2b5B59',
      blockCreated: 232347,
    },
  },
});
