const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    desc: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});

module.exports = mongoose.model('Post', postSchema);
