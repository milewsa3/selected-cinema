import React, {useState} from 'react';
import {Box, Button, Grid, Grow} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    dataPickerCard: {
        backgroundColor: 'white',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginBottom: theme.spacing(4),
    },
    box: {
        marginBottom: theme.spacing(4),
    },
}))

const FirstStep = () => {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = useState(Date.now());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Grow in>
            <Grid container spacing={3} flexDirection="column">
                <Box display='flex' flexDirection="column" alignItems="center" width="100%" className={classes.box}>
                    <div className={classes.dataPickerCard}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    {/*<Button variant="contained" color="primary">*/}
                    {/*    Search for films*/}
                    {/*</Button>*/}
                </Box>
            </Grid>
        </Grow>
    );
};

export default FirstStep;
