/// <reference types="node" />

import { Address } from '@thorswap-lib/types';
import { AmountWithBaseDenom } from '@thorswap-lib/types';
import { Balance } from '@thorswap-lib/types';
import { Chain } from '@thorswap-lib/types';
import { ECPairInterface } from 'ecpair';
import { FeeOption } from '@thorswap-lib/types';
import { FeeRate } from '@thorswap-lib/types';
import { FeeRates } from '@thorswap-lib/types';
import { Fees } from '@thorswap-lib/types';
import { Psbt } from 'bitcoinjs-lib';
import { TxHash } from '@thorswap-lib/types';
import { TxParams } from '@thorswap-lib/types';
import { UTXO as UTXO_2 } from '@thorswap-lib/types';
import { WalletTxParams } from '@thorswap-lib/types';

export declare type AddressBalance = {
    confirmed: AmountWithBaseDenom;
    unconfirmed: AmountWithBaseDenom;
    address: string;
};

export declare type AddressParams = {
    address: string;
    decimal?: number;
    chain: Chain;
};

export declare class ApiClient {
    chain: Chain;
    protected nodeUrl: string;
    private apiKey;
    constructor({ chain, apiKey, nodeUrl }: ApiClientParams);
    getAddress: (address: string) => Promise<BlockchairAddressResponse>;
    getBalance: ({ address }: {
        address: string;
    }) => Promise<AddressBalance>;
    getBalanceAmount: ({ address }: {
        address: string;
    }) => Promise<AmountWithBaseDenom>;
    getUnspentTxs: (address: string) => Promise<(UTXO_2 & {
        script_hex: string;
        is_confirmed: boolean;
    })[]>;
    getConfirmedUnspentTxs: (address: string) => Promise<(UTXO_2 & {
        script_hex: string;
        is_confirmed: boolean;
    })[]>;
    getSuggestedTxFee: () => Promise<number>;
    getIsTxConfirmed: (txHash: string) => Promise<boolean>;
    getRawTx: (txHash: string) => Promise<string>;
    scanUTXOs: ({ address, fetchTxHex }: CommonScanUTXOParam) => Promise<UTXO_2[]>;
    broadcastTx: ({ txHex }: BroadcastTxParams) => Promise<string>;
}

export declare type ApiClientParams = {
    chain: Chain;
    apiKey?: string;
    nodeUrl: string;
};

export declare const BaseUTXOToolbox: (baseToolboxParams: UTXOBaseToolboxParams) => {
    buildTx: (params: UTXOBuildTxParams) => Promise<{
        psbt: Psbt;
        utxos: UTXO_2[];
        inputs: UTXO_2[];
    }>;
    createKeysForPath: (params: UTXOCreateKeyParams) => ECPairInterface;
    validateAddress: (address: string) => boolean;
    getAddressFromKeys: (keys: ECPairInterface) => string;
    broadcastTx: (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>);
    transfer: (params: UTXOWalletTransferParams<Psbt, Psbt>) => Promise<string>;
    getBalance: (address: string) => Promise<Balance[]>;
    getSuggestedFeeRate: () => Promise<number>;
    getFeeRates: () => Promise<FeeRates>;
    getFees: () => Promise<Fees>;
    getFeesAndFeeRates: () => Promise<{
        fees: Fees;
        rates: FeeRates;
    }>;
};

export declare const BCHToolbox: (apiKey?: string, apiClientOrUrl?: BitcoincashApi | string) => {
    stripPrefix: (address: Address) => string;
    validateAddress: (address: string, _chain?: UTXOChain) => boolean;
    createKeysForPath: ({ phrase, derivationPath, }: {
        phrase?: string | undefined;
        derivationPath?: string | undefined;
    }) => KeyPairType;
    getAddressFromKeys: (keys: KeyPairType) => string;
    buildBCHTx: (params: UTXOBuildTxParams) => Promise<{
        builder: TransactionBuilderType;
        utxos: UTXO_2[];
    }>;
    buildTx: (params: UTXOBuildTxParams) => Promise<{
        psbt: Psbt;
        utxos: UTXO_2[];
        inputs: UTXO_2[];
    }>;
    transfer: (params: TransferParams) => Promise<string>;
    getBalance: (address: string) => Promise<Balance[]>;
    broadcastTx: (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>);
    getSuggestedFeeRate: () => Promise<number>;
    getFeeRates: () => Promise<FeeRates>;
    getFees: () => Promise<Fees>;
    getFeesAndFeeRates: () => Promise<{
        fees: Fees;
        rates: FeeRates;
    }>;
};

