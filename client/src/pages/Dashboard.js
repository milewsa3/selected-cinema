import React from 'react';
import {Container, Grid, Grow, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Newsletter from "../components/Newsletter";
import {useHistory} from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
    },
    mainCards: {
        marginBottom: theme.spacing(14),
    },
    card: {
        height: theme.spacing(30),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
        transitionTimingFunction: 'ease-in-out',
        '&:hover': {
            opacity: '0.85',
            transform: "scale(0.95) rotate(1deg)",
            cursor: 'pointer',
        }
    },
    yourReservations:{
        backgroundImage: 'url("images/dashboardPage/cinema.jpg")',
        backgroundSize: 'cover',
        transition: 'all 0.5s',
        '&:hover': {
            backgroundPosition: "30% 30%"
        }
    },
    availableFilms: {
        backgroundImage: 'url("images/dashboardPage/action.jpg")',
        backgroundSize: '1200px 800px',
        backgroundPosition: 'center top',
        color: 'white',
        transition: 'all 0.5s',
        '&:hover': {
            backgroundPosition: '20% 20%',
        }
    },
    contactSupport: {
        backgroundImage: 'url("images/dashboardPage/question_mark.jpg")',
        backgroundSize: '120%',
        color: 'white',
        backgroundPosition: 'center',
        transition: 'all 0.3s',
        '&:hover': {
            backgroundSize: '100%',
        }
    },
    makeReservation: {
        backgroundImage: 'url("images/dashboardPage/reception.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: '40% 40%',
        transition: 'all 0.3s',
        opacity: '0.9',
        '&:hover': {
            backgroundPosition: '90% center',
            color: 'white',
            opacity: '1',
        }
    }
}))

const Dashboard = () => {
    const classes = useStyles()
    const history = useHistory()

    const handleYourReservations = () => {
        history.push('/yourReservations')
    }

    const handleAvailableFilms = () => {
        history.push('/films')
    }

    const handleContactSupport = () => {
        history.push('/support/contact')
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grow in className={classes.mainCards}>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper className={clsx(classes.card, classes.yourReservations)} elevation={8} onClick={() => handleYourReservations()}>
                            <Typography variant="h4">
                                Your reservations
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={clsx(classes.card, classes.availableFilms)} elevation={8} onClick={() => handleAvailableFilms()}>
                            <Typography variant="h4">
                                Available films
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={clsx(classes.card, classes.contactSupport)} elevation={8} onClick={() => handleContactSupport()}>
                            <Typography variant="h4">
                                Contact support
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={clsx(classes.card, classes.makeReservation)} elevation={8} onClick={() => history.push('/reservation')}>
                            <Typography variant="h3">
                                Make reservation!
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grow>

            <Grid container justify="center">
                <Newsletter />
            </Grid>
        </Container>
    );
};

export default Dashboard;
