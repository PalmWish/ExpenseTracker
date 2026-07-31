import { useAuth } from "../context/AuthContext";

function Navbar(){
    const { user } = useAuth(); 

    return (
        <>
        <h1>Dashboard</h1>

        <h3>Welcome, {user?.name}</h3>

        </>
    )
}

export default Navbar;