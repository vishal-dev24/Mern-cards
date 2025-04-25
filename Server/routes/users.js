const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/your_database_TCP')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
});

module.exports = mongoose.model('User', userSchema);
