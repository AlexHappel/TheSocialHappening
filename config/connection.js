const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/socialnetwork', {
    useNewUrlParser: true,
    useUnifiedTopolgy: true,
}):

module.exports = mongoose.connection;