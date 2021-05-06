import {makeStyles} from "@material-ui/core/styles";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    IconButton,
    Typography
} from "@material-ui/core";
import {useState} from "react";
import clsx from "clsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useFetch from "../utils/useFetch";
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 200,
        boxShadow: '15px 15px 16px 0px rgba(0,0,0,0.75)'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    skeleton: {
        backgroundColor: '#404040',
        opacity: '0.7'
    }

}))

export default function FilmCard({ film }) {
    const classes = useStyles(film)
    const [expanded, setExpanded] = useState(false)
    let filmData = null

    function removeSpecialChars(string) {
        let result = string

        const specialCharacters = ['%']
        specialCharacters.forEach(character => {
            result = result.replace(character, '')
        })

        return result
    }

    const setFilmData = (data) => {
        filmData = data
    }

    let { data, error, isPending } =
        useFetch(`https://api.themoviedb.org/3/search/movie?api_key=a11ffe1b32709f5551e64f4683d948a3&query=${removeSpecialChars(film.title)}&language=${'en-en'}`)

    if (data) {
        if (data.results[0]) {
            setFilmData(data.results[0])
        } else {
            error = {message: 'There is no such film like: ' + film.title}
        }
    }

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return(
        <div>
            { isPending && <Skeleton variant="rect" width={168} height={420} animation="wave" className={classes.skeleton}/> }
            { error && <div>{ error }</div> }
            { data && (
                <Card className={classes.root}>
                    <CardActionArea onClick={() => openInNewTab(
                        'https://www.themoviedb.org/movie/' + filmData['id'] + '-' + removeSpecialChars(filmData['title']).replace(' ', '-')
                    )}>
                        <CardMedia
                            component="img"
                            alt="Poster"
                            height="auto"
                            image={`https://image.tmdb.org/t/p/w${300}/${filmData['poster_path']}`}
                            title={filmData['title']}
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {filmData['title']}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>{filmData['overview']}</Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            )}
        </div>
    )
}
