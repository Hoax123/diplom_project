import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function RequireRole({ allowedRoles, children }) {
    const { user, token } = useSelector((state) => state.auth);

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

   if (!allowedRoles.includes(user.role)) {
       return <div style={{ padding: "2rem", fontSize: "1.2rem" }}>У вас нет прав на доступ к этой странице</div>
   }

   return children
}
