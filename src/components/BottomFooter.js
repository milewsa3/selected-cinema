import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    footer: {
        textAlign: 'center',
        padding: theme.spacing(6),
        backgroundColor: '#383838',
        boxShadow: '16px -11px 12px -1px rgba(0,0,0,0.75)'
    }
}))

export default function BottomFooter() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="h5">
                Selected S.A. &copy;
            </Typography>
        </footer>
    )
}