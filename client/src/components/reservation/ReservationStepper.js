import React, {useState} from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import {Box, Button, Paper, Snackbar, Typography} from "@material-ui/core";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import {makeStyles} from "@material-ui/core/styles";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@material-ui/lab";
import {getUserId} from "../../utils/userUtils";
import {createReservation} from "../../actions/reservationActions";

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
    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [selectedFilm, setSelectedFilm] = useState(null)
    const [selectedTime, setSelectedTime] = useState('')
    const [selectedSeats, setSelectedSeats] = useState([])
    const screening = useSelector(state => state.resMoviesSeat)

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

    const handleNext = (e) => {
        if (e.target.innerText.toLowerCase() === 'submit')
            handleSubmit()
        else
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleSubmit = () => {
        if (!selectedFilm || !selectedTime || selectedSeats.length === 0) {
            setSnackBarInfo('Fill up all steps')
            openSnackbar()
        } else {
            const user_id = getUserId()
            const screening_id = screening.data[0]._id

            dispatch(createReservation({screening_id, seats: selectedSeats, user_id}))
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function handleEndBtnOnClick() {
        history.push('/dashboard')
    }

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('error');
    const [snackBarInfo, setSnackBarInfo] = useState('Something went wrong');

    const openSnackbar = () => {
        setOpen(true)
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
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
                    <Typography variant="h6" gutterBottom={true}><Box fontWeight='bold' display='inline'>Reservation has been made!</Box> - you&apos;re the best!</Typography>
                    <Button onClick={handleEndBtnOnClick} className={classes.button} color="primary" variant="outlined">
                        Dashboard
                    </Button>
                </Paper>
            )}
            <Snackbar open={open} autoHideDuration={5000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={closeSnackbar} severity={severity}>
                    {snackBarInfo}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ReservationStepper;
