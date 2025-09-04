import { Navigate, Outlet } from "react-router-dom";
import { Mycontext } from "../App";
import { useContext } from "react";
import NavBar from "../components/NavBar";

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useContext(Mycontext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
