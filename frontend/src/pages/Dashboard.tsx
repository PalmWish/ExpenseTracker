import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import { TransactionList } from "../components/TransactionList"
import type { Transaction } from "../types/transaction";
import type { CategoryStat } from "../types/statistics";
import ExpenseChart from "../components/ExpenseChart";
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
    const [ search, setSearch] = useState("");
    const [ searchInput, setSearchInput] = useState("");
    const [ typeFilter, setTypeFilter] = useState("all");
    const [ sort, setSort] = useState("newest")
    const [ page, setPage] = useState(1)
    const [ totalPages, setTotalPages] = useState(1)
    const [ expenseByCategory, setExpenseByCategory] = useState<CategoryStat[]>([])

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
    async function fetchExpenseByCategory() {
        try{
            const res = await transactionService.getExpenseByCategory()

            setExpenseByCategory(res.data)
        }
        catch (err) {

        setError("Failed to load expense statistics");

    }
    }
    async function fetchTransactions() {
        try{
            const res = await transactionService.getTransactions(search, typeFilter, sort, page);
            setTransactions(res.data.transactions)
            setTotalPages(res.data.totalPages)
        }
        catch(err){
            console.log(err)
            setError("Failed to load Transactions")
        }
    }
    
    function refreshDashboard(){

        fetchSummary();
        fetchTransactions();
        fetchExpenseByCategory();
    }


    useEffect(() =>{
        refreshDashboard();
    }, [search, typeFilter, sort, page]);

    
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

        <ExpenseChart data={expenseByCategory} />

        <input
        type="text"
        placeholder="Search Category or Description"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} />
        <button
        type="button"
        onClick={() =>{
            setPage(1);
            setSearch(searchInput);
        }}>
            Search
        </button>

        <select 
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>

        <select 
        value={sort}
        onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
        </select>

        <TransactionList transactions={transactions} onDelete={refreshDashboard} onEdit={setEditTransaction}/>

        <div>
            <button 
            disabled={page===1}
            onClick={() => setPage(page - 1)}>
                Previous
                </button>

            <span> Page {page} of {totalPages} </span>

            <button
            disabled={page>= totalPages} 
            onClick={() => setPage(page + 1)}
            > Next</button>
        </div>

        <AddTransaction onSuccess={refreshDashboard}
        editingTransaction={editTransaction}
        clearEditing={() => {setEditTransaction(null)}}/>

        <Logout />
        </>
    )
}

export default Dashboard;