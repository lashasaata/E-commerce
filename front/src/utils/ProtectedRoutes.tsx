import { Navigate, Outlet } from "react-router-dom";
import { Mycontext } from "../App";
import { useContext } from "react";
import NavBar from "../components/NavBar";

const ProtectedRoutes = () => {
  const { user } = useContext(Mycontext);
  //   console.log(user);

  //    Object.keys(user).length > 0

  return Object.keys(user).length > 0 ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
