import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard(){
    const { logout, user } = useAuth();
    const navigate = useNavigate(); 

    function handleLogout(){
        logout();
        navigate("/");
    }

    return (
        <>
        <h1>Dashboard</h1>

        <h3>Welcome, {user?.name}</h3>

        <button type="button" onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Dashboard;