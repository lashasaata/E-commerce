import "./App.css";
import data from "../data.json";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import NavBAr from "./components/NavBar";
import Collections from "./components/Collections";
import Product from "./components/Product";
import { Auth } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { getUser } from "./services/auth";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { boolean } from "yup";

type MyContextType = {
  useData: any;
  setUsedata: React.Dispatch<React.SetStateAction<any>>;
  navigate: ReturnType<typeof useNavigate>;
  cartList: any;
  setCartList: React.Dispatch<React.SetStateAction<any>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<any>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
};

// Apply the type to the context
export const Mycontext = createContext<MyContextType>({
  useData: {},
  setUsedata: () => {},
  navigate: () => {},
  cartList: [],
  setCartList: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => "",
  user: {},
  setUser: () => {},
  loading: true,
});

function App() {
  const [user, setUser] = useState(() => {
    try {
      return localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {};
    } catch {
      return {};
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(user);
  console.log(isAuthenticated);
  // useEffect(() => {
  //   const cookies = document.cookie.split("; ");
  //   const token = cookies.find((row) => row.startsWith("jwt="));
  //   if (!token) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(isAuthenticated);
  //   if (isAuthenticated) {
  //     const user = getUser();
  //     setUser(user);
  //   }
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   const restoreUser = async () => {
  //     try {
  //       const fetchedUser = await getUser();
  //       if (fetchedUser && Object.keys(fetchedUser).length > 0) {
  //         setUser(fetchedUser);
  //         setIsAuthenticated(true);
  //       } else {
  //         setUser({});
  //         setIsAuthenticated(false);
  //       }
  //     } catch (err) {
  //       console.error("Error restoring user:", err);
  //       setIsAuthenticated(false);
  //     } finally {
  //       setLoading(false); // ✅ Done loading
  //     }
  //   };
  //   if (loading) restoreUser();
  // }, []);

  const [useData, setUsedata] = useState(() => {
    const savedData = localStorage.getItem("data");
    try {
      return savedData ? JSON.parse(savedData) : data;
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
      return data; // Fallback to default data if parsing fails
    }
  });
  // console.log(useData);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(useData));
  }, [useData]);

  const [cartList, setCartList] = useState(() => {
    return localStorage.cartList ? JSON.parse(localStorage.cartList) : false;
  });
  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);
  const navigate = useNavigate();

  return (
    <div
    // className="lg:flex lg:flex-col lg:gap-[90px] lg:px-[75px] xl:px-[165px]"
    >
      <Mycontext.Provider
        value={{
          useData,
          setUsedata,
          navigate,
          cartList,
          setCartList,
          isAuthenticated,
          setIsAuthenticated,
          user,
          setUser,
          loading,
        }}
      >
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={"/"} />
              ) : (
                <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] flex items-center justify-center p-3 sm:p-4">
                  <div className="w-full max-w-sm sm:max-w-md">
                    <div className="text-center mb-6 sm:mb-8">
                      <h1 className="text-2xl sm:text-3xl font-semibold text-[#f97316] mb-2">
                        ShopCart
                      </h1>
                      <p className="text-sm sm:text-base text-[#6b7280]">
                        Your favorite e-commerce destination
                      </p>
                    </div>
                    <Login />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] flex items-center justify-center p-3 sm:p-4">
                  <div className="w-full max-w-sm sm:max-w-md">
                    <div className="text-center mb-6 sm:mb-8">
                      <h1 className="text-2xl sm:text-3xl font-semibold text-[#f97316] mb-2">
                        ShopCart
                      </h1>
                      <p className="text-sm sm:text-base text-[#6b7280]">
                        Your favorite e-commerce destination
                      </p>
                    </div>
                    <Register />
                  </div>
                </div>
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Collections value={"Collections"} />} />
            <Route path="/:id" element={<Product />} />
            <Route path="/Men" element={<Collections value={"Men"} />} />
            <Route path="/Women" element={<Collections value={"Women"} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Mycontext.Provider>
    </div>
  );
}

export default App;
