import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allow = [] }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const fallbackPath = allow.includes("admin") ? "/admin/login" : "/login";
    return <Navigate to={fallbackPath} replace state={{ from: location }} />;
  }

  if (allow.length > 0 && !allow.includes(user.role)) {
    const fallbackPath = user.role === "admin" ? "/admin" : "/";
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}

export default ProtectedRoute;
