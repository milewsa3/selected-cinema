import {Container, Typography, useMediaQuery} from "@material-ui/core";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import React from "react";
import clsx from "clsx";
import BottomFooter from "../components/BottomFooter";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'black',
        boxShadow: '10px 10px 10px 1px rgba(0,0,0,0.75)'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& video': {
            zIndex: '1',
            height: '85vh',
            objectFit: 'cover'
        }
    },
    centerLabel: {
        position: 'absolute',
        zIndex: '1'
    },
    discover: {
        backgroundColor: 'white',
        borderRadius: '90px',
        color: 'black',
        height: '50vh',
        marginTop: theme.spacing(10),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        WebkitBoxShadow: '-2px 1px 95px -13px rgba(196,196,196,1)',
        MozBoxShadow: '-2px 1px 95px -13px rgba(196,196,196,1)',
        boxShadow: '-2px 1px 95px -13px rgba(196,196,196,1)',
        [theme.breakpoints.down('md')]: {
            height: '25vh'
        },
        [theme.breakpoints.down('sm')]: {
            width: '75vw'
        }
    },
    left: {
        marginRight: theme.spacing(6)
    },
    right: {
        marginLeft: theme.spacing(6),
        [theme.breakpoints.down('md')]: {
            marginLeft: 0
        }
    },
    marginBottom: {
        marginBottom: theme.spacing(8),
        [theme.breakpoints.down('md')]: {
            marginRight: 0
        }
    },
    mobileTypography: {
        fontSize: '2rem',
    }
}))

export default function Home() {
    const classes = useStyles()
    const theme = useTheme()
    const mobileSize = useMediaQuery(theme.breakpoints.down('sm'))

    return(
        <div>
            <Container disableGutters={true} className={classes.container} maxWidth={false}>
                <div className={classes.logo}>
                    <video width="100%" height='auto' autoPlay loop muted>
                        <source src="./videos/dark_clouds.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Typography variant='h1' component='h2' className={classes.centerLabel}>Watch.</Typography>
                </div>
            </Container>
            <Container
                className={clsx(
                classes.discover,
                classes.left
            )}
                maxWidth="sm"
            >
                <Typography variant='h4' component='h4' className={clsx(mobileSize && classes.mobileTypography)}>
                    Discover new films
                </Typography>
            </Container>
            <Container className={clsx(
                classes.discover,
                classes.right
            )} maxWidth="sm">
                <Typography variant='h3' component='h4' className={clsx(mobileSize && classes.mobileTypography)}>
                    Change your mind
                </Typography>
            </Container>
            <Container className={clsx(
                classes.discover,
                classes.marginBottom
            )} maxWidth="sm">
                <Typography variant='h2' component='h4' className={clsx(mobileSize && classes.mobileTypography)}>
                    Relief stress
                </Typography>
            </Container>
            <BottomFooter />
        </div>
    );
}