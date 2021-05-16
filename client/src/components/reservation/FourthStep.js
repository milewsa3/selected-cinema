import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grow} from "@material-ui/core";
import Seats from "./Seats";

const useStyles = makeStyles((theme) => ({
    box: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    seat: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        margin: theme.spacing(1),
        border: '5px solid grey',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seatRow: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

const FourthStep = () => {
    const classes = useStyles()

    const seatRow = []
    const seats = []
    for (let i = 1;i <= 10; i++) {
        seatRow.push(<div key={i} className={classes.seat}>{i}</div>)
    }

    for (let i = 1; i<= 4; i++) {
        seats.push(<div className={classes.seatRow}>{seatRow}</div>)
    }

    return (
        <Grow in>
            <Box display='flex' justifyContent="center" width="100%" className={classes.box}>
                <Seats />
            </Box>
        </Grow>
    );
};

export default FourthStep;
