import {Button, Container, makeStyles, TextField, Typography} from "@material-ui/core";
import {useState} from "react";
import {useHistory} from "react-router";
import {KeyboardArrowRight} from "@material-ui/icons";

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    },
    container: {
        backgroundColor: 'white',
        marginTop: '3rem',
        padding: '3rem',
        WebkitBoxShadow: '-2px 1px 95px -13px rgba(196,196,196,1)',
        MozBoxShadow: '-2px 1px 95px -13px rgba(196,196,196,1)',
        boxShadow: '-2px 1px 95px -13px rgba(196,196,196,1)',
    }
})

const Auth = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [emailErrorDesc, setEmailErrorDesc] = useState('')
    const [passwordErrorDesc, setPasswordErrorDesc] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        setEmailError(false)
        setPasswordError(false)

        setEmailErrorDesc('')
        setPasswordErrorDesc('')

        fetch(`${process.env.REACT_APP_BACKEND_URI}/auth/login`, {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                const err = data.errors

                if (err.email !== '') {
                    setEmailError(true)
                    setEmailErrorDesc(err.email)
                }
                if (err.password !== '') {
                    setPasswordError(true)
                    setPasswordErrorDesc(err.password)
                }
            }
            if (data.user) {
                history.push('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Container size="sm" className={classes.container}>
            <Typography
                variant="h5"
                color="primary"
                component="h2"
                gutterBottom
            >
                Sign in to your account
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.field}
                           onChange={(e) => setEmail(e.target.value)}
                           label="Email Address"
                           variant="outlined"
                           color="primary"
                           fullWidth
                           required
                           error={emailError}
                           helperText={emailErrorDesc}
                />
                <TextField className={classes.field}
                           onChange={(e) => setPassword(e.target.value)}
                           label="Password"
                           variant="outlined"
                           color="primary"
                           type="password"
                           fullWidth
                           required
                           error={passwordError}
                           helperText={passwordErrorDesc}
                />

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    endIcon={<KeyboardArrowRight/>}>
                    Sign In
                </Button>

            </form>
        </Container>
    );
}

export default Auth;