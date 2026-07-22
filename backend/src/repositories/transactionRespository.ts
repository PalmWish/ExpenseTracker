import Transaction from "../models/transaction";
import mongoose from "mongoose";

const createTransaction = async (data: any) =>{
    return await Transaction.create(data)
}

const findAll = async (userId: string, filter: any) =>{
    return await Transaction.find({ userId, ...filter }).sort({
        createAt: -1
    })
}

const findById = async (id: string, userId: string) =>{
    return Transaction.findOne({
        _id: id,
        userId
    })
}
const updateTransactions = async (
    id: string,
    userId: string,
    data: Partial<{
        type: string,
        amount: number,
        category: string,
        description: string,
        date: Date
    }>) =>{
        return await Transaction.findOneAndUpdate(
            {
            _id: id,
            userId
            },
        data,
    {
        new: true
    })
    }

const deleteTransactions = async (
    id: string,
    userId: string
) =>{
    return await Transaction.findOneAndDelete({
        _id: id,
        userId
    })
}

const getSummary = async (userId: string) =>{
    return await Transaction.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
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
    ])
}


export {createTransaction, findAll, findById ,updateTransactions, deleteTransactions,getSummary }