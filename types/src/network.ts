export enum Chain {
  Avalanche = 'AVAX',
  Binance = 'BNB',
  Bitcoin = 'BTC',
  Ethereum = 'ETH',
  THORChain = 'THOR',
  Cosmos = 'GAIA',
  BitcoinCash = 'BCH',
  Litecoin = 'LTC',
  Doge = 'DOGE',
  Solana = 'SOL',
}

export const SUPPORTED_CHAINS = [
  Chain.THORChain,
  Chain.Avalanche,
  Chain.Bitcoin,
  Chain.Ethereum,
  Chain.Binance,
  Chain.Cosmos,
  Chain.Doge,
  Chain.BitcoinCash,
  Chain.Litecoin,
  Chain.Solana,
] as const;

export type SupportedChain = typeof SUPPORTED_CHAINS[number];

export type SupportedChainsArray = typeof SUPPORTED_CHAINS;

export enum ContractAddress {
  AVAX = '0x0000000000000000000000000000000000000000',
  ETH = '0x0000000000000000000000000000000000000000',
  USDC_SPL_MINT_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDC_SPL_TESTNET_MINT_ADDRESS = '6TEqT62wq5mbKQPubX9eFeNJRYXRJd79Hk51pZk7nZrB',
}

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export enum NetworkId {
  Ethereum = 60,
  Binance = 714,
  THORChain = 931,
}

export enum ChainId {
  Avalanche = '43114',
  AvalancheHex = '0xa86a',
  Binance = 'Binance-Chain-Tigris',
  Bitcoin = 'bitcoin',
  Bitcoincash = 'bitcoincash',
  Cosmos = 'cosmos',
  DogeCoin = 'dogecoin',
  Ethereum = '1',
  EthereumHex = '0x1',
  Litecoin = 'litecoin',
  Thorchain = 'thorchain',
}

export enum AssetSymbol {
  AVAX = 'AVAX',
  BNB = 'BNB',
  BTC = 'BTC',
  ETH = 'ETH',
  THOR = 'THOR',
  GAIA = 'GAIA',
  BCH = 'BCH',
  LTC = 'LTC',
  RUNE = 'RUNE',
  'RUNE-67C' = 'RUNE-67C',
  'RUNE-B1A' = 'RUNE-B1A',
  DOGE = 'DOGE',
  SOL = 'SOL',
  ATOM = 'ATOM',
  MUON = 'MUON',
  RUNE_ERC_20 = 'RUNE-0x3155ba85d5f96b2d030a4966af206230e46849cb',
  RUNE_ERC_20_TESTNET = 'RUNE-0xd601c6A3a36721320573885A8d8420746dA3d7A0',
}

export const ChainToChainId = {
  [Chain.Avalanche]: ChainId.Avalanche,
  [Chain.Binance]: ChainId.Binance,
  [Chain.Bitcoin]: ChainId.Bitcoin,
  [Chain.BitcoinCash]: ChainId.Bitcoincash,
  [Chain.Cosmos]: ChainId.Cosmos,
  [Chain.Doge]: ChainId.DogeCoin,
  [Chain.Ethereum]: ChainId.Ethereum,
  [Chain.Litecoin]: ChainId.Litecoin,
  [Chain.THORChain]: ChainId.Thorchain,
  [Chain.Solana]: undefined,
};

export interface ResourceWorkerAllGasPricesResponse {
  ok: boolean;
  result: {
    chainId: ChainId;
    asset: string;
    gas: number;
    units: 'tor' | 'gwei' | 'wei' | 'sats' | 'uatom';
  }[];
}
