export interface Trellis {
  primary_keys?: string[]
  properties: any
}

export interface FullSchema {
  Transaction: Trellis
}

export function getFullBlockchainSchema(): FullSchema {
  return require('./schema.json')
}