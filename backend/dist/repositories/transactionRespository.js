"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = exports.deleteTransactions = exports.updateTransactions = exports.findById = exports.getExpenseByCategory = exports.findAll = exports.createTransaction = void 0;
const transaction_1 = __importDefault(require("../models/transaction"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTransaction = async (data) => {
    return await transaction_1.default.create(data);
};
exports.createTransaction = createTransaction;
const findAll = async (userId, filter, sort, page, limit, sortByValue) => {
    if (sortByValue) {
        const transactions = await transaction_1.default.aggregate([
            {
                $match: {
                    userId: new mongoose_1.default.Types.ObjectId(userId), ...filter
                }
            },
            {
                $addFields: {
                    sortValue: {
                        $cond: [
                            {
                                $eq: ["$type", "income"]
                            },
                            "$amount",
                            {
                                $multiply: ["$amount", -1]
                            }
                        ]
                    }
                }
            },
            {
                $sort: {
                    sortValue: sortByValue === "highest" ? -1 : 1
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ]);
        const total = await transaction_1.default.countDocuments({ userId, ...filter });
        return { transactions, total };
    }
    const transactions = await transaction_1.default.find({ userId, ...filter }).sort(sort).skip((page - 1) * limit).limit(limit);
    const total = await transaction_1.default.countDocuments({ userId, ...filter });
    return { transactions, total };
};
exports.findAll = findAll;
const getExpenseByCategory = async (userId) => {
    return await transaction_1.default.aggregate([
        {
            $match: {
                userId: new mongoose_1.default.Types.ObjectId(userId),
                type: "expense"
            }
        },
        {
            $group: {
                _id: "$category",
                total: {
                    $sum: "$amount"
                }
            }
        },
        {
            $sort: {
                total: -1
            }
        }
    ]);
};
exports.getExpenseByCategory = getExpenseByCategory;
const findById = async (id, userId) => {
    return transaction_1.default.findOne({
        _id: id,
        userId
    });
};
exports.findById = findById;
const updateTransactions = async (id, userId, data) => {
    return await transaction_1.default.findOneAndUpdate({
        _id: id,
        userId
    }, data, {
        new: true
    });
};
exports.updateTransactions = updateTransactions;
const deleteTransactions = async (id, userId) => {
    return await transaction_1.default.findOneAndDelete({
        _id: id,
        userId
    });
};
exports.deleteTransactions = deleteTransactions;
const getSummary = async (userId) => {
    return await transaction_1.default.aggregate([
        {
            $match: {
                userId: new mongoose_1.default.Types.ObjectId(userId)
            }
        },
        {
            $group: {
                _id: "$type",
                total: {
                    $sum: "$amount"
                }
            }
        }
    ]);
};
exports.getSummary = getSummary;
//# sourceMappingURL=transactionRespository.js.map