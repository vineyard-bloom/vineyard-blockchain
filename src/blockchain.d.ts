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
    interface SingleTransaction extends BaseTransaction {
        to: string;
        from: string;
    }
    interface ReadClient<Transaction extends BaseTransaction> {
        getBlockIndex(): Promise<number>;
        getLastBlock(): Promise<Block>;
        getTransactionStatus(txid: string): Promise<TransactionStatus>;
        getNextBlockInfo(block: Block | undefined): Promise<Block | undefined>;
        getBlockTransactions(block: Block): Promise<Transaction[]>;
    }
}
