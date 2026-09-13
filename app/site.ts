export const SITE = {
  name: 'Mersennet',
  domain: 'mersennet.com',
  url: 'https://mersennet.com',
  tagline: 'The private, verifiable network',
  description:
    'Mersennet is a zero-knowledge Layer 1: account-level privacy across the EVM and a native on-chain order book, leverage secured by ZK risk checks instead of open liquidations, and state proven end to end with SP1.',
  chainId: 131071,
  mainnetChainId: 8191,
  symbol: 'MRSN',
  blockTime: '~2s',
  consensus: 'BFT PoS',
  rpcUrl: 'rpc.mersennet.com',
} as const;

export const LINKS = {
  docs: 'https://docs.mersennet.com',
  explorer: 'https://explorer.mersennet.com',
  faucet: 'https://faucet.mersennet.com',
  trade: 'https://trade.mersennet.com',
  github: 'https://github.com/mersennet/mersennet',
  whitepaper: 'https://docs.mersennet.com/whitepaper',
  quickStart: 'https://docs.mersennet.com/developers/quick-start/hardhat',
  networkInfo: 'https://docs.mersennet.com/getting-started/network-info',
  status: 'https://status.mersennet.com',
  statusPage: 'https://status.mersennet.com/status/mersennet',
  rpc: 'https://docs.mersennet.com/developers/rpc/methods',
  sdk: 'https://docs.mersennet.com/developers/sdks/javascript',
  // Operate the network
  downloads: 'https://mersennet.com/downloads/',
  runNode: 'https://docs.mersennet.com/validators/run-a-node/',
  becomeValidator: 'https://docs.mersennet.com/validators/become-a-validator/',
  staking: 'https://trade.mersennet.com/staking',
  points: 'https://trade.mersennet.com/points',
  explorerNetwork: 'https://explorer.mersennet.com/#/network',
  explorerValidators: 'https://explorer.mersennet.com/#/validators',
  installOneLiner: 'curl -fsSL https://mersennet.com/downloads/install.sh | sudo bash',
} as const;
