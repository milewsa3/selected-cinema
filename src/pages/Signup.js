import {Button, Container, TextField, Typography} from "@material-ui/core";
import {useState} from "react";
import {useHistory} from "react-router";
import {makeStyles} from '@material-ui/core'
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

const Signup = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorDesc, setUsernameErrorDesc] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorDesc, setPasswordErrorDesc] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submit")
    }

    return (
        <Container size="sm" className={classes.container}>
            <Typography
                variant="h4"
                color="secondary"
                component="h2"
                gutterBottom
            >
                Register
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.field}
                           onChange={(e) => setUsername(e.target.value)}
                           label="Username"
                           variant="outlined"
                           color="secondary"
                           fullWidth
                           required
                           error={usernameError}
                           helperText={usernameErrorDesc}
                />
                <TextField className={classes.field}
                           onChange={(e) => setPassword(e.target.value)}
                           label="Password"
                           variant="outlined"
                           color="secondary"
                           fullWidth
                           required
                           error={passwordError}
                           helperText={passwordErrorDesc}
                />

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<KeyboardArrowRight/>}>
                    Submit
                </Button>

            </form>
        </Container>
    );
}

export default Signup;