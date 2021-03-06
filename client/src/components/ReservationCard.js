import React from 'react';
import {Box, Card, CardActionArea, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ReservationDialog from "./ReservationDialog";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 280,
    },
    actionArea: {
        padding: theme.spacing(3),
        height: '100%'
    }
}))

const ReservationCard = ({reservation}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Card className={classes.root} raised={true}>
            <CardActionArea className={classes.actionArea} onClick={handleClickOpen}>
                <Typography variant="body1" component="span" align="center">{"Film: "}<Box fontWeight='bold' display='inline'>{reservation.movie.title}</Box></Typography>
                <Divider variant="middle" />
                <Typography variant="body1" component="span" align="center">{"Date: " }<Box fontWeight='bold' display='inline'>{`${new Date(reservation.date).toLocaleString()}`}</Box></Typography>
                <Divider variant="middle" />
                <Typography variant="body1" component="span" align="center">
                    {"Selected seats: "}
                    <Box fontWeight='bold' display='inline'>{reservation.seats.join(', ')}</Box>
                </Typography>
            </CardActionArea>
            <ReservationDialog reservation={reservation} open={open} onClose={handleClose} />
        </Card>
    );
};

export default ReservationCard;
