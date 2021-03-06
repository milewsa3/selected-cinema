import {Avatar, Button, Container, Grid, makeStyles, Paper, Typography} from '@material-ui/core';
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {useDispatch, useSelector} from "react-redux";
import {AUTH_CLEARED, AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS} from "../constants/actionTypes";
import {signin, signup} from "../actions/authActions";
import {GoogleLogin} from 'react-google-login'
import AuthInput from "../components/AuthInput";
import GoogleIcon from '../utils/googleIcon'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    googleButton: {
        marginBottom: theme.spacing(2),
    },
}))

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const error = useSelector(state => state.auth.error)

    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
        dispatch({ type: AUTH_CLEARED })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword)
    }

    const switchMode = () => {
        setFormData(initialState)
        setIsSignup(prevIsSignup => !prevIsSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        dispatch({ type: AUTH_REQUEST })

        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: AUTH_SUCCESS, payload: { result, token } })
            history.push('/')
        } catch (error) {
            dispatch({ type: AUTH_FAILURE, error })
        }
    }

    const googleFailure = () => {
        alert('Google Sign In was unsuccessful. Try again later');
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={5}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <AuthInput
                                        name="firstName"
                                        label="First Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                        error={Boolean(error?.firstName)}
                                        helperText={error?.firstName}
                                    />
                                    <AuthInput
                                        name="lastName"
                                        label="Last Name"
                                        handleChange={handleChange}
                                        half
                                        error={Boolean(error?.lastName)}
                                        helperText={error?.lastName}
                                    />
                                </>
                            )
                        }
                        <AuthInput name="email" label="Email Address" handleChange={handleChange} type="email" error={Boolean(error?.email)} helperText={error?.email}/>
                        <AuthInput name="password" label="Password" handleChange={handleChange} error={Boolean(error?.password)} helperText={error?.password} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <AuthInput name="confirmPassword" label="Repeat Password" handleChange={handleChange} error={Boolean(error?.confirmPassword)} helperText={error?.confirmPassword} type="password"/> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<GoogleIcon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="center">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up' }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;