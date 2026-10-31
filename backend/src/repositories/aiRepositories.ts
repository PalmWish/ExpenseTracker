import { Types } from "mongoose";
import transaction from "../models/transaction";

type transactionQuery = {
    userId: string;
    startDate: Date;
    endDate: Date
} 

const findTransactionForChat = async ({userId, startDate, endDate}: transactionQuery) =>{
    if(!Types.ObjectId.isValid(userId)){
        throw new Error("Invalid user ID")
    }
    return transaction.find({userId,
        date: {
            $gte: startDate,
            $lt: endDate
        }
    }).select("type amount category description date").sort({date: -1}).lean()
}

export {findTransactionForChat}