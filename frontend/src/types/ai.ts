type financialContext = {
    period: string;
    startDate: string;
    endDate: string;
    transactionCount: number;
    income: number;
    expense: number;
    balance: number;
    topCategories: {
        categories: string;
        amount: number;
    }[];
}

type FinancialResponse = {
    message: string;
    financialContext: financialContext;
    reply: string;
}

type FinancialChatPayload = {
    message: string;
    period: "this month" | "last month";
}

export type {financialContext, FinancialResponse, FinancialChatPayload}