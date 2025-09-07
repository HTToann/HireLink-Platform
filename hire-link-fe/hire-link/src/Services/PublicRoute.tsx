import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


interface PublicRouteProps {
    children: JSX.Element;
}
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const token = useSelector((state: any) => state.token);
    if (token) {
        return <Navigate to="/" />
    }

    return children;
}
export default PublicRoute;