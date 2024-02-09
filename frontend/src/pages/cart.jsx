import React, { useEffect, useState } from 'react';
import { useAuth } from '../middleware/authContext';
import axios from 'axios';
import { Card } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/24/outline';

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
      <h2 className="cart-head">Your Cart</h2>
      {Array.isArray(cart) && cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <>
              <li key={item._id}>
                {item.name} - ${item.price}
              </li>
              <li>1</li>
            </>
          ))}
        </ul>
      ) : (
        <Card className="empty-cart" color="light-green">
          <p>Your cart is empty.</p>
          <ul className="my-2 flex flex-col gap-2   lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li>
              <Link
                to="/products"
                class="underline"
                className="text-orange-600"
              >
                {' '}
                See Products
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                class="underline"
                className="text-orange-600"
              >
                <EyeIcon className="h-6 w-6 " />
              </Link>
            </li>
          </ul>
        </Card>
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
