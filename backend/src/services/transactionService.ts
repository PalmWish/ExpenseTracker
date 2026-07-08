import * as transactionRepository from "../repositories/transactionRespository"

const create =  async (
    userId: string,
    type: string,
    amount: number,
    category:  string,
    description: string,
    date: Date
) =>{

    if(!type || !amount || !category){
        throw new Error("Please fill all fields.")
    }

    return await transactionRepository.createTransaction({
    userId,
    type,
    amount,
    category,
    description,
    date
    })
}

const getAll = async (userId: string) =>{
    return await transactionRepository.findAll(userId)
}

const getById = async (
    id: string,
    userId: string
) =>{
    const transaction = await transactionRepository.findById(id,
        userId
    )

    if(!transaction){
        throw new Error("Transaction not found")
    }

    return transaction
}

const update = async (id: string,
    userId: string,
    data: any
) =>{
    const transaction = await transactionRepository.updateTransactions(
        id,
        userId,
        data
    )
    if(!transaction){
        throw new Error("Transaction not found.")
    }

    return transaction
}

const remove = async (
    id: string,
    userId: string
) =>{

    const transaction = await transactionRepository.deleteTransactions(
        id,
        userId
    )
    if(!transaction){
        throw new Error("Transaction not found.")
    }
}

export { create, getAll, getById, update, remove }