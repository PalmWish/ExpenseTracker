import { useEffect, useState } from "react";
import api from "../api/axios";

type Transaction = {
    _id: string;
    type: "income" | "expense";
    amount: number;
    category: string;
    description: string;
    date: string;
};

function TransactionList() {
    console.log("Transaction Render");

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransaction() {
        console.log("Hello");

        try {
            const res = await api.get("/transactions");
            setTransactions(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log("useEffect");
        fetchTransaction();
    }, []);

    return (
        <div>
            <h2>Transaction</h2>

            {transactions.length === 0 ? (
                <p>No Transaction</p>
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
                    </div>
                ))
            )}
        </div>
    );
}

export default TransactionList;