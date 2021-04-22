import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {useEffect, useState} from "react";

const useStyles = makeStyles(theme => ({
    filmCard: {
    }
}))

export default function FilmCard({ film, handlePreview }) {
    const classes = useStyles(film)
    const [filmData, setFilmData] = useState({})
    const language = 'en-en'
    console.log('null?', film == null)

    useEffect(async () => {
        const title = film.title
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a11ffe1b32709f5551e64f4683d948a3&query=${title}&language=${language}`)
        const film_data = await res.json()
        const element = film_data.results[0]

        if (element)
            setFilmData(element)
    }, [])

    return(
        <div>
            {filmData['title']}
        </div>
    )
}
