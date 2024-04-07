import { Spinner } from '@material-tailwind/react';
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');

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
      localStorage.setItem('userToken', newToken);
    }, 1000);
  };

  const logout = () => {
    setLoadingLogout(true);
    setTimeout(() => {
      setToken(null);
      setLoggedIn(false);
      setLoadingLogout(false);
      setCart([]);
      localStorage.removeItem('userToken');
    }, 1000);
  };

  const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).send({ error: 'Permission denied.' });
    }
  };

  const staffLogin = async (email, password) => {
    setLoadingLogin(true);
    try {
      const response = await axios.post(
        'http://localhost:8070/api/posts/post/save',
        { email, password }
      );

      if (response.data.success) {
        login(response.data.token);
        toast.success('Staff login successful');
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error occurred during staff login:', error);
      toast.error('Error occurred during staff login');
    } finally {
      setLoadingLogin(false);
    }
  };

  const addToCart = async (product) => {
    setLoadingCart(true);
    try {
      if (isLoggedIn) {
        const response = await axios.post(
          'http://localhost:8070/api/user/cart',
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
              'Content-Type': 'application/json',
            },
          }
        );
        toast.success('Item added Succesfully!');
        setCart(response.data.cart);
      } else {
        setCart([...cart, product]);
        toast.warning('Please Login');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
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
        staffLogin,
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
