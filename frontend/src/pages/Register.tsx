import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Register(){

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function newRegister(e: any) {
        e.preventDefault()

        try{
            await api.post("/auth/register", {
                name,
                email,
                password
            })
            alert("Register success!")

            navigate("/")
        }
        catch(err){
            console.log(err)
            alert("Register failed")
        }
    }
    return(
        <form onSubmit={newRegister}>
            <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) =>{setName(e.target.value)}}
            />

            <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) =>{setEmail(e.target.value)}}
            />

            <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) =>{setPassword(e.target.value)}}
            />

            <button>Create</button>

            <Link to="/">
                <button>Back to login page</button>
            </Link>
        </form>
    )
}

export default Register;