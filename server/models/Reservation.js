const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const reservationSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    screening_id: [{
        type: ObjectId,
        required: true
    }],
    seats: [{
        type: Number
    }]
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;