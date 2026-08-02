import api from "../api/axios";

const getTransactions = () =>{
    return api.get("/transactions");
}

const getSummary = () =>{
    return api.get("/transactions/summary");
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

export {getTransactions, getSummary, createTransactions, updateTransactions, deleteTransactions}