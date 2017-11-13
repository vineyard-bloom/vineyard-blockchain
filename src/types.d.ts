import { BigNumber } from 'bignumber.js';
export declare type Id = string;
export declare type Identity<T> = Id;
export interface Currency {
    id: Id;
    name: string;
}
export interface NewAddress {
    address: string;
    currency: Identity<Currency>;
}
export interface Address extends NewAddress {
    id: Id;
}
export interface AddressRecord extends Address {
    address: string;
    currency: Identity<Currency>;
}
export interface BaseBlock {
    hash: string;
    index: number;
    currency: Identity<Currency>;
    timeMined: Date;
}
export declare type NewBlock = BaseBlock;
export interface BlockInfo extends BaseBlock {
    id: Id;
}
export declare type Resolve<T> = (value: PromiseLike<T> | T | undefined) => void;
export declare enum TransactionStatus {
    pending = 0,
    accepted = 1,
    rejected = 2,
}
export interface BaseTransaction {
    txid: string;
    amount: BigNumber;
    timeReceived: Date;
    block: Identity<BlockInfo>;
    status: TransactionStatus;
}
export interface SingleTransactionProperties {
    to: string;
    from: string;
}
export declare type NewSingleTransaction = BaseTransaction & SingleTransactionProperties;
export interface SingleTransaction extends NewSingleTransaction {
    id: Id;
    currency: string;
}
export interface ExternalSingleTransaction extends BaseTransaction, SingleTransactionProperties {
    confirmations: number;
}
export interface ExternalBlock {
    hash: string;
    index: number;
    timeMined: Date;
}
export interface FullBlock<ExternalTransaction> extends ExternalBlock {
    transactions: ExternalTransaction[];
}
export interface ReadClient<Transaction extends BaseTransaction> {
    getLastBlock(): Promise<BaseBlock>;
    getTransactionStatus(txid: string): Promise<TransactionStatus>;
    getNextBlockInfo(block: BlockInfo | undefined): Promise<BaseBlock>;
    getFullBlock(block: BlockInfo): Promise<FullBlock<Transaction> | undefined>;
}
export interface WriteClient {
}
