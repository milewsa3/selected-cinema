import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import ReservationCard from "./ReservationCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
    },
}))

const UserReservations = ({reservations}) => {
    const classes = useStyles()

    return (
        <div>
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
        </div>
    );
};


export default UserReservations;
