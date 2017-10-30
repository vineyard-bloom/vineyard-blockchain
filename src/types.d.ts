import { BigNumber } from 'bignumber.js';
export declare type Id = string;
export declare type Identity<T> = Id;
export interface Currency {
    id: Id;
    name: string;
}
export interface Address {
    address: string;
    currency: Identity<Currency>;
}
export interface AddressRecord extends Address {
    id: Id;
    address: string;
    currency: Identity<Currency>;
}
export interface BaseBlock {
    hash: string;
    index: number;
    currency: Identity<Currency>;
    timeMined: Date;
}
export interface Block extends BaseBlock {
    id: Id;
}
export declare enum TransactionStatus {
    pending = 0,
    accepted = 1,
    rejected = 2,
}
export interface BaseTransaction {
    txid: string;
    to: string;
    from: string;
    amount: BigNumber;
    timeReceived: Date;
    block: Identity<Block>;
    status: TransactionStatus;
}
export interface Transaction extends BaseTransaction {
    id: Id;
    currency: string;
}
export interface ExternalTransaction extends BaseTransaction {
    confirmations: number;
}
export interface ExternalBlock {
    hash: string;
    index?: number;
    timeMined: Date;
}
export interface FullExternalBlock extends ExternalBlock {
    transactions: ExternalTransaction[];
}
export interface ReadClient {
    getTransactionStatus(txid: string): Promise<number>;
    getNextFullBlock(block: Block): Promise<FullExternalBlock>;
}
export interface WriteClient {
}
