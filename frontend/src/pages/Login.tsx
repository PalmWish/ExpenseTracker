import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



function Login(){

    const { login } = useAuth();
    const navigate = useNavigate();
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: any){
        e.preventDefault();

        try{
            const res = await api.post("/auth/login", {
                email,
                password
            })

            login(res.data.token, res.data.user)
            navigate("/dashboard")

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

            <p>Don't have an account? <Link to="/register">Register</Link></p>

        </form>
    )   
        
}

export default Login