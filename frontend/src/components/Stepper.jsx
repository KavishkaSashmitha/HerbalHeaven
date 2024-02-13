import React from 'react';
import { Stepper, Step, Button, Typography } from '@material-tailwind/react';
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export function StepperWithContent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);

  return (
    <div className="w-auto px-24 py-4 step">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step>
          <Link to="/user/cart">
            <ShoppingCartIcon className="h-5 w-5" />
          </Link>
        </Step>
        <Step>
          <Link to="/step2">
            <CurrencyDollarIcon className="h-5 w-5" />
          </Link>
        </Step>
        <Step>
          <Link to="/step3">
            <ArchiveBoxIcon className="h-5 w-5" />
          </Link>
        </Step>
      </Stepper>
    </div>
  );
}
