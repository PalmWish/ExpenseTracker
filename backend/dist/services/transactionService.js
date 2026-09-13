"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = exports.remove = exports.update = exports.getById = exports.getExpenseByCategory = exports.getAll = exports.create = void 0;
const transactionRepository = __importStar(require("../repositories/transactionRespository"));
const create = async (userId, type, amount, category, description, date) => {
    if (!type || !amount || !category) {
        throw new Error("Please fill all fields.");
    }
    if (!["income", "expense"].includes(type)) {
        throw new Error("Invalid transaction type.");
    }
    if (amount < 0) {
        throw new Error("Amount must be greater than 0.");
    }
    if (category.trim() === "") {
        throw new Error("Category is required.");
    }
    return await transactionRepository.createTransaction({
        userId,
        type,
        amount,
        category,
        description,
        date
    });
};
exports.create = create;
const getAll = async (userId, query) => {
    const filter = {};
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    let sort = {
        createdAt: -1
    };
    let sortByValue = null;
    if (query.type && query.type !== "all") {
        filter.type = query.type;
    }
    if (query.search) {
        filter.$or = [
            {
                category: {
                    $regex: query.search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: query.search,
                    $options: "i"
                }
            }
        ];
    }
    if (query.sort === "oldest") {
        sort = {
            createdAt: 1
        };
    }
    if (query.sort === "highest") {
        sortByValue = "highest";
    }
    if (query.sort === "lowest") {
        sortByValue = "lowest";
    }
    const result = await transactionRepository.findAll(userId, filter, sort, page, limit, sortByValue);
    const totalPages = Math.ceil(result.total / limit);
    return {
        transactions: result.transactions,
        total: result.total,
        totalPages,
        currentPage: page
    };
};
exports.getAll = getAll;
const getExpenseByCategory = async (userId) => {
    return await transactionRepository.getExpenseByCategory(userId);
};
exports.getExpenseByCategory = getExpenseByCategory;
const getById = async (id, userId) => {
    const transaction = await transactionRepository.findById(id, userId);
    if (!transaction) {
        throw new Error("Transaction not found");
    }
    return transaction;
};
exports.getById = getById;
const update = async (id, userId, data) => {
    const transaction = await transactionRepository.updateTransactions(id, userId, data);
    if (!transaction) {
        throw new Error("Transaction not found.");
    }
    if (data.amount !== undefined && data.amount < 0) {
        throw new Error("Amount must be greater than 0.");
    }
    if (data.type && !["income", "expense"].includes(data.type)) {
        throw new Error("Invalid transaction type.");
    }
    return transaction;
};
exports.update = update;
const remove = async (id, userId) => {
    const transaction = await transactionRepository.deleteTransactions(id, userId);
    if (!transaction) {
        throw new Error("Transaction not found.");
    }
};
exports.remove = remove;
const getSummary = async (userId) => {
    const summary = await transactionRepository.getSummary(userId);
    let income = 0;
    let expense = 0;
    summary.forEach(item => {
        if (item._id == "income") {
            income = item.total;
        }
        if (item._id == "expense") {
            expense = item.total;
        }
    });
    return {
        income,
        expense,
        balance: income - expense
    };
};
exports.getSummary = getSummary;
//# sourceMappingURL=transactionService.js.map