import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Address from '../address/Address';
import OrderSummary from '../order-summary/OrderSummary';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { AddressContext } from '../../common/AddressContext';
import { OrderContext } from '../../common/OrderContext';

const steps = ['Items', 'Select Address', 'Confirm Order'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(1); // Start at 'Select Address'
  const [skipped, setSkipped] = React.useState(new Set());
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  const { selectedAddress, setSelectedAddress } = useContext(AddressContext); // Use selectedAddress from context
  const { clearOrders } = useContext(OrderContext);
  const navigate = useNavigate();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      setSnackbarMessage('Please select an address!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === steps.length - 1) {
      setSnackbarMessage('Order Placed Successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      clearOrders();
      setSelectedAddress(null);

      setTimeout(() => {
        setSelectedAddress(null);
        navigate('/Products');
      }, 2000); // Redirect after 2 seconds
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      navigate('/Products');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleNext(event);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="order-stepper">
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: "space-between",
          marginTop: '3%',
        }}
      >
        <Stepper
          activeStep={activeStep}
          sx={{
            width: '85%',
            backgroundColor: '#FFFFFF',
            padding: '1rem',
            borderColor: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            marginRight: 'auto',
            marginLeft: 'auto',
          }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            if (index === 0) {
              stepProps.completed = true;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box
        sx={{
          width: '85%',
          padding: '1rem',
          borderColor: '#FFFFFF',
          display: 'row',
          flexDirection: "column",
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        {
          activeStep === 1 && (
            <React.Fragment>
              <Typography>
                <Address />
              </Typography>
            </React.Fragment>
          )
        }
        {
          activeStep === 2 && (
            <React.Fragment>
              <Typography>
                <OrderSummary />
              </Typography>
            </React.Fragment>
          )
        }
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: "space-between",
        }}
      >
        {
          activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: -40, mb: 38 }}>Thank You</Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} onKeyDown={handleKeyDown} />
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )
        }
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            bgcolor: snackbarSeverity === 'success' ? '#07BC0B' : '#E64C3B',
            color: snackbarSeverity === 'success' ? '#FFFFFF' : '#FFFFFF',
            justifyContent: 'flex-start'
          }}
          icon={false} // Remove the tick mark
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div >
  );
}
