import "../styles/transactionFilter.css"

type Props = {
    searchInput: string;
    typeFilter: string;
    sort: string;

    setSearchInput: (value: string) => void;
    onSearch: () => void;
    onTypeChange: (value: string) => void;
    onSortChange: (value: string) => void;
};

function TransactionFilter({
    searchInput,
    typeFilter,
    sort,
    setSearchInput,
    onSearch,
    onTypeChange,
    onSortChange
}: Props) {
    return (
        <div className="transaction-filter">
            <input
                type="text"
                placeholder="Search Category or Description"
                value={searchInput}
                onChange={(e) =>
                    setSearchInput(e.target.value)
                }
            />

            <button
                type="button"
                onClick={onSearch}
            >
                Search
            </button>

            <select
                value={typeFilter}
                onChange={(e) =>
                    onTypeChange(e.target.value)
                }
            >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <select
                value={sort}
                onChange={(e) =>
                    onSortChange(e.target.value)
                }
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">
                    Highest Amount
                </option>
                <option value="lowest">
                    Lowest Amount
                </option>
            </select>
        </div>
    );
}

export default TransactionFilter;