import {
    AppBar,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    Toolbar,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import React, {useEffect, useState} from "react";
import {NavLink, useHistory, useLocation, Link} from "react-router-dom";

import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useDispatch} from "react-redux";
import decode from 'jwt-decode'
import {LOGOUT} from "../constants/actionTypes";

const useStyles = makeStyles( (theme) => ({
    topNav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "1.5rem 4rem"
    },
    links: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '30vw',
        '& *': {
            textDecoration: 'none',
            color: 'white',
            fontSize: '1.2rem',
            transition: 'all 0.2s'
        }
    },
    clearLink: {
        textDecoration: 'none',
        color: 'white'
    },
    active: {
        color: 'gray'
    },
    list: {
        width: 220
    },
    mobileItem: {
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

export default function Navbar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const classes = useStyles()
    const theme = useTheme()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const isMobileMenu = useMediaQuery(theme.breakpoints.down('sm'))
    const [menuOpened, setMenuOpened] = useState(false)

    const logout = () => {
        dispatch({ type: LOGOUT })
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    const handleDrawerOpen = () => {
        setMenuOpened(true)
    }

    const handleDrawerClose = () => {
        setMenuOpened(false)
    }

    const tabs = [
        {
            title: 'Home',
            path: '/',
            icon: <HomeIcon />
        },
        {
            title: 'Films',
            path: '/films',
            icon: <MovieFilterIcon />
        },
        {
            title: 'About',
            path: '/about',
            icon: <InfoIcon />
        },
    ]

    const mobileMenu = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => handleDrawerClose()}
        >
            <List>
                {tabs.map((tab, index) => (
                    <ListItem
                        button
                        key={tab.title}
                    >
                        <NavLink exact to={tab.path} activeClassName={classes.active} className={classes.mobileItem}>
                            <ListItemIcon>{tab.icon}</ListItemIcon>
                            <ListItemText primary={tab.title} />
                        </NavLink>
                    </ListItem>
                ))}
                {user ? (
                    <ListItem
                        button
                        key="logout"
                    >
                        <NavLink exact to={"/logout"} activeClassName={classes.active} className={classes.mobileItem}>
                            <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </NavLink>
                    </ListItem>
                ) : (

                    <ListItem
                        button
                        key="sign up"
                    >
                        <NavLink exact to={"/auth"} activeClassName={classes.active} className={classes.mobileItem}>
                            <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                            <ListItemText primary="Sign up" />
                        </NavLink>
                    </ListItem>
                )}
            </List>
            <Divider />
        </div>
    )

    return(
        <AppBar color={"primary"} position={'sticky'}>
            <Toolbar className={classes.topNav}>
                <Typography variant="h2" component="h4">
                    <NavLink exact to="/" className={classes.clearLink}>Selected</NavLink>
                </Typography>

                {isMobileMenu ? (
                    <div>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => handleDrawerOpen()}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={menuOpened} onClose={() => handleDrawerClose()}>
                            {mobileMenu()}
                        </Drawer>
                    </div>
                    )
                    :
                    (
                    <div className={classes.links}>
                        {tabs.map(tab => (
                            <NavLink exact to={tab.path} activeClassName={classes.active}>{tab.title}</NavLink>
                        ))}
                        {user ? (
                            <Button component={Link} to="/logout" variant="contained" color="secondary" onClick={logout}>Logout</Button>
                        ) : (
                            <Button size="small" component={Link} to="/auth" variant="contained" color="secondary">Sign up</Button>
                        )}
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}