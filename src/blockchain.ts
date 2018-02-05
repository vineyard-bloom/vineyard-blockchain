import {BigNumber} from "bignumber.js";

// This file outlines a protocol that is intended to replace the previous types defined in vineyard-blockchain

export namespace blockchain {

  export interface Block {
    hash: string
    index: number
    timeMined: Date
  }

  export enum TransactionStatus {
    pending = 0,
    accepted = 1,
    rejected = 2,
  }

  export interface BaseTransaction {
    txid: string
    amount: BigNumber
    timeReceived: Date
    status: TransactionStatus
  }

  export interface SingleTransaction extends BaseTransaction {
    to: string
    from: string
  }

  export interface ReadClient<Transaction extends BaseTransaction> {

    getBlockIndex(): Promise<number>

    getLastBlock(): Promise<Block>

    getTransactionStatus(txid: string): Promise<TransactionStatus>

    getNextBlockInfo(block: Block | undefined): Promise<Block | undefined>

    getBlockTransactions(block: Block): Promise<Transaction[]>
  }

}