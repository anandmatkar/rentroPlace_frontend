import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthMiddleware() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("user-token");

  return isAuthenticated || user || token ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
}

export default AuthMiddleware;
