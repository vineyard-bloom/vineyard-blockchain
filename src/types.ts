import {BigNumber} from 'bignumber.js'

export type Id = string

export type Identity<T> = Id

export interface Currency {
  id: number
  name: string
}

export interface NewAddress {
  address: string
  currency: Identity<Currency>
}

export interface Address extends NewAddress {
  id: Id
}

export interface AddressRecord extends Address {
  address: string
  currency: Identity<Currency>
}

export interface BaseBlock {
  hash: string
  index: number
  currency: Identity<Currency>
  timeMined: Date
}

export type NewBlock = BaseBlock

export interface BlockInfo extends BaseBlock {
  id: Id
}

export type Resolve<T> = (value: PromiseLike<T>|T|undefined) => void

export enum TransactionStatus {
  pending = 0,
  accepted = 1,
  rejected = 2,
}

export interface BaseTransaction {
  txid: string
  amount: BigNumber
  timeReceived: Date
  block: Identity<BlockInfo>
  status: TransactionStatus
}

export interface SingleTransactionProperties {
  to: string
  from: string
}

export type NewSingleTransaction = BaseTransaction & SingleTransactionProperties

export interface SingleTransaction extends NewSingleTransaction {
  id: Id
  currency: string
}

export interface ExternalSingleTransaction extends BaseTransaction, SingleTransactionProperties {
  confirmations: number
}

export interface ExternalBlock {
  hash: string
  index: number
  timeMined: Date
}

export interface FullBlock<ExternalTransaction> extends ExternalBlock {
  transactions: ExternalTransaction[]
}

export interface ReadClient<ExternalTransaction extends BaseTransaction> {
  getLastBlock(): Promise<BaseBlock>

  getTransactionStatus(txid: string): Promise<TransactionStatus>

  getNextBlockInfo(block: BaseBlock | undefined): Promise<BaseBlock>
  
  getFullBlock(block: BaseBlock): Promise<FullBlock<ExternalTransaction> | undefined>
}

export interface BitcoinTransactionInfo {
  outputIndex: number,
  used: boolean
}

export type BitcoinTransaction = BaseTransaction & BitcoinTransactionInfo

export interface BitcoinReadClient<Transaction extends BitcoinTransaction, T extends BaseTransaction> extends ReadClient<T> {
  getFullBitcoinBlock(block: BlockInfo): Promise<FullBlock<Transaction> | undefined>
}

export interface WriteClient {

}