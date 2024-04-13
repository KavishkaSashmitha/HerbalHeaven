import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [isAdminLog, setIsAdminLog] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");

    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    setLoggedIn(true);
    localStorage.setItem("userToken", newToken);
  };

  const logout = () => {
    setToken(null);
    setLoggedIn(false);
    setIsAdminLog(false);
    setCart([]);
    localStorage.removeItem("userToken");
  };

  const isAdmin = () => {
    return isAdminLog;
  };

  const addToCart = async (product) => {
    setLoadingCart(true);
    try {
      if (isLoggedIn) {
        const response = await axios.post(
          "http://localhost:8070/api/user/cart",
          {
            name: product.name,
            quantity: 1,
            price: product.price,
            image: product.image,
            stock: product.quantity,
            description: product.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Item added Succesfully!");
        setCart(response.data.cart);
      } else {
        setCart([...cart, product]);
        toast.warning("Please Login");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        token,
        addToCart,
        isAdmin,
        loading: loadingLogin || loadingLogout || loadingCart,
      }}
    >
      {loadingLogin || loadingLogout || loadingCart ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
