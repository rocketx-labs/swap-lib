/// <reference types="node" />

import { BigNumber } from '@ethersproject/bignumber';
import { BigNumberish } from '@ethersproject/bignumber';
import { FixedNumber } from '@ethersproject/bignumber';

export declare type Address = string;

export declare type AmountWithAssetDenom = AmountWithDenom<Denomination.Asset, FixedNumber>;

export declare type AmountWithBaseDenom = AmountWithDenom<Denomination.Base, BigNumber>;

declare type AmountWithDenom<T, U = BigNumber | FixedNumber> = T extends Denomination ? {
    type: T;
    amount: () => U;
    plus: (value: U | AmountWithDenom<T, U>, decimal?: number) => AmountWithDenom<T, U>;
    minus: (value: U | AmountWithDenom<T, U>, decimal?: number) => AmountWithDenom<T, U>;
    times: (value: U | AmountWithDenom<T, U>, decimal?: number) => AmountWithDenom<T, U>;
    div: (value: U | AmountWithDenom<T, U>, decimal?: number) => AmountWithDenom<T, U>;
    gt: (value: U | AmountWithDenom<T, U>) => boolean;
    gte: (value: U | AmountWithDenom<T, U>) => boolean;
    lt: (value: U | AmountWithDenom<T, U>) => boolean;
    lte: (value: U | AmountWithDenom<T, U>) => boolean;
    eq: (value: U | AmountWithDenom<T, U>) => boolean;
    decimal: number;
} : never;

export declare type Asset = {
    chain: Chain;
    symbol: string;
    ticker: string;
    synth?: boolean;
};

export declare enum AssetSymbol {
    AVAX = "AVAX",
    BNB = "BNB",
    BTC = "BTC",
    ETH = "ETH",
    THOR = "THOR",
    GAIA = "GAIA",
    BCH = "BCH",
    LTC = "LTC",
    RUNE = "RUNE",
    'RUNE-67C' = "RUNE-67C",
    'RUNE-B1A' = "RUNE-B1A",
    DOGE = "DOGE",
    SOL = "SOL",
    ATOM = "ATOM",
    MUON = "MUON",
    RUNE_ERC_20 = "RUNE-0x3155ba85d5f96b2d030a4966af206230e46849cb",
    RUNE_ERC_20_TESTNET = "RUNE-0xd601c6A3a36721320573885A8d8420746dA3d7A0"
}

export declare type Balance = {
    asset: Asset;
    amount: AmountWithBaseDenom;
};

export declare enum Chain {
    Avalanche = "AVAX",
    Binance = "BNB",
    Bitcoin = "BTC",
    Ethereum = "ETH",
    THORChain = "THOR",
    Cosmos = "GAIA",
    BitcoinCash = "BCH",
    Litecoin = "LTC",
    Doge = "DOGE",
    Solana = "SOL"
}

export declare enum ChainId {
    Avalanche = "43114",
    AvalancheHex = "0xa86a",
    Binance = "Binance-Chain-Tigris",
    Bitcoin = "bitcoin",
    Bitcoincash = "bitcoincash",
    Cosmos = "cosmos",
    DogeCoin = "dogecoin",
    Ethereum = "1",
    EthereumHex = "0x1",
    Litecoin = "litecoin",
    Thorchain = "thorchain"
}

export declare const ChainToChainId: {
    AVAX: ChainId;
    BNB: ChainId;
    BTC: ChainId;
    BCH: ChainId;
    GAIA: ChainId;
    DOGE: ChainId;
    ETH: ChainId;
    LTC: ChainId;
    THOR: ChainId;
    SOL: undefined;
};

export declare type ClientTxParams = {
    walletIndex?: number;
    asset?: Asset;
    amount: AmountWithBaseDenom;
    recipient: string;
    memo?: string;
};

declare type Coin = {
    asset: Asset;
    amount: AmountWithBaseDenom;
};

export declare type CommonTxParams = {
    asset: string;
    amount: number;
    decimal: number;
    recipient: string;
    memo?: string;
};

export declare enum ContractAddress {
    AVAX = "0x0000000000000000000000000000000000000000",
    ETH = "0x0000000000000000000000000000000000000000",
    USDC_SPL_MINT_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    USDC_SPL_TESTNET_MINT_ADDRESS = "6TEqT62wq5mbKQPubX9eFeNJRYXRJd79Hk51pZk7nZrB"
}

export declare enum Denomination {
    /**
     * values for asset amounts in base units (no decimal)
     */
    Base = "BASE",
    /**
     * values of asset amounts (w/ decimal)
     */
    Asset = "ASSET"
}

export declare type EIP1559TxParams<T = BigNumberish> = {
    nonce?: number;
    from?: string;
    to?: string;
    data?: string;
    value?: T;
    gasLimit?: T;
    maxFeePerGas?: T;
    maxPriorityFeePerGas?: T;
};

