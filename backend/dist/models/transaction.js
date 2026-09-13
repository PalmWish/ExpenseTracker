"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Transaction", transactionSchema);
//# sourceMappingURL=transaction.js.map