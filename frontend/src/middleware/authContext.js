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

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");

    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const login = (newToken) => {
    setLoadingLogin(true);
    setTimeout(() => {
      setToken(newToken);
      setLoggedIn(true);
      setLoadingLogin(false);
      localStorage.setItem("userToken", newToken);
    }, 1000);
  };

  const logout = () => {
    setLoadingLogout(true);
    setTimeout(() => {
      setToken(null);
      setLoggedIn(false);
      setLoadingLogout(false);
      setCart([]);
      localStorage.removeItem("userToken");
    }, 1000);
  };
  const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).send({ error: "Permission denied." });
    }
  };

  const addToCart = async (product) => {
    setLoadingCart(true);
    try {
      if (isLoggedIn) {
        // Make a POST request to save cart details in the backend
        const response = await axios.post(
          "http://localhost:8070/api/user/cart",
          {
            name: product.name,
            quantity: 1,
            price: product.price,
            image: product.image,
            description: product.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
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
      {loadingLogin || loadingLogout || loadingCart ? (
        // Render a spinner or loading indicator while loading
        <Spinner />
      ) : (
        // Render the children when not loading
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
