import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles?: string[];
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const token = useSelector((state: any) => state.token);
    if (!token) {
        return <Navigate to="/login" />
    }

    const decoded: any = jwtDecode(token);
    const userRole = decoded.accountType; // hoặc decoded.role tùy hệ thống
    console.log("Decoded role", decoded);
    console.log("Role in token:", userRole);
    console.log("Allowed roles:", allowedRoles);
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
export default ProtectedRoute;