import {
    AppBar,
    Avatar,
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
import {Link, NavLink, useHistory, useLocation} from "react-router-dom";

import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useDispatch} from "react-redux";
import decode from 'jwt-decode'
import {LOGOUT} from "../constants/actionTypes";
import {deepPurple} from "@material-ui/core/colors";

const useStyles = makeStyles( (theme) => ({
    topNav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "1.0rem 4rem"
    },
    links: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& *': {
            textDecoration: 'none',
            color: 'white',
            fontSize: '1.2rem',
            transition: 'all 0.2s',
            marginLeft: '15px',
            marginRight: '15px',
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
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])


    const handleDrawerOpen = () => {
        setMenuOpened(true)
    }

    const handleDrawerClose = () => {
        setMenuOpened(false)
    }

    const tabsForNotLoggedInUsers = [
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

    const tabsForLoggedInUsers = [
        {
            title: 'Dashboard',
            path: '/dashboard',
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
                {user ? (
                    <>
                        {tabsForLoggedInUsers.map((tab, index) => (
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
                        <ListItem
                            button
                            key={"logout"}
                        >
                            <div className={classes.mobileItem} onClick={logout}>
                                <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </div>
                        </ListItem>
                    </>
                ) : (
                    <>
                        {tabsForNotLoggedInUsers.map((tab, index) => (
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
                        <ListItem
                            button
                            key="sign up"
                        >
                            <NavLink exact to={"/auth"} activeClassName={classes.active} className={classes.mobileItem}>
                                <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                                <ListItemText primary="Sign up" />
                            </NavLink>
                        </ListItem>
                    </>
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
                        {user ? (
                            <>
                                {tabsForLoggedInUsers.map(tab => (
                                    <NavLink exact to={tab.path} activeClassName={classes.active} key={tab.title}>{tab.title}</NavLink>
                                ))}
                                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                                <Typography variant="h6" className={classes.userName}>{user.result.name}</Typography>
                                <Button size="small" variant="contained" color="secondary" onClick={logout} className={classes.logoutBtn}>Logout</Button>
                            </>
                        ) : (
                            <>
                                {tabsForNotLoggedInUsers.map(tab => (
                                    <NavLink exact to={tab.path} activeClassName={classes.active} key={tab.title}>{tab.title}</NavLink>
                                ))}
                                <Button size="small" component={Link} to="/auth" variant="contained" color="secondary">Sign up</Button>
                            </>
                        )}
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}