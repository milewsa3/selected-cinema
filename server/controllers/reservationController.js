const Reservation = require("../models/Reservation");
const Screening = require("../models/Screening");
const Movie = require("../models/Movie");

const reservation_get = (req, res) => {
    Reservation.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
}

const parseReservation = async (reservation) => {
    const screeningQueryResult = await Screening.find({_id: reservation.screening_id})
    const screening = screeningQueryResult[0]

    const movieQueryResult = await Movie.find({_id: screening.movie_id}).lean()
    const movie = movieQueryResult[0]
    movie.TMDB = JSON.parse(movie.TMDB)

    return {
        _id: reservation._id,
        date: screening.date,
        seats: reservation.seats,
        movie: movie
    }
}

const reservation_get_detailed = async (req, res) => {
    const id = req.params.id

    try {
        const reservation =  await Reservation.findById(id)
        const parsedReservation = await parseReservation(reservation)

        res.json(parsedReservation)
    } catch (err) {
        res.status(400).json(err)
    }
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

const reservation_user_get = async (req, res) => {
    const user_id = req.params.user_id

    try {
        const result = []
        const reservations =  await Reservation.find({user_id})

        for (const reservation of reservations ) {
            const parsedReservation = await parseReservation(reservation)
            result.push(parsedReservation)
        }

        res.json(result)
    } catch (err) {
        res.status(400).json(err)
    }
}

const reservation_post_seats_book = async (req, res) => {
    const { id: reservation_id } = req.body

    try {
        const reservation = await Reservation.findById(reservation_id)
        const screening = await Screening.findById(reservation.screening_id)
        const newScreening = await Screening.findByIdAndUpdate(screening._id,
            {available_seats: screening.available_seats.filter((seat) => !reservation.seats.includes(seat))}
        )

        res.json(newScreening)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const reservation_post_seats_freeUp = async (req, res) => {
    const { id: reservation_id } = req.body

    try {
        const reservation = await Reservation.findById(reservation_id)
        const screening = await Screening.findById(reservation.screening_id)
        const newScreening = await Screening.findByIdAndUpdate(screening._id,
            {available_seats: screening.available_seats.concat(reservation.seats)}
        )

        res.json(newScreening)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = {
    reservation_get,
    reservation_get_id,
    reservation_post,
    reservation_put,
    reservation_delete,
    reservation_user_get,
    reservation_get_detailed,
    reservation_post_seats_book,
    reservation_post_seats_freeUp
}