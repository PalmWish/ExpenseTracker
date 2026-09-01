import SummaryCard from "./SummaryCard";
import "../styles/dashboardSummary.css"

type Props = {
    income: number;
    expense: number;
    balance: number;
};

function DashboardSummary({
    income,
    expense,
    balance
}: Props) {
    return (
        <div className="summary-container">
            <SummaryCard
                title="Income"
                amount={income}
            />

            <SummaryCard
                title="Expense"
                amount={expense}
            />

            <SummaryCard
                title="Balance"
                amount={balance}
            />
        </div>
    );
}

export default DashboardSummary;