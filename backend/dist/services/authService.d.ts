declare const register: (name: string, email: string, password: string) => Promise<import("mongoose").Document<unknown, {}, {
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
declare const login: (email: string, password: string) => Promise<{
    token: string;
    user: {
        Id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
    };
}>;
declare const getIdUser: (user_Id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
declare const updateUser: (user_Id: string, data: {
    name: string;
    email: string;
    password: string;
}) => Promise<import("mongoose").Document<unknown, {}, {
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
declare const deleteUser: (userId: string) => Promise<import("mongoose").Document<unknown, {}, {
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
export { register, login, getIdUser, updateUser, deleteUser };
//# sourceMappingURL=authService.d.ts.map