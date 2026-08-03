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

    if(!["income", "expense"].includes(type)){
        throw new Error("Invalid transaction type.")
    }
    
    if(amount < 0){
        throw new Error("Amount must be greater than 0.")
    }

    if(category.trim() === ""){
        throw new Error("Category is required.")
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

const getAll = async (userId: string, query: any) =>{
    
    const filter: any = {};

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 5;

    let sort: any ={
        createdAt: -1
    }

    if(query.type && query.type !== "all"){
        filter.type = query.type
    }

    if(query.search){

        filter.$or = [
            {
                category: {
                    $regex: query.search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: query.search,
                    $options: "i"
                }
            }
        ];
    }

    if(query.sort === "oldest"){
            sort = {
                createdAt: 1
            }
        }

        if(query.sort === "highest"){
            sort = {
                amount: -1
            }
        }

        if(query.sort === "lowest"){
            sort = {
                amount: 1
            }
        }

    return await transactionRepository.findAll(userId, filter, sort, page, limit)
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

    if(data.amount !== undefined && data.amount < 0){
        throw new Error("Amount must be greater than 0.")
    }

    if(data.type && !["income", "expense"].includes(data.type)){
        throw new Error("Invalid transaction type.")
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

const getSummary = async (userId: string) =>{

    const summary = await transactionRepository.getSummary(userId)

    let income = 0;
    let expense = 0;

    summary.forEach(item =>{

        if(item._id == "income"){
            income = item.total;
        }

        if(item._id == "expense"){
            expense = item.total;
        }
    })   
    
    return {
        income,
        expense,
        balance: income - expense
    }
}

export { create, getAll, getById, update, remove, getSummary }