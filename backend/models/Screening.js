const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const screeningSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    available_seats: [{
        type: Number
    }],
    movie_id: {
        type: ObjectId,
        required: true
    }
}, { timestamps: true });

const Screening = mongoose.model('Screening', screeningSchema);
module.exports = Screening;