import { useState } from "react";
import api from "../api/axios";

function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function newRegister(e: any) {
        e.preventDefault()

        try{
            const res = await api.post("/auth/register", {
                name,
                email,
                password
            })
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <form onSubmit={newRegister}>
            <input
            placeholder="Name"
            value={name}
            onChange={(e) =>{setName(e.target.value)}}
            />

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

            <button>Create</button>
        </form>
    )
}

export default Register;