import {Container} from "@material-ui/core";
import {useEffect, useState} from "react";
import FilmCard from '../components/FilmCard'
import Masonry from 'react-masonry-css'

const Films = () => {
    const [films, setFilms] = useState([])

    useEffect(async () => {
        const res = await fetch('http://localhost:5000/movies', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const films = await res.json()

        setFilms(films)
    }, [])

    const handlePreview = (id) => {
        console.log('redirecting to preview')
    }

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return ( 
        <div>
            <Container>
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonary-grid"
                    columnClassName="my-masonary-grid_column">
                    {films.map(film => (
                        <div key={film._id}>
                            <FilmCard film={film} handlePreview={handlePreview} />
                        </div>
                    ))}
                </Masonry>
            </Container>
        </div>
    );
}
 
export default Films;