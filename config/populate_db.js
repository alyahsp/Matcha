var mysql = require('mysql');
var connection = require('./connect');

connection.query('INSERT INTO User (FirstName, LastName, Login, Email, \
Password, Gender, Age) VALUES(?, ?, ?, ?, ?, ?, ?)', ['Stanya', 'Palmaro', 'spalm', 'spalm@gmail.com', 'test123', 'Female', 23], (err, result)=>{
	if (err) throw err ;
})
