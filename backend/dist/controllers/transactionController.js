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
exports.summary = exports.remove = exports.update = exports.getById = exports.getExpenseByCategory = exports.getAll = exports.create = void 0;
const transactionService = __importStar(require("../services/transactionService"));
const create = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;
        const transaction = await transactionService.create(req.userId, type, amount, category, description, date);
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.create = create;
const getAll = async (req, res) => {
    try {
        const transaction = await transactionService.getAll(req.userId, req.query);
        res.status(200).json(transaction);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.getAll = getAll;
const getExpenseByCategory = async (req, res) => {
    try {
        const result = await transactionService.getExpenseByCategory(req.userId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.getExpenseByCategory = getExpenseByCategory;
const getById = async (req, res) => {
    try {
        const transaction = await transactionService.getById(req.params.id, req.userId);
        res.status(200).json(transaction);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.getById = getById;
const update = async (req, res) => {
    try {
        const transaction = await transactionService.update(req.params.id, req.userId, req.body);
        res.status(200).json({ transaction,
            message: "updated successfully!" });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const transaction = await transactionService.remove(req.params.id, req.userId);
        res.status(200).json({
            message: "Transaction deleted successfully."
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.remove = remove;
const summary = async (req, res) => {
    try {
        const result = await transactionService.getSummary(req.userId);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.summary = summary;
//# sourceMappingURL=transactionController.js.map