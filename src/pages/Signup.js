import {Button, Container, IconButton, Input, InputAdornment, TextField, Typography} from "@material-ui/core";
import {useState} from "react";
import {useHistory} from "react-router";
import {makeStyles} from '@material-ui/core'
import {KeyboardArrowRight, Visibility, VisibilityOff} from "@material-ui/icons";

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

const Signup = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [fullNameError, setFullNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [fullNameErrorDesc, setFullNameErrorDesc] = useState('')
    const [emailErrorDesc, setEmailErrorDesc] = useState('')
    const [passwordErrorDesc, setPasswordErrorDesc] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setFullNameError(false)
        setEmailError(false)
        setPasswordError(false)

        setFullNameErrorDesc('')
        setEmailErrorDesc('')
        setPasswordErrorDesc('')

        console.log('fetching')

        fetch(`${process.env.REACT_APP_BACKEND_URI}/users`, {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ fullName, email, password })
        }).then(res => res.json())
          .then(data => {
              if (data.errors) {
                  const err = data.errors

                  if (err.fullName !== '') {
                      setFullNameError(true)
                      setFullNameErrorDesc(err.fullName)
                  }
                  if (err.email !== '') {
                      setEmailError(true)
                      setEmailErrorDesc(err.email)
                  }
                  if (err.password !== '') {
                      setPasswordError(true)
                      setPasswordErrorDesc(err.password)
                  }
              } else {
                  history.push('/')
              }
          })
          .catch(err => {
              console.log(err)
          })

    }

    function handleClickShowPassword() {
        setShowPassword(true)
    }

    function handleMouseDownPassword() {
        setShowPassword(false)
    }

    return (
        <Container size="sm" className={classes.container}>
            <Typography
                variant="h5"
                color="primary"
                component="h2"
                gutterBottom
            >
                Sign Up
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.field}
                           onChange={(e) => setFullName(e.target.value)}
                           label="Full Name"
                           variant="outlined"
                           color="primary"
                           fullWidth
                           required
                           error={fullNameError}
                           helperText={fullNameErrorDesc}
                />
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
                           fullWidth
                           required
                           error={passwordError}
                           helperText={passwordErrorDesc}
                           type="password"
                />

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    endIcon={<KeyboardArrowRight/>}>
                    Sign Up
                </Button>

            </form>
        </Container>
    );
}

export default Signup;