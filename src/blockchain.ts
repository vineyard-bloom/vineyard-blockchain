import { BigNumber } from "bignumber.js"

// This file outlines a protocol that is intended to replace the previous types defined in vineyard-blockchain

export namespace blockchain {

  //
  // Common Types
  //

  export interface Block {
    hash: string
    index: number
    number: number
    coinbase: string
    timeMined: Date
    parentHash: string
    difficulty: string
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

  export interface BlockTransaction extends BaseTransaction {
    blockIndex: number
  }

  // Used for Ethereum transactions or simplified Bitcoin transactions
  export interface SingleTransaction extends BlockTransaction {
    amount: BigNumber
    to?: string
    from?: string
  }

  export interface BlockBundle<Block, Transaction> {
    block: Block
    transactions: Transaction []
  }

  export interface BlockReader<Block, Transaction> {
    getHeighestBlockIndex(): Promise<number>

    getBlockBundle(index: number): Promise<BlockBundle<Block, Transaction>>
  }

  // export interface ReadClientWithStatus<Transaction extends BlockTransaction> extends BlockReader<Transaction> {
  //   getTransactionStatus(txid: string): Promise<TransactionStatus>
  // }

  //
  // Bitcoin Specific Types
  //

  export interface ScriptSig {
    hex: string
    asm: string
  }

  export interface TransactionInput {
    txid: string
    vout: number
    scriptSig: ScriptSig
    sequence: number,
    coinbase?: string
  }

  export interface ScriptPubKey {
    hex: string
    asm: string
    type: string
    addresses: string[]
  }

  export interface TransactionOutput {
    n: number
    address: string
    value: number
    valueSat: BigNumber
    scriptPubKey: ScriptPubKey,
    reqSigs?: number
  }

  export interface MultiTransaction extends BlockTransaction {
    inputs: TransactionInput[]
    outputs: TransactionOutput[]
  }

  //
  // Ethereum Specific Types
  //

  export interface EthereumBlock extends Block {
    uncleHash: string
    stateRoot: string
    transactionsTrie: string
    receiptTrie: string
    bloom: string
    gasLimit: number
    gasUsed: number
    timestamp: number
    extraData: string
    mixHash: string
    nonce: number
    rlp: string
  }

  export interface TokenTransfer {
    to: string
    from: string
    amount: BigNumber,
    txid: string,
    contractAddress: string,
    blockIndex: number
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
    internalTransactions?: InternalTransaction[]
  }

  export interface InternalTransaction {
    to: string
    from: string
    amount: BigNumber
    transaction: BaseTransaction
  }

  export type EventDecoder = (event: BaseEvent) => DecodedEvent
  
  // Returns an array of any invalid blocks that were found
  export type BlockValidator = (block: any) => Promise<any[]>
}