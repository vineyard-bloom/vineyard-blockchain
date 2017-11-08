import {BigNumber} from 'bignumber.js'

export type Id = string

export type Identity<T> = Id

export interface Currency {
  id: Id
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
  to: string
  from: string
  amount: BigNumber
  timeReceived: Date
  block: Identity<BlockInfo>
  status: TransactionStatus
}

export type NewTransaction = BaseTransaction

export interface Transaction extends BaseTransaction {
  id: Id
  currency: string
}

export interface ExternalTransaction extends BaseTransaction {
  confirmations: number
}

export interface ExternalBlock {
  hash: string
  index: number
  timeMined: Date
}

export interface FullBlock extends ExternalBlock {
  transactions: ExternalTransaction []
}

export interface ReadClient {
  getLastBlock(): Promise<BlockInfo>

  getTransactionStatus(txid: string): Promise<TransactionStatus>

  getNextBlockInfo(block: BlockInfo | undefined): Promise<BlockInfo>

  getFullBlock(block: BlockInfo): Promise<FullBlock | undefined>
}

export interface WriteClient {

}