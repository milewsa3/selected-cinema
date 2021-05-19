import React from 'react';
import {Box, Container, Grow, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        color: 'white',
    }
}))

const boldFont = (text) => {
    return (<Box fontWeight='bold' display='inline'>{`${text}`}</Box>)
}

const info = [
    {
        name: 'Company name',
        value: 'Selected S.A'
    },
    {
        name: 'Opening hours',
        value: 'Monday - Sunday 0:00-23:00'
    },
    {
        name: 'Address',
        value: '1745 E  103RD\nLOS ANGELES CA 90002-3929\nUSA'
    },
    {
        name: 'Email',
        value: 'support@selected.com'
    },
    {
        name: 'Telephone',
        value: '500736991'
    },
    {
        name: 'NIP',
        value: '9121477740'
    },
    {
        name: 'Bank',
        value: '97 1950 0001 2006 0263 5679 0002'
    }
]

const Contact = () => {
    const classes = useStyles()
    return (
        <Grow in>
            <Container maxWidth="lg" className={classes.root}>
                <Typography variant="h2" gutterBottom={true}>Contact us!</Typography>
                {info.map(el => (
                    <div>
                        <Typography variant="body1" key={el.name}>{`${el.name}: `}{boldFont(el.value)}</Typography>
                    </div>
                ))}
            </Container>
        </Grow>
    );
};

export default Contact;
