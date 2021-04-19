import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

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
        '& a': {
            textDecoration: 'none',
            color: 'white',
            fontSize: '1.2rem',
            transition: 'all 0.2s'
        }
    }
})

export default function Layout() {
    const classes = useStyles();

    return(
        <div>
            <nav className={classes.topNav}>
                <Typography variant="h2" component="h4">Selected</Typography>
                <div className={classes.links}>
                    <a href="#" class="link">Home</a>
                    <a href="#" class="link">Films</a>
                    <a href="#" class="link">About</a>
                    <a href="#" class="link">Sign up</a>
                </div>
            </nav>
        </div>
    );
}