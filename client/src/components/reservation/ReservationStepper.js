import React, {useState} from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import {Button, Paper, Typography} from "@material-ui/core";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import {makeStyles} from "@material-ui/core/styles";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: '0px 6px 29px 1px rgba(255,255,255,1)'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    stepper: {
    }
}))

const ReservationStepper = () => {
    const classes = useStyles()
    const history = useHistory()
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [selectedFilm, setSelectedFilm] = useState(null)
    const [selectedTime, setSelectedTime] = useState('')
    const [selectedSeats, setSelectedSeats] = useState([])

    const steps = ['Choose date', 'Choose film', 'Choose time', 'Choose seats', 'Confirmation'];

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <FirstStep selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            case 1:
                return <SecondStep selectedFilm={selectedFilm} setSelectedFilm={setSelectedFilm} selectedDate={selectedDate}/>
            case 2:
                return <ThirdStep selectedDate={selectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} selectedFilm={selectedFilm}/>
            case 3:
                return <FourthStep selectedTime={selectedTime} selectedFilm={selectedFilm} setSelectedSeats={setSelectedSeats} />
            case 4:
                return <FifthStep selectedTime={selectedTime} selectedFilm={selectedFilm} selectedSeats={selectedSeats}/>
            default:
                return 'Unknown step';
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function handleYourReservations() {
        history.push('/dashboard')
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            {getStepContent(index)}
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Reservation has been made! - you&apos;re the best!</Typography>
                    <Button onClick={handleYourReservations} className={classes.button}>
                        Your reservations
                    </Button>
                </Paper>
            )}
        </div>
    );
};

export default ReservationStepper;