export declare class BitcoinApi extends ApiClient implements UTXOApiClient {
    constructor({ apiKey, nodeUrl, chain }: ApiClientParams);
}

export declare class BitcoincashApi extends ApiClient implements UTXOApiClient {
    constructor({ apiKey, nodeUrl, chain }: ApiClientParams);
}

export declare interface BlockchairAddressCoreData {
    type: string;
    script_hex: string;
    balance: number;
    balance_usd: number;
    received: number;
    received_usd: number;
    spent: number;
    spent_usd: number;
    output_count: number;
    unspent_output_count: number;
    first_seen_receiving: string;
    last_seen_receiving: string;
    first_seen_spending: null | string;
    last_seen_spending: null | string;
    transaction_count: number;
    scripthash_type: null | string;
}

export declare interface BlockchairAddressesParams extends BlockchairBaseParams {
    addresses: Address[];
}

export declare interface BlockchairAddressParams extends BlockchairBaseParams {
    address: Address;
}

export declare interface BlockchairAddressResponse {
    [key: Address]: {
        address: BlockchairAddressCoreData;
        transactions: BlockchairTransaction[];
        utxo: BlockchairUtxo[];
    };
}

export declare interface BlockchairBaseParams {
    chain: Chain;
    apiKey?: string;
}

export declare interface BlockchairDashboardTransactionResponse {
    [key: TxHash]: {
        transaction: {
            block_id: number;
            id: number;
            hash: string;
            date: string;
            time: string;
            size: number;
            weight: number;
            version: number;
            lock_time: number;
            is_coinbase: boolean;
            has_witness: boolean;
            input_count: number;
            output_count: number;
            input_total: number;
            input_total_usd: number;
            output_total: number;
            output_total_usd: number;
            fee: number;
            fee_usd: number;
            fee_per_kb: number;
            fee_per_kb_usd: number;
            fee_per_kwu: number;
            fee_per_kwu_usd: number;
            cdd_total: number;
            is_rbf: boolean;
        };
        inputs: BlockchairTransactionInputOutput[];
        outputs: BlockchairTransactionInputOutput[];
    };
}

export declare interface BlockchairInputOutputCommonData {
    block_id: number;
    transaction_id: number;
    index: number;
    transaction_hash: string;
    date: string;
    time: string;
    value: number;
    value_usd: number;
    recipient: string;
    type: string;
    script_hex: string;
    is_from_coinbase: boolean;
    is_spendable: boolean | null;
    is_spent: boolean;
    lifespan: number | null;
    cdd: number | null;
}

export declare interface BlockchairMultipleAddressesResponse {
    addresses: {
        [key: Address]: BlockchairAddressCoreData;
    };
    transactions: BlockchairTransaction[];
    utxo: BlockchairUtxo[];
    set: {
        address_count: number;
        balance: number;
        balance_usd: number;
        received: number;
        spent: number;
        output_count: number;
        unspent_output_count: number;
        first_seen_receiving: string;
        last_seen_receiving: string;
        first_seen_spending: null | string;
        last_seen_spending: null | string;
        transaction_count: number;
    };
}

export declare interface BlockchairMultipleBalancesResponse {
    [key: Address]: number;
}

export declare interface BlockchairOutputsResponse extends BlockchairSpendingBlockData, BlockchairInputOutputCommonData {
}

export declare interface BlockchairRawTransactionResponse {
    [key: TxHash]: {
        raw_transaction: string;
        decoded_raw_transaction: {
            txid: string;
            hash: string;
            version: number;
            size: number;
            vsize: number;
            weight: number;
            locktime: number;
            vin: BlockchairVin[];
            vout: BlockchairVout[];
        };
    };
}

export declare interface BlockchairResponse<T> {
    data: T;
    context: {
        code: number;
        source: string;
        results: number;
        state: number;
        market_price_usd: number;
        cache: {
            live: boolean;
            duration: number;
            since: string;
            until: string;
            time: any;
        };
        api: {
            version: string;
            last_major_update: string;
            next_major_update: null | string;
            documentation: string;
            notice: string;
        };
        servers: string;
        time: number;
        render_time: number;
        full_time: number;
        request_cost: number;
    };
}

