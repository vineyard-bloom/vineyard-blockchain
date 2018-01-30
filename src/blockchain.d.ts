import { BigNumber } from "bignumber.js";
export declare module blockchain {
    interface Block {
        hash: string;
        index: number;
        currency: number;
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
    interface FullBlock<Transaction extends BaseTransaction> extends Block {
        transactions: Transaction[];
    }
    interface ReadClient<Transaction extends BaseTransaction> {
        getBlockIndex(): Promise<number>;
        getLastBlock(): Promise<Block>;
        getTransactionStatus(txid: string): Promise<TransactionStatus>;
        getNextBlockInfo(block: Block | undefined): Promise<Block | undefined>;
        getFullBlock(block: Block): Promise<FullBlock<Transaction> | undefined>;
    }
}
