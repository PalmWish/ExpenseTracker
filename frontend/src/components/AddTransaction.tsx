import { useEffect, useState } from "react"
import type { Transaction } from "../types/transaction";
import * as transactionService from "../services/transactionService"
import "../styles/addtransaction.css"

type Props = {
    onSuccess: () => void;
    editingTransaction: Transaction | null;
    clearEditing: () => void;
}

function AddTransaction({ onSuccess, editingTransaction, clearEditing }: Props){
    const [type, setType] = useState("expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ error, setError] = useState("");
    

     useEffect(() =>{
        if(editingTransaction){
            setType(editingTransaction.type);
            setAmount(editingTransaction.amount.toString());
            setCategory(editingTransaction.category);
            setDescription(editingTransaction.description);
        }
    }, [editingTransaction])
    async function handleSubmit(e: any) {
        e.preventDefault();

        setLoading(true)

        try{
            if (editingTransaction) {
                await transactionService.updateTransactions(
                editingTransaction._id,
                {
                    type,
                    amount: Number(amount),
                    category,
                    description,
        }
    );
}           else {
                await transactionService.createTransactions({
                    type,
                    amount: Number(amount),
                    category,
                    description,
    });
}
        
            setAmount("");
            setCategory("");
            setDescription("");
            setType("expense");

            clearEditing();

            onSuccess();
        }
        catch(err){
        console.log(err)
        setError("Failed to save Transaction")
    }
        finally{
            setLoading(false)
        }
   
    } 

    return(
        
        <div id="add-transaction" className="add-transaction">

        
        <form onSubmit={handleSubmit}>

            <div className="option-clear">
            {error && <p className="form-error">{error}</p>}
            <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-group">                
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
     
        {(amount !== "" || category !== "" || description !== "") && 
        (<button type="button"
                 className="clear-all-button"
                 onClick={() =>{setAmount("");
                                setCategory("")
                                setDescription("");}}>
                                    clear all
                </button>)}
            </div>

    <div className="form">
        <div className="form-group">
            <input 
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}/>
        </div>

        <div className="form-group">
            <input 
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}/>
        </div>

        <div className="form-group">
            <input 
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
        </div>
    </div>

            <button disabled={loading} className="submit-button">
    {loading ? "Saving..." : (editingTransaction ? "Update Transaction" : "Add Transaction")}
</button>
        </form>

        </div>
    )
}

export default AddTransaction;