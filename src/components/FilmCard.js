import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Collapse,
    IconButton,
    Typography
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {red} from "@material-ui/core/colors";
import clsx from "clsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {InfoOutlined} from "@material-ui/icons";

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
    }

}))

export default function FilmCard({ film, handlePreview }) {
    const classes = useStyles(film)
    const [filmData, setFilmData] = useState({})
    const [expanded, setExpanded] = useState(false)
    const language = 'en-en'

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    function removeSpecialChars(string) {
        let result = string

        const specialCharacters = ['%']
        specialCharacters.map(character => {
            result = result.replace(character, '')
        })

        return result
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    useEffect(async () => {
        const title = removeSpecialChars(film.title)
        console.log(title)
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a11ffe1b32709f5551e64f4683d948a3&query=${title}&language=${language}`)
        const film_data = await res.json()
        const element = film_data.results[0]

        setFilmData(element)
    }, [])

    return(
        <div>
            <Card className={classes.root}>
                <CardActionArea onClick={() => openInNewTab(
                    'https://www.themoviedb.org/movie/' + filmData['id'] + '-' + removeSpecialChars(filmData['title']).replace(' ', '-')
                )}>
                    <CardMedia
                        component="img"
                        alt="Poster"
                        height="auto"
                        image={`https://image.tmdb.org/t/p/w${400}/${filmData['poster_path']}`}
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
        </div>
    )
}
