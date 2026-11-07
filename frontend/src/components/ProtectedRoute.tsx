import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth} from "../context/AuthContext";
import "../styles/protectedRoute.css"

type Props = {
    children: ReactNode;
};

function ProtectedRoute({ children }: Props){

    const {token, isLoading} = useAuth();

    if (isLoading) {
        return <div className="load"><p>Loading...</p>;</div>
    }

    if(!token){
        return <Navigate to="/" replace />
    }
    return children;
}

export default ProtectedRoute;