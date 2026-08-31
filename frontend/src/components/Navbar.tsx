import { useAuth } from "../context/AuthContext";


function Navbar(){
    const { user } = useAuth(); 

    return (
        <nav>
        <h1>Expense Tracker</h1>

        <h3>Welcome, {user?.name}</h3>

        </nav>
    )
}

export default Navbar;