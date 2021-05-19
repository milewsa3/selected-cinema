import React from 'react';
import {Box, Card, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 250,
        padding: theme.spacing(2),
    },
}))

const ReservationCard = ({reservation}) => {
    const classes = useStyles()

    return (
        <Card className={classes.root} raised={true}>
            <Typography variant="body1" component="p" align="center">{"Film: "}<Box fontWeight='bold' display='inline'>{reservation.movie.title}</Box></Typography>
            <Divider variant="middle" />
            <Typography variant="body1" component="p" align="center">{"Date: " }<Box fontWeight='bold' display='inline'>{`${new Date(reservation.date).toLocaleString()}`}</Box></Typography>
            <Divider variant="middle" />
            <Typography variant="body1" component="p" align="center">
                {"Selected seats: "}
                <Box fontWeight='bold' display='inline'>{reservation.seats.join(', ')}</Box>
            </Typography>
        </Card>
    );
};

export default ReservationCard;
