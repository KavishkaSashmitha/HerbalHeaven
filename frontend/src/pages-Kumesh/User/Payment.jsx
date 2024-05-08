import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Stepper, Step } from '@material-tailwind/react';
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../middleware/authContext';
import axios from 'axios';
import { SidebarWithBurgerMenu } from '../../components/navBar';
import './Payment.css';
import card from './img/card.png';
import paypal from './img/paypal.png';
import amazon from './img/amo.png';
import tic from './img/tic.png';

function Payment() {
  const location = useLocation();
  const history = useNavigate();
  const [cart, setCart] = useState([]);
  const { isLoggedIn, token } = useAuth();
  const [inputs, setInputs] = useState({
    fullname: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    cardholdername: '',
    cardnumber: '',
    expmonth: '',
    cvv: '',
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get(
            'http://localhost:8070/api/user/cart',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const uniqueCartItems = Array.from(
            new Set(response.data.map((item) => item.name))
          ).map((name) => response.data.find((item) => item.name === name));
          setCart(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [isLoggedIn, token]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then(() => {
        alert('Card details Validated successfully!');
        history('/my-orders');
      })
      .catch((error) => {
        console.error('Error adding card details:', error);
      });
  };

  const placeOrder = async () => {
    await axios.post(
      'http://localhost:8070/api/orders/order/save',
      {
        total: calculateTotalBill(),
        shippingAddress: {
          address: inputs.address,
          city: inputs.city,
          zip: inputs.zip,
        },
        paymentStatus: 'Paid',
        orderStatus: 'Preparing',
        items: cart.map(({ name, price, quantity, image }) => ({
          name,
          price,
          quantity,
          image,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const sendRequest = async () => {
    placeOrder();
    await axios
      .post(
        "http://localhost:8070/cards",
        {
          fullname: String(inputs.fullname),
          address: String(inputs.address),
          city: String(inputs.city),
          zip: String(inputs.zip),
          country: String(inputs.country),
          cardholdername: String(inputs.cardholdername),
          cardnumber: String(inputs.cardnumber),
          expmonth: String(inputs.expmonth),
          //expyear: String(inputs.expyear),
          cvv: String(inputs.cvv),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);
  };

  const calculateTotalBill = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getMinimumMonth = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    return `${year}-${formattedMonth}`;
  };

  const steps = [
    {
      icon: <ShoppingCartIcon className="h-5 w-5" color="green" />,
      path: '/user/cart',
    },
    {
      icon: <CurrencyDollarIcon className="h-5 w-5" color="green" />,
      path: '/user/payment',
    },
  ];

  const activeStepIndex = steps.findIndex(
    (step) => location.pathname === step.path
  );

  useEffect(() => {
    setCart(location.state.selectedCartItems);
  }, [location.state.selectedCartItems]);

  return (
    <div className="w-auto px-24 py-4 step">
      <SidebarWithBurgerMenu />
      <Stepper
        activeStep={activeStepIndex}
        isFirstStep={activeStepIndex === 0}
        isLastStep={activeStepIndex === steps.length - 1}
      >
        {steps.map((step, index) => (
          <Step key={index} isActive={index === activeStepIndex}>
            <Link to={step.path}>{step.icon}</Link>
          </Step>
        ))}
      </Stepper>
      <div className="Payment-full-box">
        <div className="Payment-full-box-set">
          <div>
            <h1 className="main-tpoic">Payment</h1>
            <p className="main-para">
              Choose your preferred payment method below
            </p>
            <div className="method-set">
              <div className="method-one method-box">
                <img src={tic} alt="tick" className="img-tic" />
                <img src={card} alt="card" className="img-paymt card-pay" />
                <p className="paymnt-topic">Pay With Credit/Debit Card</p>
              </div>
              <div
                className="method-two method-box"
                onClick={() => {
                  window.location.href = '/paypal';
                }}
              >
                <img
                  src={paypal}
                  alt="paypal"
                  className="img-paymt card-paypal"
                />
                <p className="paymnt-topic">Pay With Paypal</p>
              </div>
              <div
                className="method-three method-box"
                onClick={() => {
                  window.location.href = '/cashdelivery';
                }}
              >
                <img src={amazon} alt="amazon" className="img-paymt card-amo" />
                <p className="paymnt-topic">pay with Cash on Delivery</p>
              </div>
              {/* <div className="method-four method-box" onClick={() => { window.location.href = "/bankslip"; }}>
                <img src={amazon} alt="amazon" className="img-paymt card-amo" />
                <p className="paymnt-topic">pay with DirectTransfer</p>
              </div> */}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="method-set-card">
                <div className="bil-box">
                  <h1 className="main-topic-bil">
                    <span className="number">1</span>Billing Information
                  </h1>
                  <label className="paymnt-lable">FULL NAME</label>
                  <br />
                  <input
                    className="paymnt-inpt"
                    type="text"
                    name="fullname"
                    placeholder="Saman Perera"
                    value={inputs.fullname}
                    onChange={handleChange}
                  />
                  <br />
                  <label className="paymnt-lable">BILLING ADDRESS</label>
                  <br />
                  <input
                    className="paymnt-inpt"
                    type="text"
                    name="address"
                    value={inputs.address}
                    onChange={handleChange}
                    placeholder="11/16, Wilabada Road, Gampaha."
                    required
                  />
                  <br />
                  <div className="method-set-card-form">
                    <div>
                      <label className="paymnt-lable">CITY</label>
                      <br />
                      <input
                        className="paymnt-inpt"
                        type="text"
                        name="city"
                        placeholder="Gampaha"
                        value={inputs.city}
                        onChange={handleChange}
                      />
                      <br />
                    </div>
                    <div>
                      <label className="paymnt-lable">ZIPCODE</label>
                      <br />
                      <input
                        className="paymnt-inpt-two"
                        type="text"
                        name="zip"
                        value={inputs.zip}
                        onChange={handleChange}
                        placeholder="11550"
                        minLength={5}
                        maxLength={5}
                        pattern="[0-9]{5}"
                        title="Please enter a valid 5-digit ZIP code"
                      />
                      <br />
                    </div>
                  </div>
                  <label className="paymnt-lable">COUNTRY</label>
                  <br />
                  <select
                    name="country"
                    value={inputs.country}
                    onChange={handleChange}
                    required
                    className="paymnt-inpt"
                  >
                    <option value="" disabled selected>
                      Select Country
                    </option>
                    <option value="india">India</option>
                    <option value="sri_lanka">Sri Lanka</option>
                  </select>
                </div>
                <div className="bil-box">
                  <h1 className="main-topic-bil">
                    <span className="number">2</span>Credit Card Info
                  </h1>
                  <label className="paymnt-lable">CARDHOLDER NAME</label>
                  <br />
                  <input
                    className="paymnt-inpt"
                    type="text"
                    name="cardholdername"
                    placeholder="Saman Perera"
                    value={inputs.cardholdername}
                    onChange={handleChange}
                  />
                  <br />
                  <label className="paymnt-lable">CARD NUMBER</label>
                  <br />
                  <input
                    className="paymnt-inpt"
                    type="text"
                    value={inputs.cardnumber}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const sanitizedValue = inputValue.replace(/[^\d]/g, '');
                      const formattedValue = sanitizedValue
                        .replace(/(\d{4})/g, '$1-')
                        .slice(0, 19);
                      handleChange({
                        target: { name: 'cardnumber', value: formattedValue },
                      });
                    }}
                    maxLength={19}
                    minLength={19}
                    name="cardnumber"
                    placeholder="5645-6456-7665-0456"
                    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                    title="Please enter a valid card number in the format XXXX-XXXX-XXXX-XXXX"
                    required
                  />
                  <br />
                  <div className="method-set-card-form">
                    <div>
                      <label className="paymnt-lable">EXPIRE DATE</label>
                      <br />
                      <input
                        className="paymnt-inpt-one"
                        type="month"
                        name="expmonth"
                        value={inputs.expmonth}
                        onChange={handleChange}
                        placeholder="Desember 10"
                        min={getMinimumMonth()}
                        required
                      />
                      <br />
                    </div>
                    <div>
                      {/* <label className="paymnt-lable">EXP YEAR</label>
                      <br />
                      <input
                        className="paymnt-inpt-one"
                        type="number"
                        value={inputs.expyear}
                        onChange={handleChange}
                        id="expyear"
                        name="expyear"
                        required
                        placeholder="YYYY"
                        min="2024"
                        max="2100"
                      />
                      <br /> */}
                    </div>
                  </div>
                  <label className="paymnt-lable">CVV NUMBER</label>
                  <br />
                  <input
                    className="paymnt-inpt"
                    type="text"
                    name="cvv"
                    value={inputs.cvv}
                    onChange={handleChange}
                    required
                    placeholder="123"
                    minLength={3}
                    maxLength={3}
                    pattern="[0-9]*"
                  />
                </div>
              </div>
              <h1 className="paypal-para2">
                Your Total Amount :LKR{' '}
                <span className="price-pay">{calculateTotalBill()}</span>
              </h1>
              <div className="end-btn">
                <button className="btn-pro">Place Order</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
