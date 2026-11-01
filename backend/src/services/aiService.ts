import { findTransactionForChat, getExpenseByCategory } from "../repositories/aiRepositories";
import gemini from "../config/gemini";

type Period = "last month" | "this month";
type GeminiMessage ={
    message: string;
    financialContext: {
        period: string;
        transactionsCount: number;
        income: number;
        expense: number;
        balance: number;
        topCategories: {
            category: string;
            total: number;
        }[];
    }
}

function getDateRange(period: Period){
    const parts = Intl.DateTimeFormat("en-US",{
        timeZone: "Asia/Bangkok",
        year: "numeric",
        month: "2-digit"
    }).formatToParts(new Date())

    console.log(parts)
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

const compareMonthlyExpenses = async (userId: string) =>{
    const current = await getFinancialContext(userId, "this month")
    const previous = await getFinancialContext(userId, "last month")

    const difference = current.expense - previous.expense

    const percentageChange = `${previous.expense === 0 ? null : (difference / previous.expense) * 100}%` 

    return{
        currentMonth: {
            period: current.period,
            expense: current.expense
        },
        previousMonth: {
            period: previous.period,
            expense: previous.expense
        },
        difference,
        percentageChange,
        trend: difference > 0 ? "increased" : difference < 0 ? "decreased" : "unchanged"
    }
}

const compareExpenseCategories = async (userId: string) =>{
    const currentRange = getDateRange("this month")
    const previousRange = getDateRange("last month")

    const [currentCategories, previousCategories] = await Promise.all([
        getExpenseByCategory({
            userId,
            ...currentRange
        }),
        getExpenseByCategory({
            userId,
            ...previousRange
        })
    ]);

    const categoryMap = new Map<
        string,
        { current: number; previous: number }
    >();

    for (const item of currentCategories) {
        categoryMap.set(item._id, {
            current: item.total,
            previous: 0
        });
    }

    for (const item of previousCategories) {
        const existing = categoryMap.get(item._id);

        categoryMap.set(item._id, {
            current: existing?.current ?? 0,
            previous: item.total
        });
    }

    return Array.from(categoryMap, ([category, amounts]) => {
        const difference = amounts.current - amounts.previous;

        return {
            category,
            currentExpense: amounts.current,
            previousExpense: amounts.previous,
            difference,
            trend:
                difference > 0
                    ? "increased"
                    : difference < 0
                        ? "decreased"
                        : "unchanged"
        };
    }).sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));
};


const askGemini = async ({
    message,
    financialContext
}: GeminiMessage) => {
    try {
        const response = await gemini.models.generateContent({
            model: "gemini-3.6-flash",
            contents: `
                คุณคือ AI Financial Assistant ของ ExpenseTracker

                ข้อมูลการเงิน:
                ${JSON.stringify(financialContext, null, 2)}

                คำถาม:
                ${message}

                ตอบเป็นภาษาไทย ใช้ข้อมูลที่ได้รับเท่านั้น
                ห้ามแต่งตัวเลขขึ้นมาเอง
            `
        });

        if (!response.text) {
            throw new Error("Gemini returned an empty response");
        }

        return response.text;

    } catch (error: any) {
        console.error("Gemini API Error:", {
            status: error.status,
            message: error.message
        });

        if (error.status === 503 || error.status === 429) {
            throw new Error("AI_SERVICE_TEMPORARILY_UNAVAILABLE");
        }

        throw error;
    }
};

const askGeminiForExpenseComparison = async (comparisonData: {
        currentMonth: {
            period: string;
            expense: number;
        };
        previousMonth: {
            period: string;
            expense: number;
        };
        comparison: {
            difference: number;
            percentageChange: number | null;
            trend: string;
        };
        categoryComparison: {
            category: string;
            currentExpense: number;
            previousExpense: number;
            difference: number;
            trend: string;
        }[];
    }
) => {
    const prompt = `
คุณคือผู้ช่วยวิเคราะห์การเงินส่วนบุคคล

จงวิเคราะห์ข้อมูลรายจ่ายรายเดือนต่อไปนี้:
${JSON.stringify(comparisonData, null, 2)}

ข้อกำหนด:
1. ตอบเป็นภาษาไทยที่เข้าใจง่าย
2. อธิบายว่ารายจ่ายรวมเพิ่มขึ้นหรือลดลงเท่าไร
3. ระบุหมวดหมู่ที่มีการเปลี่ยนแปลงมากที่สุด
4. เสนอแนวทางลดรายจ่ายที่ทำได้จริง 2-3 ข้อ
5. ใช้ตัวเลขจากข้อมูลที่ให้มาเท่านั้น
6. หากข้อมูลไม่เพียงพอ ให้ระบุว่าไม่สามารถสรุปได้
7. ไม่รวมรายรับในการวิเคราะห์
`;

     const response = await gemini.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    return response.text;
};

export {getFinancialContext, compareMonthlyExpenses, compareExpenseCategories, askGemini, askGeminiForExpenseComparison}