import React from "react";
import PaypalCheckOut from "./PaypalCheckOut";
import "./Payment.css";
import { SidebarWithBurgerMenu } from '../../components/navBar';
import paypal from "./img/paypal.png";
function PayPal() {
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
            Your Total Ammount : <span className="price-pay">250$</span>
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
