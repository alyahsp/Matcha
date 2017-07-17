var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
//connect to db mongodb://localhost/db_name'
var url = 'mongodb://localhost:27017/Matcha_DB';

var connect = MongoClient.connect(url, (err, db)=>{
	return new Promise((resolve, reject) => {
		if (err){
			reject(err);
		}else{
			resolve(db);
		}
	})
})
module.exports = connect;
