import React from 'react';
import {Container, Grow, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
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
            <Container maxWidth="lg" className={classes.mainContainer}>
                <Typography variant="h3">
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