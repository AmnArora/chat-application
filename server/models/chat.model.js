var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    room: String,
    name: String,
    message: String,
    timestamp: Date,
});

module.exports = mongoose.model('Chat', chatSchema);