import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type User = {
    _id: string,
    name: string,
    email: string
}

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({children}: {children: ReactNode}){
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() =>{
        const storedToken = localStorage.getItem("token");
        const storedUser= localStorage.getItem("user");

        if(storedToken){
            setToken(storedToken);
        }

        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    },[])

    function login(token: string, user: User){
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user))


        setToken(token);
        setUser(user)
    }

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        setToken(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider
        value={{ token, user, login, logout}}> {children} </AuthContext.Provider>
    )
}

function useAuth(){
    const context =useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context;
}

export { AuthProvider, useAuth }