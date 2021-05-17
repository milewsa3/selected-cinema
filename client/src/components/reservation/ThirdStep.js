import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getScreeningsTimeAction} from "../../actions/resMoviesTimeActions";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '160px',
    },
    box: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const ThirdStep = ( { selectedTime, setSelectedTime, selectedFilm, selectedDate } ) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const resMoviesTime = useSelector(state => state.resMoviesTime)

    useEffect(() => {
        if (selectedFilm !== null)
            dispatch(getScreeningsTimeAction(new Date(selectedDate), selectedFilm?._id))

        // setSelectedTime('')
    }, []);

    const getTimeFromDate = (date) => {
        if (!(date instanceof Date))
            date = new Date(date)

        return date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'})
    }

    if (selectedFilm === null) {
        return (
            <div>
                No film has been selected
            </div>
        )
    }

    return (
        <>
            {resMoviesTime.loading && <div>Loading...</div>}
            {resMoviesTime.error && <div>{resMoviesTime.error}</div>}
            {resMoviesTime.data && (
                <Box display='flex' justifyContent="center" width="100%" className={classes.box}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Available hours</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={resMoviesTime.data.includes(selectedTime) ? selectedTime : ''}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            {resMoviesTime.data.map(time => (
                                <MenuItem key={time} value={time}>{getTimeFromDate(time)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            )}
        </>
    );
};

export default ThirdStep;
