import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TransactionList from "../components/TransactionList"
import Logout from "../components/Logout";
import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard(){

    const [ summary, setSummary] = useState({
        income: 0,
        expense: 0,
        balance: 0
    })

    async function fetchSummary() {
        try{
            const res = await api.get("/transactions/summary")
            setSummary(res.data)
        }
        catch(err){
        console.log(err)
    }
} 
    
        useEffect(() =>{
        fetchSummary();
    }, [])

    return (
        <>
        <Navbar />
        
        <div>
            <SummaryCard
             title="Income"
             amount={summary.income} />

             <SummaryCard
             title="Expense"
             amount={summary.expense} />

             <SummaryCard
             title="Balance"
             amount={summary.balance} />
        </div>
        <TransactionList />
        <button>Add Transaction</button>

        <Logout />
        </>
    )
}

export default Dashboard;