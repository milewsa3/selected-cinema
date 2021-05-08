const Movie = require("../models/Movie");

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

const movie_post = (req, res) => {
    const movie = new Movie(req.body);

    movie.save()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        });
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