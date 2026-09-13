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
exports.deleteUser = exports.updateUser = exports.idUser = exports.profile = exports.loginChecking = exports.authChecking = void 0;
const authService = __importStar(require("../services/authService"));
const authChecking = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.authChecking = authChecking;
const loginChecking = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.loginChecking = loginChecking;
const profile = async (req, res) => {
    return res.json({
        message: "Authenticated",
        userId: req.userId
    });
};
exports.profile = profile;
const idUser = async (req, res) => {
    try {
        const user = await authService.getIdUser(req.userId);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.idUser = idUser;
const updateUser = async (req, res) => {
    try {
        const user = await authService.updateUser(req.userId, req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await authService.deleteUser(req.userId);
        res.status(200).json({
            message: "Account deleted successfully!"
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=authController.js.map