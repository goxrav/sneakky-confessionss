import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../contexts/AdminAuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAdminAuth();
if (!isLoggedIn) {
  return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;
