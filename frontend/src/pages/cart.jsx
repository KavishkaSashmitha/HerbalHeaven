import React, { useEffect, useState } from 'react';
import { useAuth } from '../middleware/authContext';
import axios from 'axios';
import { EyeIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Card,
  Checkbox,
  Input,
  List,
  Typography,
  Modal,
} from '@material-tailwind/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CartItemCard from '../components/Cart-Card';
import { StepperWithContent } from '../components/Stepper';
import { SidebarWithBurgerMenu } from '../components/navBar';
import backgroundImage from '../assets/cart-back.jpg';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import ProfileMenu from '../components/Profile';
import Swal from 'sweetalert2';
import { Footer } from '../components/Footer';
import { toast } from 'react-toastify';

const Cart = () => {
  const location = useLocation();
  const { isLoggedIn, token } = useAuth();
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
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
          setCart(response.data);
        } else {
          toast.error('SignIn Please');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, [isLoggedIn, token]);

  const calculateTotalBill = () => {
    const selectedCartItems = cart.filter((item) =>
      selectedItems.includes(item._id)
    );
    return selectedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleDeleteItem = async (itemId) => {
    try {
      if (isLoggedIn) {
        await axios.delete(`http://localhost:8070/api/user/cart/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedCart = cart.filter((item) => item._id !== itemId);
        setCart(updatedCart);
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
        navigate(location.pathname, { replace: true });
      } else {
        toast.error('SignIn Please');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleConfirmDeleteItem = async () => {
    if (itemToDelete) {
      await handleDeleteItem(itemToDelete);
      setItemToDelete(null);
      setShowConfirmationModal(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      if (isLoggedIn) {
        await axios.put(
          `http://localhost:8070/api/user/cart/${itemId}`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedCart = cart.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item._id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckout = () => {
    try {
      if (isLoggedIn) {
        const selectedCartItems = cart.filter((item) =>
          selectedItems.includes(item._id)
        );

        // Pass a function to update quantity to CartItemCard
        const updateQuantityAndCheckout = async (itemId, newQuantity) => {
          try {
            await handleUpdateQuantity(itemId, newQuantity);
          } catch (error) {
            console.error('Error updating quantity:', error);
          }
        };

        // Call the update function for each selected item
        selectedCartItems.forEach(async (item) => {
          await updateQuantityAndCheckout(item._id, item.quantity);
        });

        // Navigate to the payment page with selected items
        navigate('/user/payment', { state: { selectedCartItems } });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const confirmDelete = async () => {
    const result = await Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
    });
    return result.isConfirmed;
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#02353c',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        <div
          className="relative flex justify-between"
          style={{ width: '100%' }}
        >
          <SidebarWithBurgerMenu />

          <ProfileMenu />
        </div>
        <div className="cart-items">
          <Typography variant="h3" color="white" className="cart">
            Your Cart
            <ShoppingBagIcon className="h-10 w-10 cart" />
          </Typography>
          {isLoggedIn && <StepperWithContent />}
          {Array.isArray(cart) && cart.length > 0 ? (
            <>
              <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-4 ml-4 w-3/4">
                  <div className="ml-4 w-full justify-center mx:auto">
                    <List>
                      <div className="flex items-center mb-4">
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAll}
                          label="Select All"
                        />
                        <Typography className="text-white ml-2">
                          {selectedItems.length} selected
                        </Typography>
                        {selectedItems.length > 0 && (
                          <Button
                            color="red"
                            onClick={async () => {
                              const confirmed = await confirmDelete();
                              if (confirmed) {
                                for (const itemId of selectedItems) {
                                  await handleDeleteItem(itemId);
                                }
                                setSelectedItems([]);
                              }
                            }}
                            className="ml-auto"
                          >
                            Remove Selected
                          </Button>
                        )}
                      </div>
                      {cart.map((item) => (
                        <CartItemCard
                          key={item._id}
                          item={item}
                          isSelected={selectedItems.includes(item._id)}
                          onToggleSelect={() => {
                            if (selectedItems.includes(item._id)) {
                              setSelectedItems((prevItems) =>
                                prevItems.filter((id) => id !== item._id)
                              );
                            } else {
                              setSelectedItems((prevItems) => [
                                ...prevItems,
                                item._id,
                              ]);
                            }
                          }}
                          onDelete={handleDeleteItem}
                          onUpdateQuantity={handleUpdateQuantity}
                        />
                      ))}
                    </List>
                  </div>
                </div>
              </div>

              <Typography variant="h3" color="white" className="total-bill ">
                Total Bill: Rs.{calculateTotalBill()}
                <br />
                <Button
                  className="mb-4 transition duration-300 ease-in-out hover:bg-yellow-100"
                  style={{ backgroundColor: '#ff8f00' }}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Typography>
            </>
          ) : (
            <Card className="empty-cart" style={{ backgroundColor: '#ff8f00' }}>
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
      <Footer />
    </>
  );
};

export default Cart;
