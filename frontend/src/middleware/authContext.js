import { Spinner } from '@material-tailwind/react';
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  // Check for stored token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');

    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }

    setLoading(false);
  }, []);

  const login = (newToken) => {
    setLoading(true); // Set loading to true when starting login
    // Simulate asynchronous login logic (replace with actual logic)
    setTimeout(() => {
      setToken(newToken);
      setLoggedIn(true);
      setLoading(false); // Set loading to false when login is complete

      // Save the token to localStorage for persistence
      localStorage.setItem('userToken', newToken);
    }, 1000);
  };

  const logout = () => {
    setLoading(true); // Set loading to true when starting logout
    // Simulate asynchronous logout logic (replace with actual logic)
    setTimeout(() => {
      setToken(null);
      setLoggedIn(false);
      setLoading(false);
      setCart([]); // Set loading to false when logout is complete

      // Remove the token from localStorage on logout
      localStorage.removeItem('userToken');
    }, 1000);
  };

  const addToCart = async (product) => {
    if (isLoggedIn) {
      try {
        const { name, quantity, price, image, description } = product; // Destructure the product object
        if (!name || !quantity || !price || !image || !description) {
          toast.warning('Invalid product data');
          return;
        }

        // Make a POST request to save cart details in the backend
        const response = await axios.post(
          'http://localhost:8070/api/user/cart',
          {
            name,
            quantity,
            price,
            image,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Assuming the backend returns an updated cart
        setCart(response.data.cart);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      // Update cart state for non-logged-in users
      toast.warning('Login please');
      setCart([...cart, product]);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, token, addToCart }}
    >
      {loading ? (
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
