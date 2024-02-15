import React from 'react';
import { Stepper, Step, Button } from '@material-tailwind/react';
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

function Payment() {
  const location = useLocation();

  // Define the steps with their corresponding route paths
  const steps = [
    { icon: <ShoppingCartIcon className="h-5 w-5"color="green" />, path: '/user/cart' },
    { icon: <CurrencyDollarIcon className="h-5 w-5" color="green"/>, path: '/user/payment' },
    { icon: <ArchiveBoxIcon className="h-5 w-5" />, path: '/address' },
  ];

  // Find the index of the current step based on the route path
  const activeStepIndex = steps.findIndex(
    (step) => location.pathname === step.path
  );

  return (
    <div className="w-auto px-24 py-4 step">
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
      <h2>Payment Method</h2>
      <div className="mt-32 flex justify-center mx-auto ">
        <Link to="/chekout">
          <Button color="green">Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
export default Payment;
