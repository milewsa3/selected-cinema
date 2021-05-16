const Screening = require("../models/Screening");
const ObjectId = require('mongoose').Schema.Types.ObjectId;

const screening_get = (req, res) => {
    const {date, movie_id} = req.query

    if (date && movie_id) {

        const params = {
            "date": new Date(date), "movie_id": movie_id
        }

        Screening.find(params)
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.status(400).json('Error: ' + err);
            });
    } else {
        Screening.find()
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.status(400).json('Error: ' + err);
            });
    }
}

const screening_get_id = (req, res) => {
    const id = req.params.id;

    Screening.findById(id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        })
}

const screening_get_date_movie_id = (req, res) => {
    const { date, movie_id } = req.query.id
    console.log(date, movie_id)

    const filter = {
        "movie_id": movie_id,
        "date": date
    }

    Screening.find(filter)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(400).json({error})
        })
}

const screening_post = (req, res) => {
    const screening = new Screening(req.body);

    screening.save()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

const screening_put = (req, res) => {
    const id = req.params.id;
    const newContent = req.body;

    Screening.updateOne({ _id: id }, newContent)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).json('Error: ' + err);
        });
}

const screening_delete = (req, res) => {
    const id = req.params.id;
    
    Screening.findByIdAndDelete(id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).json('Error: ' + err);
        })
}

const screening_dated_get = (req, res) => {
    const date = new Date(req.params.date)
    console.log(req.params.date)

    const filter = {
        "date": {
            $gt: new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`),
            $lt: new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`) },
    }

    Screening.distinct("movie_id", filter)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const screening_timed_get = (req, res) => {
    const date = new Date(req.query.date)
    const movie_id = req.query.movie_id

    const filter = {
        "movie_id": movie_id,
        "date": {
            $gt: new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1} 23:59:59`),
            $lt: new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`) },
    }

    Screening.find(filter)
        .then(result => {
            const times = result.map(screening => screening.date)
            res.json(times)
        })
        .catch(err => {
            res.status(400).json({error: err})
        })
}

module.exports = {
    screening_get,
    screening_get_id,
    screening_post,
    screening_put,
    screening_delete,
    screening_dated_get,
    screening_timed_get,
    screening_get_date_movie_id
}