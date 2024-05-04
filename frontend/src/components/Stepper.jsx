import React from 'react';
import { Stepper, Step, Button, Typography } from '@material-tailwind/react';
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export function StepperWithContent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  
  return (
    <div className="w-auto px-24 py-4 step ">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step isActive={activeStep === 0}>

          <Link to="/customer/cart">
            <ShoppingCartIcon
              className="h-5 w-5 "
              style={{ color: '#ff8f00' }}
            />

          </Link>
        </Step>
        <Step isActive={activeStep === 1}>
          <Link to="/user/payment">
            <CurrencyDollarIcon className="h-5 w-5" color="green" />
          </Link>
        </Step>
        <Step isActive={activeStep === 2}>
          <Link to="/address">
            <ArchiveBoxIcon className="h-5 w-5" color="green" />
          </Link>
        </Step>
      </Stepper>
    </div>
  );
}
