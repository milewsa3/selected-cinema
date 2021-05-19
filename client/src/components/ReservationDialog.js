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


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
})

const ReservationDialog = (props) => {
    const classes = useStyles()
    const { onClose, selectedValue, open } = props

    const handleClose = () => {
        onClose(selectedValue);
    }

    return (
        <Dialog fullWidth={true} maxWidth="md" onClose={handleClose} aria-labelledby="reservation-dialog-title" open={open}>
            <DialogTitle id="reservation-dialog-title">
                <Typography variant="h4">
                    Reservation details
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                    lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                    scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                    auctor fringilla.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="textPrimary">
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