export declare const erc20ABI: ({
    inputs: never[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    anonymous: boolean;
    inputs: {
        indexed: boolean;
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    type: string;
    stateMutability?: undefined;
    outputs?: undefined;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
    anonymous?: undefined;
})[];

export declare enum ErrorCode {
    NoError = 36864
}

export declare enum FeeOption {
    Average = "average",
    Fast = "fast",
    Fastest = "fastest"
}

export declare type FeeRate = number;

export declare type FeeRates = Record<FeeOption, FeeRate>;

export declare type Fees = Record<FeeOption, AmountWithBaseDenom> & {
    type?: FeeType;
};

export declare type FeesWithRates = {
    rates: FeeRates;
    fees: Fees;
};

export declare enum FeeType {
    FlatFee = "base",
    PerByte = "byte"
}

export declare type FixedNumberish = string | number | FixedNumber;

export declare type GetAddressAndPubKeyResponse = {
    bech32_address: string;
    compressed_pk: any;
    error_message: string;
    return_code: number;
};

export declare type Keystore = {
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

export declare const LEDGER_SUPPORTED_CHAINS: readonly [Chain.THORChain, Chain.Ethereum, Chain.Binance, Chain.Bitcoin, Chain.BitcoinCash, Chain.Doge, Chain.Litecoin, Chain.Cosmos];

export declare const MOCK_PHRASE = "image rally need wedding health address purse army antenna leopard sea gain";

export declare type MultiSendParams = {
    walletIndex?: number;
    transactions: MultiTransfer[];
    memo?: string;
};

export declare type MultiTransfer = {
    to: Address;
    coins: Coin[];
};

export declare enum Network {
    Mainnet = "mainnet",
    Testnet = "testnet"
}

export declare enum NetworkId {
    Ethereum = 60,
    Binance = 714,
    THORChain = 931
}

export declare type PrivateKeyCache<T> = {
    privateKey: T;
    network: Network;
    phrase: string;
    index: number;
    derivationPath?: string;
};

export declare interface ResourceWorkerAllGasPricesResponse {
    ok: boolean;
    result: {
        chainId: ChainId;
        asset: string;
        gas: number;
        units: 'tor' | 'gwei' | 'wei' | 'sats' | 'uatom';
    }[];
}

export declare type RootDerivationPaths = Record<Network, string>;

export declare type Signature = {
    pub_key: {
        type: string;
        value: string;
    };
    sequence: string;
    signature: string;
};

export declare const SUPPORTED_CHAINS: readonly [Chain.THORChain, Chain.Avalanche, Chain.Bitcoin, Chain.Ethereum, Chain.Binance, Chain.Cosmos, Chain.Doge, Chain.BitcoinCash, Chain.Litecoin, Chain.Solana];

export declare type SupportedChain = typeof SUPPORTED_CHAINS[number];

export declare type SupportedChainsArray = typeof SUPPORTED_CHAINS;

export declare type Tx = {
    asset: Asset;
    from: TxFrom[];
    to: TxTo[];
    date: Date;
    type: TxType;
    hash: string;
};

export declare type TxFrom = {
    from: string;
    amount: AmountWithBaseDenom;
    asset?: Asset;
};

export declare type TxHash = string;

export declare type TxHistoryParams = {
    address: string;
    offset?: number;
    limit?: number;
    startTime?: Date;
    asset?: string;
};

export declare type TxParams = {
    walletIndex?: number;
    asset?: Asset;
    amount: AmountWithBaseDenom;
    recipient: Address;
    memo?: string;
};

export declare type TxsPage = {
    total: number;
    txs: Tx[];
};

export declare type TxTo = {
    to: string;
    amount: AmountWithBaseDenom;
    asset?: Asset;
};

export declare enum TxType {
    Transfer = "transfer",
    Unknown = "unknown"
}

export declare type UTXO = {
    hash: string;
    index: number;
    value: number;
    txHex?: string;
    witnessUtxo?: Witness;
};

export declare enum WalletOption {
    'KEYSTORE' = "KEYSTORE",
    'XDEFI' = "XDEFI",
    'METAMASK' = "METAMASK",
    'TRUSTWALLET' = "TRUSTWALLET",
    'LEDGER' = "LEDGER",
    'PHANTOM' = "PHANTOM",
    'KEPLR' = "KEPLR"
}

export declare type Witness = {
    value: number;
    script: Buffer;
};

export declare interface XChainClient {
    getNetwork(): Network;
    validateAddress(address: string): boolean;
    getAddress(walletIndex?: number): Address;
    getBalance(address: Address, assets?: Asset[]): Promise<Balance[]>;
    getFees(): Promise<Fees>;
    transfer(params: TxParams): Promise<TxHash>;
}

export declare type XChainClientParams = {
    network?: Network;
    phrase?: string;
    rootDerivationPaths?: RootDerivationPaths;
};

export { }
