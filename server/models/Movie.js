const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    TMDB: String,
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;