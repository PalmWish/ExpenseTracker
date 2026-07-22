import { useState } from "react";
import api from "../api/axios";



function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: any){
        e.preventDefault();

        try{
            const res = await api.post("/auth/login", {
                email,
                password
            })

            localStorage.setItem("token", res.data.token)

            console.log("Login Success!")
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <input
            placeholder="Email"
            value={email}
            onChange={(e) =>{setEmail(e.target.value)}}
            />

            <input
            placeholder="Password"
            value={password}
            onChange={(e) =>{setPassword(e.target.value)}}
            />

            <button>Login</button>
        </form>
    )   
        
}

export default Login