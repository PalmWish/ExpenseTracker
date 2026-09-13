import mongoose from "mongoose";
declare const createTransaction: (data: any) => Promise<mongoose.Document<unknown, {}, {
    date: NativeDate;
    type: "income" | "expense";
    userId: mongoose.Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    type: "income" | "expense";
    userId: mongoose.Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
declare const findAll: (userId: string, filter: any, sort: any, page: number, limit: number, sortByValue: "highest" | "lowest" | null) => Promise<{
    transactions: any[];
    total: number;
}>;
declare const getExpenseByCategory: (userId: string) => Promise<any[]>;
declare const findById: (id: string, userId: string) => Promise<(mongoose.Document<unknown, {}, {
    date: NativeDate;
    type: "income" | "expense";
    userId: mongoose.Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    type: "income" | "expense";
    userId: mongoose.Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
declare const updateTransactions: (id: string, userId: string, data: Partial<{
    type: string;
    amount: number;
    category: string;
    description: string;
    date: Date;
}>) => Promise<(mongoose.Document<unknown, {}, {
    date: NativeDate;
    type: "income" | "expense";
    userId: mongoose.Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    type: "income" | "expense";
    userId: mongoose.Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
declare const deleteTransactions: (id: string, userId: string) => Promise<(mongoose.Document<unknown, {}, {
    date: NativeDate;
    type: "income" | "expense";
    userId: mongoose.Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    type: "income" | "expense";
    userId: mongoose.Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
declare const getSummary: (userId: string) => Promise<any[]>;
export { createTransaction, findAll, getExpenseByCategory, findById, updateTransactions, deleteTransactions, getSummary };
//# sourceMappingURL=transactionRespository.d.ts.map