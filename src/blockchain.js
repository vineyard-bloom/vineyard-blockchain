"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This file outlines a protocol that is intended to replace the previous types defined in vineyard-blockchain
var blockchain;
(function (blockchain) {
    var TransactionStatus;
    (function (TransactionStatus) {
        TransactionStatus[TransactionStatus["pending"] = 0] = "pending";
        TransactionStatus[TransactionStatus["accepted"] = 1] = "accepted";
        TransactionStatus[TransactionStatus["rejected"] = 2] = "rejected";
    })(TransactionStatus = blockchain.TransactionStatus || (blockchain.TransactionStatus = {}));
})(blockchain = exports.blockchain || (exports.blockchain = {}));
//# sourceMappingURL=blockchain.js.map