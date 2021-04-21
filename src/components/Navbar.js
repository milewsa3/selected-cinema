import {AppBar, Toolbar, Typography, useMediaQuery} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Drawer from './Drawer'

const useStyles = makeStyles( (theme) => ({
    topNav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "2rem 4rem"
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
        color: 'gray'
    }
}))

export default function Navbar() {
    const classes = useStyles()
    const location = useLocation()
    const theme = useTheme()
    const mobileMenu = useMediaQuery(theme.breakpoints.down('sm'))

    return(
        <AppBar color={"secondary"} position={'sticky'}>
            <Toolbar className={classes.topNav}>
                <Typography variant="h2" component="h4">
                    <NavLink exact to="/" className={classes.logo}>Selected</NavLink>
                </Typography>

                {mobileMenu ? <Drawer /> : (
                    <div className={classes.links}>
                        <NavLink exact to="/" activeClassName={classes.active}>Home</NavLink>
                        <NavLink to="/films" activeClassName={classes.active}>Films</NavLink>
                        <NavLink to="/about" activeClassName={classes.active}>About</NavLink>
                        <NavLink to="/signup" activeClassName={classes.active}>Sign up</NavLink>
                    </div>
                )}

            </Toolbar>
        </AppBar>
    );
}