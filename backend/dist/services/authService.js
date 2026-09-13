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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getIdUser = exports.login = exports.register = void 0;
const userRepository = __importStar(require("../repositories/userRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (name, email, password) => {
    if (!name || !email || !password) {
        throw new Error("Please fill all fields.");
    }
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error("Email already exists!");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    return await userRepository.createUser(name, email, hashedPassword);
};
exports.register = register;
const login = async (email, password) => {
    if (!email || !password) {
        throw new Error("Please fill all fileds.");
    }
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password.");
    }
    const compare = await bcrypt_1.default.compare(password, user.password);
    if (!compare) {
        throw new Error("Invalid email or password.");
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    return { token, user: {
            Id: user._id,
            name: user.name,
            email: user.email
        }
    };
};
exports.login = login;
const getIdUser = async (user_Id) => {
    const idUser = await userRepository.findById(user_Id);
    if (!idUser) {
        throw new Error("Invalid Id.");
    }
    return idUser;
};
exports.getIdUser = getIdUser;
const updateUser = async (user_Id, data) => {
    if (data.password) {
        data.password = await bcrypt_1.default.hash(data.password, 10);
    }
    const user = await userRepository.updateUser(user_Id, data);
    if (!user) {
        throw new Error("User not found.");
    }
    return user;
};
exports.updateUser = updateUser;
const deleteUser = async (userId) => {
    const del = await userRepository.deleteUser(userId);
    if (!del) {
        throw new Error("User not found.");
    }
    return del;
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=authService.js.map