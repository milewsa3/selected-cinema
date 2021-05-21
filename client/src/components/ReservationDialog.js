import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from "@material-ui/core/Typography";
import {Box, DialogActions, DialogContent} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import boldFont from "../utils/boldFont";
import {useDispatch} from "react-redux";
import {deleteReservation} from "../actions/reservationActions";


const ReservationDialog = (props) => {
    const { onClose, open, reservation } = props
    const dispatch = useDispatch()

    const handleClose = () => {
        onClose();
    }

    const handleCancellation = async () => {
        dispatch(deleteReservation(reservation._id))
        onClose()
    }

    const content = [
        {
            name: 'Film title',
            value: reservation.movie.title
        },
        {
            name: 'Film description',
            value: reservation.movie.TMDB.overview
        },
        {
            name: 'Release date',
            value: reservation.movie.TMDB.release_date
        },
        {
            name: 'Date of screening',
            value: new Date(reservation.date).toLocaleString()
        },
        {
            name: 'Selected seats',
            value: reservation.seats.join(', ')
        }
    ]

    return (
        <Dialog fullWidth={true} maxWidth="md" onClose={handleClose} aria-labelledby="reservation-dialog-title" open={open}>
            <DialogTitle id="reservation-dialog-title">
                <Typography variant="h4">
                    Reservation details
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                {content.map(el => (
                    <Typography gutterBottom key={el.name}>
                        {boldFont(`${el.name}: `)}{el.value}
                    </Typography>
                ))}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancellation} color="textPrimary">
                    <Box color='red' display='inline'>{'Cancel reservation'}</Box>
                </Button>
                <Button onClick={handleClose} color="textPrimary">
                    <Box fontWeight='bold' display='inline'>{"Exit"}</Box>
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ReservationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    reservation: PropTypes.object.isRequired,
}

export default ReservationDialog