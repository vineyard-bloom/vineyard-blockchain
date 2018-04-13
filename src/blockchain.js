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
        TransactionStatus[TransactionStatus["unknown"] = 3] = "unknown";
    })(TransactionStatus = blockchain.TransactionStatus || (blockchain.TransactionStatus = {}));
    var ContractType;
    (function (ContractType) {
        ContractType[ContractType["unknown"] = 0] = "unknown";
        ContractType[ContractType["token"] = 1] = "token";
    })(ContractType = blockchain.ContractType || (blockchain.ContractType = {}));
})(blockchain = exports.blockchain || (exports.blockchain = {}));
