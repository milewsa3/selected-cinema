import React, {useState} from 'react';
import {Box, Button, Container, Grid, Grow, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    mainContainer: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    stepsContainer: {
        width: '90%',
        marginTop: theme.spacing(2),
    },
    dataPickerCard: {
        backgroundColor: 'white',
        borderRadius: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '0px',
        width: '40%',
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            width: '80%'
        }
    },
    stepLabel: {
        marginBottom: theme.spacing(4)
    },
    box: {
        width: '100%',
        marginBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}))

function MakeReservation(props) {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = useState(Date.now());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Grow in>
            <Container maxWidth="lg" className={classes.mainContainer}>
                <Typography align="flex-start" variant="h3">
                    Make reservation!
                </Typography>
                <Container className={classes.stepsContainer}>
                    <Typography variant="h5" className={classes.stepLabel}>
                        1. Choose date
                    </Typography>
                    <Grow in>
                        <Grid container spacing={3} flexDirection="column">
                            <Box className={classes.box}>
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
                                <Button variant="contained" color="primary">
                                    Search for films
                                </Button>
                            </Box>
                        </Grid>
                    </Grow>
                    <Typography variant="h5">
                        2. Choose film
                    </Typography>
                </Container>

            </Container>
        </Grow>
    );
}

export default MakeReservation;