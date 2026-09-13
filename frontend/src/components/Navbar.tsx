import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";
import "../styles/navbar.css"
import "../styles/logout.css"

function Navbar(){
    const { user } = useAuth(); 

    return (
    <nav>
        <h1>Expense Tracker</h1>

        <div className="profile">
        
        <h3>Welcome, {user?.name}</h3>

        <Logout/>
        
        </div>
    </nav>
    )
}

export default Navbar;