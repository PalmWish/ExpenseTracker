import User from "../models/user";

const findByEmail = async (email: string) => {
    return await User.findOne({ email });
}

const findById = async (id: string) => {
    return await User.findById(id);
}

const createUser = async (
    name: string,
    email: string,
    password: string
) => {
    return await User.create({name, email, password});
}

const updateUser= async (
    id: string,
    data: Partial<{
        name: string,
        email: string,
        password: string
    }>
) => {
    return await User.findByIdAndUpdate(id,data,{
        new: true
    })
}

const deleteUser = async (id: string) => {
    return await User.findByIdAndDelete(id)
}

export { findByEmail, findById, createUser, updateUser, deleteUser}