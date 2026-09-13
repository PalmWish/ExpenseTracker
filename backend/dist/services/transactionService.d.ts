declare const create: (userId: string, type: string, amount: number, category: string, description: string, date: Date) => Promise<import("mongoose").Document<unknown, {}, {
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
declare const getAll: (userId: string, query: any) => Promise<{
    transactions: any[];
    total: number;
    totalPages: number;
    currentPage: number;
}>;
declare const getExpenseByCategory: (userId: string) => Promise<any[]>;
declare const getById: (id: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, {
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
declare const update: (id: string, userId: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
declare const remove: (id: string, userId: string) => Promise<void>;
declare const getSummary: (userId: string) => Promise<{
    income: number;
    expense: number;
    balance: number;
}>;
export { create, getAll, getExpenseByCategory, getById, update, remove, getSummary };
//# sourceMappingURL=transactionService.d.ts.map