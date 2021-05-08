import React, {useState} from 'react';
import {Box, Button, Container, Grid, Grow, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { DataGrid } from '@material-ui/data-grid';
import FirstStep from "../components/reservation/FirstStep";
import SecondStep from "../components/reservation/SecondStep";


const useStyles = makeStyles(theme => ({
    mainContainer: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    stepsContainer: {
        width: '90%',
        marginTop: theme.spacing(2),
    },
    stepLabel: {
        marginBottom: theme.spacing(4)
    },
}))

function MakeReservation(props) {
    const classes = useStyles()

    return (
        <Grow in>
            <Container display="flex" justifyContent="center" maxWidth="lg" className={classes.mainContainer}>
                <Typography align="flex-start" variant="h3">
                    Make reservation!
                </Typography>
                <Container className={classes.stepsContainer}>
                    <Typography variant="h5" className={classes.stepLabel}>
                        1. Choose date
                    </Typography>
                    <FirstStep />
                    <Typography variant="h5">
                        2. Choose film
                    </Typography>
                    <SecondStep />
                </Container>

            </Container>
        </Grow>
    );
}

export default MakeReservation;