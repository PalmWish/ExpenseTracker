import api from "../api/axios";

const getTransactions = (search: string, type: string, sort: string, page: number) =>{
    return api.get("/transactions",{
        params: {
            search,
            type,
            sort,
            page,
            limit: 5
        }
    });
}

const getSummary = () =>{
    return api.get("/transactions/summary");
}

const getExpenseByCategory = () => {
    return api.get("/transactions/statistics/category")
}

const createTransactions = (data: any) =>{
    return api.post("/transactions", data);
}

const updateTransactions = (id: string, data: any) =>{
    return api.put(`/transactions/${id}`, data);
}

const deleteTransactions = (id : string) =>{
    return api.delete(`/transactions/${id}`);
}

export {getTransactions, getSummary, getExpenseByCategory, createTransactions, updateTransactions, deleteTransactions }