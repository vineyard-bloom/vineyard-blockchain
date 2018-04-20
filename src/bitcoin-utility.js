"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
function addressFromOutScriptHex(pubKeyHex, network) {
    try {
        return bitcoinjs_lib_1.address.fromOutputScript(new Buffer(pubKeyHex, "hex"), network);
    }
    catch (e) {
        console.error(`Unable to parse address from output script: ${pubKeyHex}: ${e}`);
        return undefined;
    }
}
exports.addressFromOutScriptHex = addressFromOutScriptHex;
//# sourceMappingURL=bitcoin-utility.js.map