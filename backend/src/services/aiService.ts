import { findTransactionForChat } from "../repositories/aiRepositories";

type Period = "last month" | "this month";

function getDateRange(period: Period){
    const parts = Intl.DateTimeFormat("en-US",{
        timeZone: "Asia/Bangkok",
        year: "numeric",
        month: "2-digit"
    }).formatToParts(new Date())

    const year = Number(parts.find(p => p.type === "year")?.value)
    const month = Number(parts.find(p => p.type === "month")?.value)

    const targetMonth = period === "this month" ? month - 1 : month - 2

    const startDate = new Date(Date.UTC(year, targetMonth, 1) - 7 * 60 * 60 * 1000)
    const endDate = new Date(Date.UTC(year, targetMonth + 1, 1) - 7 * 60 * 60 * 1000)

    return{
        startDate,
        endDate
    }
}

const getFinancialContext = async (userId :string, period: Period) => {

    const {startDate, endDate} = getDateRange(period);

    const transactions = await findTransactionForChat({userId, startDate, endDate})

    let income = 0;
    let expense = 0;

    const categoryTotal: Record<string, number> = {};

    for(const transaction of transactions){
        if(transaction.type === "income"){
            income += transaction.amount
        }
        else if(transaction.type === "expense"){
            expense += transaction.amount
        }

        categoryTotal[transaction.category] = (categoryTotal[transaction.category] || 0) + transaction.amount
    }

    const topCategories = Object.entries(categoryTotal).map(([category,total]) => ({category, total})).sort((a,b) => b.total - a.total).slice(0,5);

    return{
        period,
        startDate,
        endDate,
        transactionsCount: transactions.length,
        income,
        expense,
        balance: income - expense,
        topCategories
    }
}

export {getFinancialContext}