import { PieChart, Tooltip, Pie, Legend, ResponsiveContainer, Cell } from "recharts";
import type { CategoryStat } from "../types/statistics";
import "../styles/expenseChart.css"

type Props = {
    data: CategoryStat[];
};

function ExpenseChart({data}: Props){
    const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899"
]
    const chartData = data.map((item,index) =>({
        ...item, 
        fill: COLORS[index % COLORS.length]
    }))
    return(
        <section className="expense-chart">
        <div className="chart-container">
            <h2>Expense by Category</h2>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={chartData}
                    dataKey="total"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label/>

                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    </section>
)}

export default ExpenseChart;