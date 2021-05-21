import React, {useEffect} from 'react';
import {Container, Grid, Grow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {getUserId} from "../utils/userUtils";
import Skeleton from "@material-ui/lab/Skeleton";
import UserReservations from "../components/UserReservations";
import {useDispatch, useSelector} from "react-redux";
import {getReservations} from "../actions/reservationActions";

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
    skeleton: {
        maxWidth: 250,
        padding: theme.spacing(2),
    },
}))

const YourReservations = () => {
    const classes = useStyles()
    const user_id = getUserId()
    const dispatch = useDispatch()
    const { data: reservations, loading, error } = useSelector(state => state.reservations)

    // const {data: reservations, isPending, error} = useFetch(`${process.env.REACT_APP_BACKEND_URI}/reservations/user/${user_id}`)

    useEffect(() => {
        dispatch(getReservations(user_id))
    }, [dispatch])

    return (
        <Grow in>
            <Container maxWidth={"lg"} className={classes.root}>
                {loading ? (
                    <Grid container spacing={3}>
                        {[0,1,2,3,4,5,6,7].map((reservation) => (
                            <Grid item sx={12} md={4} lg={3} xl={3} key={reservation._id}>
                                <Skeleton variant="rect" width={250} height={90} animation="wave" className={classes.skeleton}/>
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
                {error && <div>{error}</div>}
                {(reservations && !loading) ? <UserReservations reservations={reservations} /> : null}
            </Container>
        </Grow>
    );
};

export default YourReservations;
