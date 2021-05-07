import React, {useState} from 'react';
import {Button, Container, Grid, Grow, Paper, Snackbar, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
    },
    mainCards: {
        marginBottom: theme.spacing(14),
    },
    card: {
        height: theme.spacing(30),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
        transitionTimingFunction: 'ease-in-out',
        '&:hover': {
            backgroundColor: 'grey',
            cursor: 'pointer',
        }
    },
    newsletter: {
        width: theme.spacing(50),
        height: theme.spacing(40),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        margin: '0 auto',
        '& > *': {
            marginBottom: theme.spacing(3)
        }
    },
    newsletterWord: {
        fontWeight: 'bold'
    },
    newsletterLabel: {
        marginBottom: theme.spacing(16)
    }
}))

const Dashboard = () => {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [snackBarInfo, setSnackBarInfo] = useState('initState');

    const signUpToNewsletter = () => {
        console.log('sending newsletter to', email)
        setEmail('')
        setSeverity('success')
        setSnackBarInfo('Successfully signed up to newsletter!')
        openSnackbar()
    }

    const openSnackbar = () => {
        setOpen(true)
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grow in className={classes.mainCards}>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.card} elevation={8}>
                            <Typography variant="h4">
                                Your reservations
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.card} elevation={8}>
                            <Typography variant="h4">
                                Available films
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.card} elevation={8}>
                            <Typography variant="h4">
                                Contact support
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.card} elevation={8}>
                            <Typography variant="h3">
                                Make reservation!
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grow>

            <Grow in>
                <Paper sm={12} md={4} elevation={8} className={classes.newsletter}>
                    <Typography variant="h4" className={classes.newsletterLabel}>
                        Sign up to <div className={classes.newsletterWord}>newsletter</div>
                    </Typography>
                    <TextField
                        label="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    >
                    </TextField>
                    <Button
                        variant='contained'
                        color="primary"
                        onClick={signUpToNewsletter}
                    >
                        Sign up
                    </Button>
                </Paper>
            </Grow>
            <Snackbar open={open} autoHideDuration={5000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={closeSnackbar} severity={severity}>
                    {snackBarInfo}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Dashboard;
