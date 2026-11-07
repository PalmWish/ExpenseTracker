import api from "../api/axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

const login = async (data: LoginPayload) => {
    const response = await api.post("/auth/login", data);
    return response.data
}

const register = async (data: LoginPayload) => {
    const response = await api.post("/auth/register", data);
    return response.data
}

const getProfile = async (data: LoginPayload) => {
    const response = await api.post("/auth/profile", data);
    return response.data
}

export {login, register, getProfile};