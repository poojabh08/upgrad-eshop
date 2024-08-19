import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Address from './address/Address';
import ShowOrder from './show-order/show-order';

const steps = ['Add your Address', 'Your order details', 'Order Confirmed'];

export default function OrderProcess() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const navigate = useNavigate()

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
    return (
        <Box>
            {/* <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper> */}
            {activeStep === steps.length - 2 && (
                <React.Fragment>
                    <Typography>
                        <ShowOrder />
                    </Typography>
                </React.Fragment>
            )}
            {activeStep === steps.length - 3 && (
                <React.Fragment>
                    <Typography>
                        <Address />
                        <div>Press enter to add the address and then click on next </div>
                    </Typography>
                </React.Fragment>
            )}
            {activeStep === steps.length - 1 && (
                <React.Fragment>
                    <Typography >
                        Your order is confirmed.
                    </Typography>
                </React.Fragment>
            )}
        </Box>
    );
}
