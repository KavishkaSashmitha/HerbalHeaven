import React, { useEffect, useState } from 'react';
import { useAuth } from '../middleware/authContext';
import axios from 'axios';

const Cart = () => {
  const { isLoggedIn, token } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get(
            'http://localhost:8070/api/user/cart',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCart(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [isLoggedIn, token]);

  return (
    <div>
      <h2>Your Cart</h2>
      {Array.isArray(cart) && cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <>
              <li key={item._id}>
                {item.name} - ${item.price}
              </li>
              <li>{item.quantity}</li>
            </>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {isLoggedIn && (
        <p>
          Display additional content for logged-in users, like checkout options.
        </p>
      )}
    </div>
  );
};

export default Cart;
