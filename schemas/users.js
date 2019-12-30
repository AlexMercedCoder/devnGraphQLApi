const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username:  { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    favtech: String,
    bio: String,
    url: String
});

const Users = mongoose.model('devstoryusers2', userSchema);

module.exports = Users;
