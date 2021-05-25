import React from 'react';
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    box: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const FifthStep = ({ selectedTime, selectedFilm, selectedSeats }) => {
    const classes = useStyles()

    if (!selectedFilm || !selectedTime || selectedSeats.length === 0) {
        return (
            <Box display='flex' flexDirection="column" justifyContent="center" width="100%" className={classes.box}>
                {!selectedTime && <div>Time has not been set up</div>}
                {!selectedFilm && <div>Film has not been set up</div>}
                {selectedSeats.length === 0 && <div>Seats has not been set up</div>}
            </Box>
        )
    }

    return (
        <Box display='flex' flexDirection="column" justifyContent="center" width="100%" className={classes.box}>
            <Typography variant="h4" gutterBottom={true}>Confirmation</Typography>
            <Typography variant="body1" component="span">{"Date: " }<Box fontWeight='bold' display='inline'>{`${new Date(selectedTime).toLocaleString()}`}</Box></Typography>
            <Typography variant="body1" component="span">{"Film: "}<Box fontWeight='bold' display='inline'>{selectedFilm.title}</Box></Typography>
            <Typography variant="body1" component="span">
                {"Selected seats: "}
                <Box fontWeight='bold' display='inline'>{selectedSeats.join(', ')}</Box>
            </Typography>
        </Box>
    );
};

export default FifthStep;
