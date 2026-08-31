import { useEffect, useState } from "react";
import * as transactionService from "../services/transactionService";
import type { Transaction } from "../types/transaction";
import type { CategoryStat } from "../types/statistics";

function useDashboard() {
    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        balance: 0
    });

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const [typeFilter, setTypeFilter] = useState("all");
    const [sort, setSort] = useState("newest");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [expenseByCategory, setExpenseByCategory] =
        useState<CategoryStat[]>([]);

    const [editTransaction, setEditTransaction] =
        useState<Transaction | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchSummary() {
        setLoading(true);

        try {
            const res = await transactionService.getSummary();
            setSummary(res.data);
        } catch (err) {
            console.log(err);
            setError("Failed to load summary");
        } finally {
            setLoading(false);
        }
    }

    async function fetchExpenseByCategory() {
        try {
            const res =
                await transactionService.getExpenseByCategory();

            setExpenseByCategory(res.data);
        } catch (err) {
            console.log(err);
            setError("Failed to load expense statistics");
        }
    }

    async function fetchTransactions() {
        try {
            const res =
                await transactionService.getTransactions(
                    search,
                    typeFilter,
                    sort,
                    page
                );

            setTransactions(res.data.transactions);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.log(err);
            setError("Failed to load Transactions");
        }
    }

    function refreshDashboard() {
        fetchSummary();
        fetchTransactions();
        fetchExpenseByCategory();
    }

    function handleSearch() {
        setPage(1);
        setSearch(searchInput);
    }

    function handleTypeChange(type: string) {
        setPage(1);
        setTypeFilter(type);
    }

    function handleSortChange(sortValue: string) {
        setPage(1);
        setSort(sortValue);
    }

    function nextPage() {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        refreshDashboard();
    }, [search, typeFilter, sort, page]);

    return {
        summary,
        transactions,
        searchInput,
        typeFilter,
        sort,
        page,
        totalPages,
        expenseByCategory,
        editTransaction,
        loading,
        error,

        setSearchInput,
        setEditTransaction,

        handleSearch,
        handleTypeChange,
        handleSortChange,

        nextPage,
        previousPage,

        refreshDashboard
    };
}

export default useDashboard;