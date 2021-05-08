const Screening = require("../models/Screening");

const screening_get = (req, res) => {
    Screening.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
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

    const filter = {
        "date": {
            $gt: new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1} 23:59:59`),
            $lt: new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 23:59:59`) },
    }

    Screening.distinct("movie_id", filter)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        })
}

module.exports = {
    screening_get,
    screening_get_id,
    screening_post,
    screening_put,
    screening_delete,
    screening_dated_get
}