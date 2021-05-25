import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grow} from "@material-ui/core";
import Seats from "./Seats";
import {useDispatch, useSelector} from "react-redux";
import {getScreeningAction} from "../../actions/resMoviesSeatActions";

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

const FourthStep = ({selectedTime, selectedFilm, setSelectedSeats}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const resMoviesSeat = useSelector(state => state.resMoviesSeat)

    useEffect(() => {
        if (selectedTime && selectedFilm) {
            dispatch(getScreeningAction(new Date(selectedTime), selectedFilm._id))
        }
    }, [dispatch, selectedFilm, selectedTime])

    if (selectedTime === "" || selectedFilm === null) {
        return (
            <div>
                Previous steps have not been set up correctly
            </div>
        )
    }

    return (
        <>
            {resMoviesSeat.loading && <div>Loading...</div>}
            {resMoviesSeat.data && (
                <Grow in>
                    <Box display='flex' justifyContent="center" width="100%" className={classes.box}>
                        <Seats setSelectedSeats={setSelectedSeats} available_seats={resMoviesSeat.data[0].available_seats} />
                    </Box>
                </Grow>
            )}
        </>
    );
};

export default FourthStep;
