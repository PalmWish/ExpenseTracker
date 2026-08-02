import type { Transaction } from "../types/transaction";
import * as transactionService from "../services/transactionService"
import { useState } from "react";
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
        <div>
            <h2>Transaction</h2>

            {error && <p>{error}</p>}

            {transactions.length === 0 ? (
                <p>No transactions yet. Add your first transaction.</p>
            ) : (
                transactions.map((item) => (
                    <div key={item._id}>
                        <p>Category: {item.category}</p>
                        <p>Description: {item.description}</p>
                        <p>
                            Amount: {item.type === "income" ? "+" : "-"}
                            {item.amount}
                        </p>
                        <p>Type: {item.type}</p>
                        <p>
                            Date:{" "}
                            {new Date(item.date).toLocaleDateString()}
                        </p>

                        <hr />

                        <button onClick={() => onEdit(item)}>Edit</button>

                        <button onClick={() => handleDelete(item._id)}>Delete</button>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export {TransactionList, type Transaction};