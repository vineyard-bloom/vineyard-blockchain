// This is deprecated.  In the future Vineyard Blockchain will no longer have anything to do with database types.

export interface Trellis {
  primary_keys?: string[]
  properties: any
}

export interface FullSchema {
  SingleTransaction: Trellis
}

export function getFullBlockchainSchema(): FullSchema {
  return require('./schema.json')
}