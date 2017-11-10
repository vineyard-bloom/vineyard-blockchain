export interface Trellis {
    primary_keys?: string[];
    properties: any;
}
export interface FullSchema {
    SingleTransaction: Trellis;
}
export declare function getFullBlockchainSchema(): FullSchema;
