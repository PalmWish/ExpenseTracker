"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.findById = exports.findByEmail = void 0;
const user_1 = __importDefault(require("../models/user"));
const findByEmail = async (email) => {
    return await user_1.default.findOne({ email });
};
exports.findByEmail = findByEmail;
const findById = async (id) => {
    return await user_1.default.findById(id).select("-password");
};
exports.findById = findById;
const createUser = async (name, email, password) => {
    return await user_1.default.create({ name, email, password });
};
exports.createUser = createUser;
const updateUser = async (id, data) => {
    return await user_1.default.findByIdAndUpdate(id, data, {
        new: true
    });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return await user_1.default.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userRepository.js.map