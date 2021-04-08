const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    screenings_ids: [{
        type: ObjectId
    }],
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;