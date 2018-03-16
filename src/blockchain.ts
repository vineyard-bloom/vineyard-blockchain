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
    unknown = 3,
  }

  export interface BaseTransaction {
    txid: string
    timeReceived: Date
    status: TransactionStatus,
    fee: BigNumber
    nonce: number
  }

  export interface TokenTransfer {
    to: string
    from: string
    amount: BigNumber,
    txid: string,
    contractAddress: string,
    blockIndex: number
  }

  export interface BlockTransaction extends BaseTransaction {
    blockIndex: number
  }

  export interface SingleTransaction extends BlockTransaction {
    amount: BigNumber
    to?: string
    from?: string
  }

  export interface FullBlock<Transaction extends BlockTransaction> extends Block {
    transactions: Transaction []
  }

  export interface BlockReader<Transaction extends BlockTransaction> {
    getBlockIndex(): Promise<number>

    getBlockInfo(index: number): Promise<Block | undefined>

    getFullBlock(index: number): Promise<FullBlock<Transaction> | undefined>
  }

  // export interface ContractReader {
  //   getBlockContractTransfers(toBlock: number, fromBlock: number, watchAddresses: string[]): Promise<TokenTransfer[]>
  // }

  export interface ReadClientWithStatus<Transaction extends BlockTransaction> extends BlockReader<Transaction> {
    getTransactionStatus(txid: string): Promise<TransactionStatus>
  }

  export enum ContractType {
    unknown = 0,
    token = 1,
  }

  export interface Contract {
    address: string
    contractType: ContractType
    txid: string
  }

  export interface TokenContract extends Contract {
    contractType: ContractType.token
    name: string
    totalSupply: BigNumber | number
    decimals: BigNumber
    version: string
    symbol: string
  }

  export type AnyContract = Contract | TokenContract

  export interface BaseEvent {
    transactionHash: string
    address: string
  }

  export interface DecodedEvent extends BaseEvent {
    args: any
  }

  export interface ContractTransaction extends SingleTransaction {
    gasUsed: number
    gasPrice: BigNumber
    newContract?: AnyContract
    events?: BaseEvent[]
  }

  export type EventDecoder = (event: BaseEvent) => DecodedEvent
}