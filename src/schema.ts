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