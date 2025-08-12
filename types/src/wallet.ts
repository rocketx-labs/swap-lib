import { AmountWithBaseDenom } from './amount.js';
import { Asset } from './commonTypes.js';
import { Chain } from './network.js';

export const MOCK_PHRASE =
  'image rally need wedding health address purse army antenna leopard sea gain';

export enum FeeOption {
  Average = 'average',
  Fast = 'fast',
  Fastest = 'fastest',
}

export enum FeeType {
  FlatFee = 'base',
  PerByte = 'byte',
}

export type Balance = {
  asset: Asset;
  amount: AmountWithBaseDenom;
};

export type Fees = Record<FeeOption, AmountWithBaseDenom> & {
  type?: FeeType;
};
export type FeeRate = number;
export type FeeRates = Record<FeeOption, FeeRate>;

// ledger supported chains
export const LEDGER_SUPPORTED_CHAINS = [
  Chain.THORChain,
  Chain.Ethereum,
  Chain.Binance,
  Chain.Bitcoin,
  Chain.BitcoinCash,
  Chain.Doge,
  Chain.Litecoin,
  Chain.Cosmos,
] as const;

export enum WalletOption {
  'KEYSTORE' = 'KEYSTORE',
  'XDEFI' = 'XDEFI',
  'METAMASK' = 'METAMASK',
  'TRUSTWALLET' = 'TRUSTWALLET',
  'LEDGER' = 'LEDGER',
  'PHANTOM' = 'PHANTOM',
  'KEPLR' = 'KEPLR',
}

export type Keystore = {
  crypto: {
    cipher: string;
    ciphertext: string;
    cipherparams: {
      iv: string;
    };
    kdf: string;
    kdfparams: {
      prf: string;
      dklen: number;
      salt: string;
      c: number;
    };
    mac: string;
  };
  id: string;
  version: number;
  meta: string;
};
