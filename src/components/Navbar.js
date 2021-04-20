import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const useStyles = makeStyles({
    topNav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "3rem 6rem"
    },
    links: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '30vw',
        '& *': {
            textDecoration: 'none',
            color: 'white',
            fontSize: '1.2rem',
            transition: 'all 0.2s'
        }
    },
    logo: {
        textDecoration: 'none',
        color: 'white'
    },
    active: {
        color: 'grey'
    }
})

export default function Layout() {
    const classes = useStyles()
    const location = useLocation()

    return(
        <div>
            <nav className={classes.topNav}>
                <Typography variant="h2" component="h4">
                    <NavLink exact to="/" className={classes.logo}>Selected</NavLink>
                </Typography>
                <div className={classes.links}>
                    <NavLink exact to="/" activeClassName={classes.active}>Home</NavLink>
                    <NavLink to="/films" activeClassName={classes.active}>Films</NavLink>
                    <NavLink to="/about" activeClassName={classes.active}>About</NavLink>
                    <NavLink to="/signup" activeClassName={classes.active}>Sign up</NavLink>
                </div>
            </nav>
        </div>
    );
}