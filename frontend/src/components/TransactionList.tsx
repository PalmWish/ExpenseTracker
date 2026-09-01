import type { Transaction } from "../types/transaction";
import * as transactionService from "../services/transactionService"
import { useState } from "react";
import "../styles/transactionList.css"

type Props ={
    transactions: Transaction[];
    onDelete: () => void;
    onEdit: (transaction: Transaction) => void;
}

function TransactionList({transactions, onDelete, onEdit}: Props) {

    const [error, setError] = useState("");

    async function handleDelete(id: string) {
        const confirmDelete = window.confirm("Delete this transaction?");

        if(!confirmDelete) return;
        try{
            await transactionService.deleteTransactions(id)

            onDelete();
        }
        catch(err){
            console.log(err)
            setError("Delete failed")
        }

    }
    return (
        <div className="transaction-list">

            <h2>Transaction</h2>

        <div className="transaction-table">
            {error && <p>{error}</p>}

            {transactions.length === 0 ? (
                <p className="no-transaction">No transactions yet. Add your first transaction.</p>
            ) : (
                transactions.map((item) => (
                    <div key={item._id} className="transaction-row">
                        <div className="transaction-info">

                            <p className="transaction-category"> {item.category}</p>
                            <p className="transaction-description"> {item.description || "-" }</p>
                            <p className="transaction-date"> {new Date(item.date).toDateString()}</p>

                        </div>

                    <div className="transaction-type">
                        <p className={item.type==="income"?"transaction-income":"transaction-expense"}>
                            {item.type==="income"?"+":"-"}{item.amount.toLocaleString()}฿
                        </p>

                        <p className="transaction-type-text">{item.type}</p>
                    </div>

                    <div className="transaction-action">

                        <button className="edit-button" onClick={() => onEdit(item)}>Edit</button>

                        <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                 </div>
                ))
            )}
            </div>
        </div>
    );
}

export {TransactionList, type Transaction};