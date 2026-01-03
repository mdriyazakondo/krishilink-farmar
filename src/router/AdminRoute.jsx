import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../pages/Loading/Loading";
import useAuth from "../hook/useAuth";

const AdminRoute = ({ children }) => {
  const { users, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (users?.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
