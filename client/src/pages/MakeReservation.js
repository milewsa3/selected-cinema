import React, {useState} from 'react';
import {Box, Button, Container, Grid, Grow, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { DataGrid } from '@material-ui/data-grid';
import FirstStep from "../components/reservation/FirstStep";
import SecondStep from "../components/reservation/SecondStep";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import ReservationStepper from "../components/reservation/ReservationStepper";


const useStyles = makeStyles(theme => ({
    mainContainer: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    stepsContainer: {
        width: '90%',
        marginTop: theme.spacing(4),
    },
}))



function MakeReservation() {
    const classes = useStyles()

    return (
        <Grow in>
            <Container display="flex" justifyContent="center" maxWidth="lg" className={classes.mainContainer}>
                <Typography align="flex-start" variant="h3">
                    Make reservation!
                </Typography>
                <Container className={classes.stepsContainer}>
                    <ReservationStepper/>
                </Container>
            </Container>
        </Grow>
    );
}

export default MakeReservation;