import React from 'react';
import {Box, CircularProgress, Container, Grid, Grow, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useFetch from "../utils/useFetch";
import {getUserId} from "../utils/userUtils";
import ReservationCard from "../components/ReservationCard";
import FilmCard from "../components/FilmCard";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(7),
        padding: theme.spacing(2),
        color: 'black',
        boxShadow: '0px 6px 29px 1px rgba(255,255,255,1)',
        minHeight: theme.spacing(50),

        backgroundImage: 'url("images/dashboardPage/white_bg_2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        border: '3px solid white',

        animation: 'white_bg_animation 50s infinite',
    },
    gridItem: {
        transition: 'all 0.2s',
        '&:hover': {
            transform: 'scale(0.95)',
            cursor: 'pointer'
        }
    },
    skeleton: {
        maxWidth: 250,
        padding: theme.spacing(2),
    },
}))

const YourReservations = () => {
    const classes = useStyles()
    const user_id = getUserId()

    const {data: reservations, isPending, error} = useFetch(`${process.env.REACT_APP_BACKEND_URI}/reservations/user/${user_id}`)

    return (
        <Grow in>
            <Container maxWidth={"lg"} className={classes.root}>
                {isPending ? (
                    <Grid container spacing={3} alignContent="center" justify="center">
                        {[0,1,2,3,4,5,6,7].map((reservation) => (
                            <Grid item sx={12} md={4} lg={3} xl={3} key={reservation._id}>
                                <Skeleton variant="rect" width={250} height={90} animation="wave" className={classes.skeleton}/>
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
                {error && <div>{error}</div>}
                {reservations ? (
                    <>
                        {reservations.length === 0 ? (
                            <>
                                <Typography variant="h3" align="center">No reservation has been made</Typography>
                                <Typography variant="h5" align="center" color="textSecondary">Go and make a new one!</Typography>
                            </>
                        ): (
                            <Grid container spacing={3} alignContent="center" justify="center">
                                {reservations.map((reservation) => (
                                    <Grid item sx={12} md={4} lg={3} xl={3} key={reservation._id} className={classes.gridItem}>
                                        <ReservationCard reservation={reservation} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                ) : null}
            </Container>
        </Grow>
    );
};

export default YourReservations;
