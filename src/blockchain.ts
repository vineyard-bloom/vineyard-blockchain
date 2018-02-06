import { BigNumber } from "bignumber.js";

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

  export interface BlockTransaction extends BaseTransaction {
    blockIndex: number
  }

  export interface SingleTransaction extends BlockTransaction {
    to: string
    from: string
  }

  export interface BlockClient<Transaction extends BlockTransaction> {
    getBlockIndex(): Promise<number>

    getBlockInfo(index: number): Promise<Block | undefined>

    getBlockTransactions(block: Block): Promise<Transaction[]>
  }

  export interface ReadClientWithStatus<Transaction extends BlockTransaction> extends BlockClient<Transaction> {
    getTransactionStatus(txid: string): Promise<TransactionStatus>
  }
}