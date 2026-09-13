declare const findByEmail: (email: string) => Promise<(import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
declare const findById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
declare const createUser: (name: string, email: string, password: string) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
declare const updateUser: (id: string, data: Partial<{
    name: string;
    email: string;
    password: string;
}>) => Promise<(import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
declare const deleteUser: (id: string) => Promise<(import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    password: string;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
export { findByEmail, findById, createUser, updateUser, deleteUser };
//# sourceMappingURL=userRepository.d.ts.map