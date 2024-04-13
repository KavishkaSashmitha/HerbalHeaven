import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ manager }) => {
  const { isLoggedIn } = useAuth();
  const localstorage = localStorage.getItem("manager");
  const isManager = (JSON.parse(localstorage)?.jobrole ?? "") === "Manager";

  return manager ? (
    isManager ? (
      <Outlet />
    ) : (
      <Navigate to="/otp" />
    )
  ) : isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
