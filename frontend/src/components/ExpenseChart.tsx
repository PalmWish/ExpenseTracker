import { PieChart, Tooltip, Pie, Legend, ResponsiveContainer } from "recharts";
import type { CategoryStat } from "../types/statistics";

type Props = {
    data: CategoryStat[];
};

function ExpenseChart({data}: Props){

    return(
        <div>
            <h2>Expense by Category</h2>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={data}
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
    )
}

export default ExpenseChart;