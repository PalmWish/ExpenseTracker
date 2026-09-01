import "../styles/summarycard.css";

type Props = {
    title: string;
    amount: number;
};

function SummaryCard({ title, amount }: Props) {

    const typeClass =
        title === "Income"
            ? "income"
            : title === "Expense"
            ? "expense"
            : "balance";

    return (
        <div className={`summary-card ${typeClass}`}>

            <div className="summary-card-header">
                <h2>{title}</h2>
            </div>

            <div className="summary-card-body">
                <p>
                    ฿{amount.toLocaleString()}
                </p>
            </div>

        </div>
    );
}

export default SummaryCard;