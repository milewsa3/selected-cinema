const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    screenings_ids: [{
        type: String
    }],
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;