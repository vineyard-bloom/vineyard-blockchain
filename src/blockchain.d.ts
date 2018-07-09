import { BigNumber } from "bignumber.js";
export declare namespace blockchain {
    interface Block {
        hash: string;
        index: number;
        number: number;
        coinbase: string;
        timeMined: Date;
        parentHash: string;
        difficulty: string;
    }
    enum TransactionStatus {
        pending = 0,
        accepted = 1,
        rejected = 2,
        unknown = 3,
    }
    interface BaseTransaction {
        txid: string;
        timeReceived: Date;
        status: TransactionStatus;
        fee: BigNumber;
        nonce: number;
    }
    interface BlockTransaction extends BaseTransaction {
        blockIndex: number;
    }
    interface SingleTransaction extends BlockTransaction {
        amount: BigNumber;
        to?: string;
        from?: string;
    }
    interface BlockBundle<Block, Transaction> {
        block: Block;
        transactions: Transaction[];
    }
    interface BlockReader<Block, Transaction> {
        getHeighestBlockIndex(): Promise<number>;
        getBlockBundle(index: number): Promise<BlockBundle<Block, Transaction>>;
    }
    interface ScriptSig {
        hex: string;
        asm: string;
    }
    interface TransactionInput {
        txid: string;
        vout: number;
        scriptSig: ScriptSig;
        sequence: number;
        coinbase?: string;
    }
    interface ScriptPubKey {
        hex: string;
        asm: string;
        type: string;
        addresses: string[];
    }
    interface TransactionOutput {
        n: number;
        address: string;
        value: number;
        valueSat: BigNumber;
        scriptPubKey: ScriptPubKey;
        reqSigs?: number;
    }
    interface MultiTransaction extends BlockTransaction {
        inputs: TransactionInput[];
        outputs: TransactionOutput[];
    }
    interface EthereumBlock extends Block {
        uncleHash: string;
        stateRoot: string;
        transactionsTrie: string;
        receiptTrie: string;
        bloom: string;
        gasLimit: number;
        gasUsed: number;
        timestamp: number;
        extraData: string;
        mixHash: string;
        nonce: number;
        rlp: string;
    }
    interface TokenTransfer {
        to: string;
        from: string;
        amount: BigNumber;
        txid: string;
        contractAddress: string;
        blockIndex: number;
    }
    enum ContractType {
        unknown = 0,
        token = 1,
    }
    interface Contract {
        address: string;
        contractType: ContractType;
        txid: string;
    }
    interface TokenContract extends Contract {
        contractType: ContractType.token;
        name: string;
        totalSupply: BigNumber | number;
        decimals: BigNumber;
        version: string;
        symbol: string;
    }
    type AnyContract = Contract | TokenContract;
    interface BaseEvent {
        transactionHash: string;
        address: string;
    }
    interface DecodedEvent extends BaseEvent {
        args: any;
    }
    interface ContractTransaction extends SingleTransaction {
        gasUsed: number;
        gasPrice: BigNumber;
        newContract?: AnyContract;
        events?: BaseEvent[];
        internalTransactions?: InternalTransaction[];
    }
    interface InternalTransaction {
        to: string;
        from: string;
        amount: BigNumber;
        transaction: BaseTransaction;
    }
    type EventDecoder = (event: BaseEvent) => DecodedEvent;
    type BlockValidator = (block: any) => Promise<any[]>;
}
