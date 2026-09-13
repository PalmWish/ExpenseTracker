import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
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
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, Omit<import("mongoose").DefaultSchemaOptions, "timestamps"> & {
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
}, unknown, {
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    date: NativeDate;
    type: "income" | "expense";
    userId: import("mongoose").Types.ObjectId;
    amount: number;
    category: string;
    description?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=transaction.d.ts.map