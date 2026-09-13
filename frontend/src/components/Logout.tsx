import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Logout(){
    const { logout } = useAuth();
    const navigate = useNavigate(); 

    function handleLogout(){
        logout();
        navigate("/");
    }
    return(

        <button type="button" onClick={handleLogout} className="logout">Logout</button>
    )   
}

export default Logout;