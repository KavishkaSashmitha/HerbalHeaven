import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
const PaypalCheckOut = (props) => {
  const { product } = props;

  return (
    <div>
  
    <PayPalScriptProvider options={{ components: 'buttons'}}>
      <div>
        <PayPalButtons />
      </div>
    </PayPalScriptProvider>
    </div>
  );
};

export default PaypalCheckOut;
