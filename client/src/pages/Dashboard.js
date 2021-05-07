import React from 'react';
import {Container, Grid, Grow, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Newsletter from "../components/Newsletter";
import {useHistory} from "react-router-dom";

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
            backgroundColor: 'grey',
            cursor: 'pointer',
        }
    },
}))

const Dashboard = () => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grow in className={classes.mainCards}>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.card} elevation={8}>
                            <Typography variant="h4">
                                Your reservations
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.card} elevation={8}>
                            <Typography variant="h4">
                                Available films
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.card} elevation={8}>
                            <Typography variant="h4">
                                Contact support
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.card} elevation={8} onClick={() => history.push('/reservation')}>
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
