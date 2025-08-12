import { FixedNumber } from '@ethersproject/bignumber';

import type { Chain } from './network.js';

export type TxHash = string;

export type Address = string;

export type Asset = {
  chain: Chain;
  symbol: string;
  ticker: string;
  synth?: boolean;
};

export type CommonTxParams = {
  asset: string; // BNB.RUNE-B1A, BTC.BTC, ETH.USDT-0xffffff
  amount: number;
  decimal: number;
  recipient: string;
  memo?: string;
};

export type UTXO = {
  hash: string;
  index: number;
  value: number;
  txHex?: string;
  witnessUtxo?: Witness;
};

export type Witness = {
  value: number;
  script: Buffer;
};

export type FixedNumberish = string | number | FixedNumber;
