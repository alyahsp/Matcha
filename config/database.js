var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/27017:Matcha_DB');
module.exports = mongoose.connection;
