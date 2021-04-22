import {Container, Grid} from "@material-ui/core";
import {useEffect, useState} from "react";
import FilmCard from '../components/FilmCard'
import Masonry from 'react-masonry-css'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(7),
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '200px'
    }
}))

const Films = () => {
    const [films, setFilms] = useState([])
    const classes = useStyles()

    useEffect( () => {
            fetch('https://selected-cinema-backend.azurewebsites.net/movies')
                .then(res => res.json())
                .then(data => setFilms(data))

            // const language = 'en-en'
            //
            // const filteredFilms = films.filter((film) => {
            //     const title = film.title
            //     fetch(`https://api.themoviedb.org/3/search/movie?api_key=a11ffe1b32709f5551e64f4683d948a3&query=${title}&language=${language}`)
            //         .then(res => res.json())
            //         .then(data => !!data.results[0])
            // })
            //
            // setFilms(filteredFilms)
    }, [])

    const handlePreview = (id) => {
        console.log('redirecting to preview')
    }

    return (
        <Container className={classes.container} maxWidth="lg">
            <Grid container spacing={4} alignContent="center" justify="center">
                {films.map(film => (
                    <Grid item sx={12} md={4} lg={3} xl={3} key={film._id} className={classes.grid}>
                        <FilmCard film={film} handlePreview={handlePreview} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
 
export default Films;