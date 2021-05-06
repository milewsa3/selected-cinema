const Reservation = require("../models/Reservation");

const reservation_get = (req, res) => {
    Reservation.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
}

const reservation_get_id = (req, res) => {
    const id = req.params.id;

    Reservation.findById(id)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        })
}

const reservation_post = (req, res) => {
    const reservation = new Reservation(req.body);

    reservation.save()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

const reservation_put = (req, res) => {
    const id = req.params.id;
    const newContent = req.body;

    Reservation.updateOne({ _id: id }, newContent)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).json('Error: ' + err);
        });
}

const reservation_delete = (req, res) => {
    const id = req.params.id;
    
    Reservation.findByIdAndDelete(id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(400).json('Error: ' + err);
        })
}

module.exports = {
    reservation_get,
    reservation_get_id,
    reservation_post,
    reservation_put,
    reservation_delete
}