const mongoose = require('mongoose');
const Schema = mongoose.Schema

const videoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId
    }

})



const Video = mongoose.model('User', videoSchema);

module.exports = { Video }