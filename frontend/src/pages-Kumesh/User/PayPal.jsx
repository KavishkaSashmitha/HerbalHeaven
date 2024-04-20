import React, { useState, useEffect } from "react";
import PaypalCheckOut from "./PaypalCheckOut";
import "./Payment.css";
import axios from "axios";
import { useAuth } from "../../middleware/authContext";
import { SidebarWithBurgerMenu } from "../../components/navBar";
import paypal from "./img/paypal.png";
function PayPal() {
  const [cart, setCart] = useState([]);
  const { isLoggedIn, token } = useAuth();


  console.log("cart", cart);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get(
            "http://localhost:8070/api/user/cart",
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
         
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [isLoggedIn, token]);

  // Function to calculate the total bill
  const calculateTotalBill = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <div>
      <SidebarWithBurgerMenu />
      <div className="pypal-full">
        <div className="paypal-con">
          <div>
            <img src={paypal} alt="paypal" className="paypl-crd" />
          </div>
          <h1 className="paypal-topic">Pay With PayPal</h1>
          <div>
            <h1 className="paypal-para">
              Your Total Amount: LKR{" "}
              <span className="price-pay">{calculateTotalBill()}</span>
            </h1>
          </div>
          <div className="paypal-button-container">
            <PaypalCheckOut />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayPal;
