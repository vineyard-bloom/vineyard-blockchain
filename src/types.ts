import {BigNumber} from 'bignumber.js'

export type Id = string

export type Identity<T> = T | Id

export interface Currency {
  id: Id
  name: string
}

export interface Address {
  id: string
  currency: Identity<Currency>
}

export interface Block {
  id: Id
  hash: string
  index: number
  currency: Identity<Currency>
  timeMined: Date
}

export enum TransactionStatus {
  pending,
  accepted,
  rejected,
}

export interface Transaction {
  id: Id
  txid: string
  to: string
  from: string
  amount: BigNumber
  status: TransactionStatus
  timeReceived: Date
  currency: string
  block: Identity<Block>
}

export interface ReadClient {

}

export interface WriteClient {

}