export declare interface BlockchairSpendingBlockData {
    spending_block_id: number | null;
    spending_transaction_id: number | null;
    spending_index: number | null;
    spending_transaction_hash: string | null;
    spending_date: string | null;
    spending_time: string | null;
    spending_value_usd: number | null;
    spending_sequence: number | null;
    spending_signature_hex: string | null;
    spending_witness: string | null;
}

export declare interface BlockchairTransaction {
    block_id: number;
    hash: TxHash;
    time: string;
    balance_change: number;
}

export declare interface BlockchairTransactionInputOutput extends BlockchairSpendingBlockData, BlockchairInputOutputCommonData {
    scripthash_type: null | string;
}

export declare interface BlockchairTransactionParams extends BlockchairBaseParams {
    txHash: TxHash;
}

export declare interface BlockchairUtxo {
    block_id: number;
    transaction_hash: TxHash;
    index: number;
    value: number;
}

export declare interface BlockchairVin {
    txid: string;
    vout: number;
    scriptSig: {
        asm: string;
        hex: string;
    };
    sequence: number;
}

export declare interface BlockchairVout {
    value: number;
    n: number;
    scriptPubKey: {
        asm: string;
        hex: string;
        address: string;
        type: string;
        addresses: string[];
        reqSigs: number;
    };
}

export declare type BroadcastTxParams = {
    txHex: string;
    nodeUrl?: string;
};

export declare const BTCToolbox: (apiKey?: string, apiClientOrUrl?: BitcoinApi | string) => {
    buildTx: (params: UTXOBuildTxParams) => Promise<{
        psbt: Psbt;
        utxos: UTXO_2[];
        inputs: UTXO_2[];
    }>;
    createKeysForPath: (params: UTXOCreateKeyParams) => ECPairInterface;
    validateAddress: (address: string) => boolean;
    getAddressFromKeys: (keys: ECPairInterface) => string;
    broadcastTx: (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>);
    transfer: (params: UTXOWalletTransferParams<Psbt, Psbt>) => Promise<string>;
    getBalance: (address: string) => Promise<Balance[]>;
    getSuggestedFeeRate: () => Promise<number>;
    getFeeRates: () => Promise<FeeRates>;
    getFees: () => Promise<Fees>;
    getFeesAndFeeRates: () => Promise<{
        fees: Fees;
        rates: FeeRates;
    }>;
};

export declare const calcFee: (feeRate: number, memo?: string) => AmountWithBaseDenom;

export declare const calcFees: <T, U extends unknown[]>(feeRates: Record<FeeOption, T>, calcFee: (feeRate: T, ...args: U) => AmountWithBaseDenom, ...args: U) => Fees;

export declare const calcFeesAsync: <T, U extends unknown[]>(feeRates: Record<FeeOption, T>, calcFee: (feeRate: T, ...args: U) => AmountWithBaseDenom, ...args: U) => Fees;

export declare type CommonScanUTXOParam = {
    address: string;
    fetchTxHex: boolean;
};

export declare const compileMemo: (memo: string) => Buffer;

export declare class DogecoinApi extends ApiClient implements UTXOApiClient {
    constructor({ apiKey, nodeUrl, chain }: ApiClientParams);
}

export declare const DOGEToolbox: (apiKey?: string, apiClientOrUrl?: DogecoinApi | string) => {
    buildTx: (params: UTXOBuildTxParams) => Promise<{
        psbt: Psbt;
        utxos: UTXO_2[];
        inputs: UTXO_2[];
    }>;
    createKeysForPath: (params: UTXOCreateKeyParams) => ECPairInterface;
    validateAddress: (address: string) => boolean;
    getAddressFromKeys: (keys: ECPairInterface) => string;
    broadcastTx: (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>);
    transfer: (params: UTXOWalletTransferParams<Psbt, Psbt>) => Promise<string>;
    getBalance: (address: string) => Promise<Balance[]>;
    getSuggestedFeeRate: () => Promise<number>;
    getFeeRates: () => Promise<FeeRates>;
    getFees: () => Promise<Fees>;
    getFeesAndFeeRates: () => Promise<{
        fees: Fees;
        rates: FeeRates;
    }>;
};

