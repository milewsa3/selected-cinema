import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import Typography from "@material-ui/core/Typography";
import {Box, DialogActions, DialogContent} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import boldFont from "../utils/boldFont";


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
})

const ReservationDialog = (props) => {
    const classes = useStyles()
    const { onClose, open, reservation } = props

    const handleClose = () => {
        onClose();
    }

    const handleCancellation = async () => {

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/reservations/${reservation._id}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                throw Error('Something went wrong')
            }
        } catch (err) {
            console.log(err)
        }

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