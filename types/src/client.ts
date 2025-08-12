import { Address, Asset, TxHash } from './commonTypes.js';
import { Network } from './network.js';
import { TxParams } from './transactions.js';
import { Balance, FeeRates, Fees } from './wallet.js';

export type FeesWithRates = { rates: FeeRates; fees: Fees };

export type RootDerivationPaths = Record<Network, string>;

export type XChainClientParams = {
  network?: Network;
  phrase?: string;
  rootDerivationPaths?: RootDerivationPaths;
};

export type PrivateKeyCache<T> = {
  privateKey: T;
  network: Network;
  phrase: string;
  index: number;
  derivationPath?: string;
};

export interface XChainClient {
  getNetwork(): Network;

  validateAddress(address: string): boolean;
  getAddress(walletIndex?: number): Address;

  getBalance(address: Address, assets?: Asset[]): Promise<Balance[]>;

  getFees(): Promise<Fees>;

  transfer(params: TxParams): Promise<TxHash>;
}
