import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;