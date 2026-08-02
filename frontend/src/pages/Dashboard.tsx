import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import { TransactionList } from "../components/TransactionList"
import type { Transaction } from "../types/transaction";
import Logout from "../components/Logout";
import AddTransaction from "../components/AddTransaction";
import { useEffect, useState } from "react";
import * as transactionService from "../services/transactionService"

function Dashboard(){

    const [ summary, setSummary] = useState({
        income: 0,
        expense: 0,
        balance: 0
    })

    const [ transactions, setTransactions] = useState<Transaction[]>([]);

    const [editTransaction, setEditTransaction ] = useState<Transaction | null >(null);

    const [ loading, setLoading ] = useState(false);

    const [ error, setError] = useState("");

    async function fetchSummary() {
        
        setLoading(true);

        try{
            const res = await transactionService.getSummary();
            setSummary(res.data)
        }
        catch(err){
            console.log(err)
            setError("Failed to load summary")
    }
        finally{
            setLoading(false)
        }
}
    async function fetchTransactions() {
        try{
            const res = await transactionService.getTransactions();
            setTransactions(res.data)
        }
        catch(err){
            console.log(err)
            setError("Failed to load Transactions")
        }
    }
    
    function refreshDashboard(){

        fetchSummary();
        fetchTransactions();
    }
    useEffect(() =>{
        refreshDashboard();
    }, []);

    if (loading) {
    return <h2>Loading...</h2>;
}

    return (
        <>
        <Navbar />
        
        {error && <p>{error}</p>}
        
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
        <TransactionList transactions={transactions} onDelete={refreshDashboard} onEdit={setEditTransaction}/>

        <AddTransaction onSuccess={refreshDashboard}
        editingTransaction={editTransaction}
        clearEditing={() => {setEditTransaction(null)}}/>

        <Logout />
        </>
    )
}

export default Dashboard;