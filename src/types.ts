import {BigNumber} from 'bignumber.js'

export type Id = string

export type Identity<T> = Id

export interface Currency {
  id: Id
  name: string
}

export interface Address {
  id: Id
  address: string
  currency: Identity<Currency>
}

export interface BaseBlock {
  hash: string
  index: number
  currency: Identity<Currency>
  timeMined: Date
}

export interface Block {
  id: Id
}

export enum TransactionStatus {
  pending,
  accepted,
  rejected,
}

export interface BaseTransaction {
  txid: string
  to: string
  from: string
  amount: BigNumber
  timeReceived: Date
  block: Identity<Block>
}

export interface Transaction extends BaseTransaction {
  id: Id
  status: TransactionStatus
  currency: string
}

export interface ExternalTransaction extends BaseTransaction {
  confirmations: number
}

export interface ExternalBlock {
  hash: string
  index?: number
  timeMined: Date
}

export interface FullExternalBlock extends ExternalBlock {
  transactions: ExternalTransaction []
}

export interface ReadClient {
  getTransaction(txid: string): Promise<ExternalTransaction>

  getNextFullBlock(block: Block): Promise<FullExternalBlock>
}

export interface WriteClient {

}