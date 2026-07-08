import Transaction from "../models/transaction";

const createTransaction = async (data: any) =>{
    return await Transaction.create(data)
}

const getTransactions = async (userId: string) =>{
    return await Transaction.find({ userId }).sort({
        date: -1
    })
}

const updateTransactions = async (
    id: string,
    data: any) =>{
        return await Transaction.findByIdAndUpdate(id, data,{new: true})
    }

const deleteTransactions = async (id: string) =>{
    return await Transaction.findByIdAndDelete(id)
}

export {createTransaction, getTransactions, updateTransactions, deleteTransactions }