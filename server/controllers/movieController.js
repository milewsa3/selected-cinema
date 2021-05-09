const Movie = require("../models/Movie");
const fetch = require("node-fetch");

function removeSpecialChars(string) {
    let result = string

    const specialCharacters = ['%']
    specialCharacters.forEach(character => {
        result = result.replace(character, '')
    })

    return result
}

const movie_get = (req, res) => {
    const filter = req.query.ids ? { _id: { $in: req.query.ids } } : null

    Movie.find(filter)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
}

const movie_get_id = (req, res) => {
    const id = req.params.id;

    Movie.findById(id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        })
}

const movie_post = async (req, res) => {
    const { title } = req.body

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a11ffe1b32709f5551e64f4683d948a3&query=${removeSpecialChars(title)}&language=${'en-en'}`, {
            method: 'GET'
        })
        const queryResult = await response.json()

        if (queryResult.results.length === 0)
            throw new Error('Film of that title does not exist in TMDB')

        const movie = new Movie({ title: queryResult.results[0].title, TMDB: JSON.stringify(queryResult.results[0]) });
        const savedMovie = await movie.save()
        res.json(savedMovie)
    } catch(err) {
        if (err.code === 11000) {
            res.status(400).json({message: "That movie is already in the DB"})
        } else {
            res.status(400).json({message: err.message})
        }
    }
}

const movie_put = (req, res) => {
    const id = req.params.id;
    const newContent = req.body;

    Movie.updateOne({ _id: id }, newContent)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).json('Error: ' + err);
        });
}

const movie_delete = (req, res) => {
    const id = req.params.id;
    
    Movie.findByIdAndDelete(id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).json('Error: ' + err);
        })
}

module.exports = {
    movie_get,
    movie_get_id,
    movie_post,
    movie_put,
    movie_delete,
}