import { address, Network, networks } from "bitcoinjs-lib"

export function addressFromOutScriptHex (pubKeyHex: string, network: Network): string | undefined {
  try {
    return address.fromOutputScript(new Buffer(pubKeyHex, "hex"), network)
  } catch (e) {
    console.error(`Unable to parse address from output script: ${pubKeyHex}: ${e}`)
    return undefined
  }
}
