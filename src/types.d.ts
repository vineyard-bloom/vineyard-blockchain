import { BigNumber } from 'bignumber.js';
import { blockchain } from "./blockchain";
export declare type Id = string;
export declare type Identity<T> = Id;
export interface Currency {
    id: number;
    name: string;
}
export interface NewAddress {
    address: string;
    currency: number;
}
export interface Address extends NewAddress {
    id: Id;
}
export interface AddressRecord extends Address {
    address: string;
    currency: number;
}
export declare type BaseBlock = blockchain.Block;
export declare type NewBlock = BaseBlock;
export interface BlockInfo extends BaseBlock {
    id: Id;
}
export declare type Resolve<T> = (value: PromiseLike<T> | T | undefined) => void;
export interface BaseTransaction {
    txid: string;
    amount: BigNumber;
    timeReceived: Date;
    blockIndex: number;
    status: blockchain.TransactionStatus;
}
export interface SingleTransactionProperties {
    to?: string;
    from?: string;
}
export declare type NewSingleTransaction = BaseTransaction & SingleTransactionProperties;
export interface SingleTransaction extends NewSingleTransaction {
    id: Id;
    currency: number;
}
export interface ExternalSingleTransaction extends BaseTransaction, SingleTransactionProperties {
}
export interface ExternalBlock {
    hash: string;
    index: number;
    timeMined: Date;
}
export interface FullBlock<ExternalTransaction> extends ExternalBlock {
    transactions: ExternalTransaction[];
}
export interface ReadClient<ExternalTransaction> {
    getBlockIndex(): Promise<number>;
    getLastBlock(): Promise<BaseBlock>;
    getTransactionStatus(txid: string): Promise<blockchain.TransactionStatus>;
    getNextBlockInfo(blockIndex: number | undefined): Promise<BaseBlock | undefined>;
    getFullBlock(blockIndex: number): Promise<FullBlock<ExternalTransaction> | undefined>;
}
export interface BitcoinTransactionInfo {
    outputIndex: number;
    used: boolean;
}
export declare type BitcoinTransaction = BaseTransaction & BitcoinTransactionInfo;
export interface BitcoinReadClient<Transaction extends BitcoinTransaction, T extends BaseTransaction> extends ReadClient<T> {
    getFullBitcoinBlock(block: BlockInfo): Promise<FullBlock<Transaction> | undefined>;
}
