var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	port     : '8889',
	database : 'Matcha_DB'
});

connection.connect();

module.exports = connection;
