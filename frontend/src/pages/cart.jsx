import React, { useEffect, useState } from 'react';
import { useAuth } from '../middleware/authContext';
import axios from 'axios';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import CartItemCard from '../components/Cart-Card';
import { StepperWithContent } from '../components/Stepper';
import { SidebarWithBurgerMenu } from '../components/navBar';
import backgroundImage from '../assets/cart-back.jpg';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import ProfileMenu from '../components/Profile';

const Cart = () => {
  const { isLoggedIn, token } = useAuth();
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

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
          // Remove duplicate items from the cart
          const uniqueCartItems = Array.from(
            new Set(response.data.map((item) => item.name))
          ).map((name) => {
            return response.data.find((item) => item.name === name);
          });
          setCart(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [isLoggedIn, token]);

  // Function to calculate the total bill
  const calculateTotalBill = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to remove an item from the cart
  const handleDeleteItem = async (itemId) => {
    try {
      if (isLoggedIn) {
        await axios.delete(`http://localhost:8070/api/user/cart/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Fetch the updated cart items after deletion
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
      console.error('Error deleting cart item:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      if (isLoggedIn) {
        // Send a PUT request to update the quantity of the item
        await axios.put(
          `http://localhost:8070/api/user/cart/${itemId}`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Fetch the updated cart items after updating the quantity
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
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (isLoggedIn) {
        // Construct an array of objects containing cart item ID and its updated quantity
        const updatedItems = cart.map((item) => ({
          id: item._id,
          quantity: item.quantity, // You need to get the updated quantity from your CartItemCard component
        }));

        // Send a PUT request to update the quantities of all items in the cart
        await axios.put(
          'http://localhost:8070/api/user/cart/update-quantities',
          updatedItems,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Optionally, you can navigate to the payment page or any other page after checkout
        navigate('/user/payment');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <div className="relative flex justify-between">
          <SidebarWithBurgerMenu cartCount={cart.length} />
          <div className="relative flex w-1/2 gap-2 mt-2 mb-2 md:auto justify-center mx-auto">
            <Input
              type="search"
              color="black"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: 'min-w-[288px]',
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>

          <ProfileMenu />
        </div>
        ;
        <div className="cart-items">
          <Typography variant="h3" color="white" className="cart">
            {' '}
            Your Cart
            <ShoppingBagIcon className="h-10 w-10  cart" />
          </Typography>

          {isLoggedIn && <StepperWithContent />}
          {Array.isArray(cart) && cart.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ml-4 w-full">
                {cart.map((item) => (
                  <CartItemCard
                    key={item._id}
                    item={item}
                    onDelete={handleDeleteItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>

              <Typography variant="h3" color="white" className="total-bill">
                Total Bill: Rs.{calculateTotalBill()}
              </Typography>

              <div className="mt-32 flex justify-center mx-auto ">
                <Button color="green" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </>
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
        </div>
      </div>
    </>
  );
};

export default Cart;
