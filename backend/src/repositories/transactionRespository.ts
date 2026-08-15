import Transaction from "../models/transaction";
import mongoose from "mongoose";

const createTransaction = async (data: any) =>{
    return await Transaction.create(data)
}

const findAll = async (userId: string, filter: any, sort: any, page: number, limit:  number, sortByValue: "highest" | "lowest" | null) =>{
    
    if(sortByValue){
        const transactions = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId), ...filter
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

        const total = await Transaction.countDocuments({userId, ...filter})

        return { transactions, total };
    }
    const transactions = await Transaction.find({ userId, ...filter }).sort(sort).skip((page - 1) * limit).limit(limit)

    const total = await Transaction.countDocuments({userId, ...filter})

    return { transactions, total };
}

const getExpenseByCategory = async (userId: string) => {
    return await Transaction.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
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
    ]) 
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


export {createTransaction, findAll, getExpenseByCategory, findById ,updateTransactions, deleteTransactions,getSummary }