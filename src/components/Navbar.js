import {
    AppBar,
    Divider,
    Drawer, IconButton, Link,
    List,
    ListItem,
    ListItemIcon,
    Toolbar,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, {useEffect, useState} from "react";
import { NavLink, useLocation } from "react-router-dom";

import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';

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
    const classes = useStyles()
    const location = useLocation()
    const theme = useTheme()
    const mobileMenu = useMediaQuery(theme.breakpoints.down('sm'))
    const [menuOpened, setMenuOpened] = useState(false)

    const handleDrawerOpen = () => {
        setMenuOpened(true)
    }

    const handleDrawerClose = () => {
        setMenuOpened(false)
    }

    const notLoggedUsersTabs = [
        {
            title: 'Home',
            path: '/',
            icon: <HomeIcon />,
        },
        {
            title: 'Films',
            path: '/films',
            icon: <MovieFilterIcon />,
        },
        {
            title: 'About',
            path: '/about',
            icon: <InfoIcon />,
        },
        {
            title: 'Sign In',
            path: '/login',
            icon: <AddToHomeScreenIcon/>,
        },
        {
            title: 'Sign Up',
            path: '/signup',
            icon: <VpnKeyIcon />
        },
    ]

    const loggedUsersTabs = [
        {
            title: 'Home',
            path: '/',
            icon: <HomeIcon />,
        },
        {
            title: 'Films',
            path: '/films',
            icon: <MovieFilterIcon />,
        },
        {
            title: 'About',
            path: '/about',
            icon: <InfoIcon />,
        },
        {
            title: 'Logout',
            path: '/logout',
            icon: <CallMissedOutgoingIcon />
        }
    ]

    const [tabs, setTabs] = useState(notLoggedUsersTabs)


    useEffect(() => {
        setTabs(JSON.parse(localStorage.getItem('user')) ? loggedUsersTabs : notLoggedUsersTabs)
    }, [location])

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => handleDrawerClose()}
        >
            <List>
                {tabs.map((tab) => (
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

                {mobileMenu ? (
                    <div>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => handleDrawerOpen()}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={menuOpened} onClose={() => handleDrawerClose()}>
                            {list()}
                        </Drawer>
                    </div>
                    )
                    :
                    (
                    <div className={classes.links}>
                        {tabs.map(tab => (
                            <NavLink exact to={tab.path} activeClassName={classes.active} key={tab.title}>{tab.title}</NavLink>
                        ))}
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}