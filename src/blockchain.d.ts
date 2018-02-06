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
        to: string;
        from: string;
    }
    interface BlockClient<Transaction extends BlockTransaction> {
        getBlockIndex(): Promise<number>;
        getBlockInfo(index: number): Promise<Block | undefined>;
        getBlockTransactions(block: Block): Promise<Transaction[]>;
    }
    interface ReadClientWithStatus<Transaction extends BlockTransaction> extends BlockClient<Transaction> {
        getTransactionStatus(txid: string): Promise<TransactionStatus>;
    }
}
