import React from 'react';
import Seat from "./Seat";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& *': {
            display: 'flex',
            justifyContent: 'center',
        }
    },
    seatRow: {
    },
    screen: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: '2rem',
        marginBottom: theme.spacing(4),
        padding: theme.spacing(1)
    }
}));

const Seats = () => {
    const classes = useStyles()
    const numberOfRows = 5

    const seatRows = []
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 1; j<= 10; j++) {
            seatRows.push(<Seat number={j + 10 * i} variant="empty" onClick={(number) => console.log(number)}/>)
        }
    }

    const seats = []
    for (let i = 0; i< numberOfRows; i++) {
        seats.push(<div className={classes.seatRow} key={i * 1765}>{seatRows.splice(0, 10)}</div>)
    }


    return (
        <Box display='flex' flexDirection="column" justifyContent="center" className={classes.root}>
            <div className={classes.screen}>Screen</div>
            {seats}
        </Box>
    );
};

export default Seats;
