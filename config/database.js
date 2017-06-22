var mongoose = require('mongoose');

//connect to db mongodb://localhost/db_name'
mongoose.connect('mongodb://localhost/Matcha_DB');
module.exports = mongoose.connection;
