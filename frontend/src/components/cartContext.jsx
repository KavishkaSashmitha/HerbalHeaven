// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        // Fetch cart count from the server
        const response = await axios.get(
          'http://localhost:8070/api/user/cart',

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
            },
          }
        );
        setCartCount(response.data.length);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
