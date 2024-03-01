import React, { useEffect, useState } from 'react';
import { useAuth } from '../middleware/authContext';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react'; // Assuming Button is from this library
import { Card } from '@material-tailwind/react'; // Replace with the correct path

import CartItemCard from '../components/Cart-Card';
import { StepperWithContent } from '../components/Stepper';

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

  const handleDeleteItem = async (itemId) => {
    try {
      if (isLoggedIn) {
        await axios.delete(`http://localhost:8070/api/user/cart/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await axios.get(
          'http://localhost:8070/api/user/cart',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Update the state with the updated cart data
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  return (
    <>
      <div className="cart-items">
        <h2 className="cart-head">Your Cart</h2>
        {isLoggedIn && <StepperWithContent />}
        {Array.isArray(cart) && cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ml-4 w-full">
            {cart.map((item) => (
              <CartItemCard
                key={item._id}
                item={item}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        ) : (
          <Card className="empty-cart" color="light-green">
            <p>Your cart is empty.</p>
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li>
                <Link to="/products" className="underline text-orange-600">
                  See Products
                </Link>
              </li>
              <li>
                <Link to="/products" className="underline text-orange-600">
                  <EyeIcon className="h-6 w-6 " />
                </Link>
              </li>
            </ul>
          </Card>
        )}
        <div className="mt-32 flex justify-center mx-auto ">
          <Link to="/user/payment">
            <Button color="green">Checkout</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
