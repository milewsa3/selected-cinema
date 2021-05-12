import React, {useEffect} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import {useDispatch, useSelector} from "react-redux";
import {getMoviesByDateAction} from "../../actions/reservationMoviesActions";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        marginBottom: theme.spacing(4),
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    header: {
        display: "flex",
        alignItems: "center",
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default
    },
    img: {
        height: 450,
        display: "block",
        maxWidth: 300,
        overflow: "hidden",
        width: "100%"
    },
    button: {
        margin: "0 auto",
        marginTop: theme.spacing(4)
    }
}));

const SecondStep = ({ setSelectedFilm, selectedDate }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch()
    const resMovies = useSelector(state => state.resMovies)

    useEffect(() => {
        const date = new Date(selectedDate)
        dispatch(getMoviesByDateAction(date))

        // eslint-disable-next-line
    }, [selectedDate]);

    useEffect( () => {
        if (resMovies && resMovies.data && resMovies.data.length !== 0) {
            setSelectedFilm(resMovies?.data[activeStep])
        } else {
            setSelectedFilm(null)
        }
    })


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <>
            {resMovies.loading && <div>Loading ...</div>}
            {resMovies.error && <div>{resMovies.error}</div>}
            {(resMovies.data && resMovies.data.length !== 0) ? (
                <div className={classes.root}>
                    <Paper square elevation={0} className={classes.header}>
                        <Typography>{resMovies.data[activeStep].title}</Typography>
                    </Paper>
                    <SwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {resMovies.data.map((step, index) => (
                            <div key={step.title}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <img
                                        className={classes.img}
                                        src={`https://image.tmdb.org/t/p/w${300}/${step.TMDB['poster_path']}`}
                                        alt={step.title}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </SwipeableViews>
                    <MobileStepper
                        steps={resMovies.data.length}
                        position="static"
                        variant="text"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === resMovies.data.length - 1}
                            >
                                Next
                                {theme.direction === "rtl" ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === "rtl" ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                            </Button>
                        }
                    />
                </div>
            ) : (
                <>
                    {!resMovies.loading && <div>No films available right now</div>}
                </>
            )}
        </>
    );
};

export default SecondStep;
