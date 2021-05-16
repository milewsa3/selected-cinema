import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
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
    empty: {
        backgroundColor: '#0a7d00',
        transition: 'all 0.2s',
        '&:hover': {
            cursor: 'pointer',
            opacity: '0.8'
        }
    },
    taken: {
        backgroundColor: '#a6000b'
    },
    unavailable: {
        backgroundColor: '#757575'
    },
    selected: {
        opacity: '0.8',
        backgroundColor: 'black',
    }
}));

const Seat = ({number, variant, onClick}) => {
    const classes = useStyles()
    const [selected, setSelected] = useState(false)

    const clickEvent = () => {
        setSelected(prevState => !prevState)
        onClick(number)
    }

    switch (variant) {
        case "empty":
            return <div key={number} className={clsx(classes.seat, classes.empty, selected && classes.selected)} onClick={() => clickEvent()}>{number}</div>
        case "taken":
            return <div key={number} className={clsx(classes.seat, classes.taken)}>{number}</div>
        case "unavailable":
            return <div key={number} className={clsx(classes.seat, classes.unavailable)}>{number}</div>
        default:
            return <div>Wrong variant</div>
    }
};

export default Seat;
