import { BigNumber } from "bignumber.js";
export declare namespace blockchain {
    interface Block {
        hash: string;
        index: number;
        timeMined: Date;
    }
    enum TransactionStatus {
        pending = 0,
        accepted = 1,
        rejected = 2,
        unknown = 3,
    }
    interface BaseTransaction {
        txid: string;
        amount: BigNumber;
        timeReceived: Date;
        status: TransactionStatus;
    }
    interface BlockTransaction extends BaseTransaction {
        blockIndex: number;
    }
    interface SingleTransaction extends BlockTransaction {
        to?: string;
        from?: string;
    }
    interface FullBlock<Transaction extends BlockTransaction> extends Block {
        transactions: Transaction[];
    }
    interface BlockReader<Transaction extends BlockTransaction> {
        getBlockIndex(): Promise<number>;
        getBlockInfo(index: number): Promise<Block | undefined>;
        getFullBlock(index: number): Promise<FullBlock<Transaction> | undefined>;
        getBlockTransactions(index: number): Promise<Transaction[]>;
    }
    interface ReadClientWithStatus<Transaction extends BlockTransaction> extends BlockReader<Transaction> {
        getTransactionStatus(txid: string): Promise<TransactionStatus>;
    }
    interface Contract {
        address: string;
        name: string;
    }
    interface ContractTransaction extends SingleTransaction {
        gasUsed: number;
        newContract?: Contract;
    }
}