export declare const getDefaultFees: () => Fees;

export declare const getDefaultFeesWithRates: () => {
    fees: Fees;
    rates: {
        fastest: number;
        average: number;
        fast: number;
    };
};

export declare const getFee: (inputs: UTXO_2[], feeRate: FeeRate, data?: Buffer | null) => number;

export declare const getNetwork: (chain: Chain) => any;

export declare const getSeed: (phrase: string) => Buffer;

export declare const inputBytes: (input: UTXO_2) => number;

declare type KeyPairType = {
    getAddress(index?: number): string;
};

export declare class LitecoinApi extends ApiClient implements UTXOApiClient {
    constructor({ apiKey, nodeUrl, chain }: ApiClientParams);
}

export declare const LTCToolbox: (apiKey?: string, apiClientOrUrl?: LitecoinApi | string) => {
    buildTx: (params: UTXOBuildTxParams) => Promise<{
        psbt: Psbt;
        utxos: UTXO_2[];
        inputs: UTXO_2[];
    }>;
    createKeysForPath: (params: UTXOCreateKeyParams) => ECPairInterface;
    validateAddress: (address: string) => boolean;
    getAddressFromKeys: (keys: ECPairInterface) => string;
    broadcastTx: (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>) | (({ txHex }: BroadcastTxParams) => Promise<string>);
    transfer: (params: UTXOWalletTransferParams<Psbt, Psbt>) => Promise<string>;
    getBalance: (address: string) => Promise<Balance[]>;
    getSuggestedFeeRate: () => Promise<number>;
    getFeeRates: () => Promise<FeeRates>;
    getFees: () => Promise<Fees>;
    getFeesAndFeeRates: () => Promise<{
        fees: Fees;
        rates: FeeRates;
    }>;
};

export declare type RawTransaction = {
    result: string;
};

export declare const singleFeeRate: (rate: FeeRate) => FeeRates;

export declare const standardFeeRates: (rate: FeeRate) => FeeRates;

declare type TransactionBuilderType = {
    inputs: any[];
    sign(vin: number, keyPair: KeyPairType, redeemScript?: Buffer, hashType?: number, witnessValue?: number, witnessScript?: Buffer, signatureAlgorithm?: string): void;
    build(): TransactionType;
};

declare type TransactionType = {
    toHex(): string;
};

declare type TransferParams = UTXOWalletTransferParams<{
    builder: TransactionBuilderType;
    utxos: UTXO_2[];
}, TransactionType>;

export declare type TxBlockchairResponse = {
    data: {
        transaction_hash: string;
    };
    api: any;
    cache: any;
};

export declare type TxBroadcastResponse = {
    id: string;
    result: string;
    error: string | null;
};

export declare type UTXO = {
    hash: string;
    index: number;
    value: number;
    witnessUtxo: Witness;
    txHex?: string;
};

export declare abstract class UTXOApiClient {
    abstract broadcastTx: ({ txHex, nodeUrl }: BroadcastTxParams) => Promise<string>;
    abstract getRawTx: (txHash: string, apiKey: string) => Promise<string>;
}

export declare type UTXOApiClientType = BitcoinApi | BitcoincashApi | DogecoinApi | LitecoinApi;

export declare type UTXOBaseToolboxParams = {
    apiClient: UTXOApiClientType;
    chain: UTXOChain;
};

export declare type UTXOBuildTxParams = TxParams & {
    feeRate: number;
    sender: string;
    fetchTxHex?: boolean;
};

export declare type UTXOChain = Chain.Bitcoin | Chain.BitcoinCash | Chain.Doge | Chain.Litecoin;

export declare type UTXOCreateKeyParams = {
    phrase?: string;
    wif?: string;
    derivationPath: string;
};

export declare type UTXOTransferParams = WalletTxParams & {
    feeRate?: number;
};

export declare type UTXOWalletTransferParams<T, U> = UTXOTransferParams & {
    signTransaction: (params: T) => Promise<U>;
};

export declare const validatePhrase: (phrase: string) => boolean;

export declare type Witness = {
    value: number;
    script: Buffer;
};

export { }
