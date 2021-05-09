import React, {useEffect} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import {getMoviesByDate} from "../../api";

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

const availableMovies = [
    {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6OnlqShdRinhJwV1uGiRE70lD63.jpg"
    },
    {
        label: "Bird",
        imgPath:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zvugkRK6vpbPBv63jETof2ZIf9f.jpg"
    },
    {
        label: "Bali, Indonesia",
        imgPath:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/dkokENeY5Ka30BFgWAqk14mbnGs.jpg"
    },
    {
        label: "NeONBRAND Digital Marketing, Las Vegas, United States",
        imgPath:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/Q1ZYG3kDS8iVIHOYOJ9NQmV0q7.jpg"
    },
    {
        label: "Goč, Serbia",
        imgPath:
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/340AAxjvtGXChWkqhIlScZTSokq.jpg"
    }
];

const SecondStep = ({selectedFilm, setSelectedFilm, selectedDate}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = availableMovies.length;

    useEffect(async () => {
        console.log(new Date(selectedDate))
        const movies = await getMoviesByDate(new Date(selectedDate))
        console.log(movies)
    }, []);


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
        <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
                <Typography>{availableMovies[activeStep].label}</Typography>
            </Paper>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {availableMovies.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img
                                className={classes.img}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </SwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
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
    );
};

export default SecondStep;
