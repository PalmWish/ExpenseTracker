import Navbar from "../components/Navbar";
import DashboardSummary from "../components/DashBoardSummary"
import ExpenseChart from "../components/ExpenseChart";
import TransactionFilter from "../components/TransactionFilter";
import { TransactionList } from "../components/TransactionList";
import Pagination from "../components/Pagination";
import AddTransaction from "../components/AddTransaction";
import Logout from "../components/Logout";

import useDashboard from "../hooks/useDashBoard";

function Dashboard() {
    const {
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
    } = useDashboard();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <Navbar />

            {error && <p>{error}</p>}

            <DashboardSummary
                income={summary.income}
                expense={summary.expense}
                balance={summary.balance}
            />

            <ExpenseChart
                data={expenseByCategory}
            />

            <TransactionFilter
                searchInput={searchInput}
                typeFilter={typeFilter}
                sort={sort}
                setSearchInput={setSearchInput}
                onSearch={handleSearch}
                onTypeChange={handleTypeChange}
                onSortChange={handleSortChange}
            />

            <TransactionList
                transactions={transactions}
                onDelete={refreshDashboard}
                onEdit={setEditTransaction}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                onPrevious={previousPage}
                onNext={nextPage}
            />

            <AddTransaction
                onSuccess={refreshDashboard}
                editingTransaction={editTransaction}
                clearEditing={() =>
                    setEditTransaction(null)
                }
            />

            <Logout />
        </div>
    );
}

export default Dashboard;