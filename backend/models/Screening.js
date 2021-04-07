const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screeningSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    available_seats: [{
        type: Number
    }],
}, { timestamps: true });

const Screening = mongoose.model('Screening', screeningSchema);
module.exports = Screening;