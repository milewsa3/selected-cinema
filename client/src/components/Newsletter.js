import React, {useState} from 'react';
import {Button, Grow, Paper, Snackbar, TextField, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    newsletter: {
        width: theme.spacing(50),
        height: theme.spacing(40),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
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

const Newsletter = () => {
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
        <div>
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
        </div>
    );
};

export default Newsletter;
