var bcrypt = require('bcrypt-nodejs');
var mongodb = require('mongodb').MongoClient;
var assert = require('assert')

var url = 'mongodb://localhost:27017/Matcha_DB';

var generateHash = (password) =>{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

var checkPassword = (password)=>{
	return new Promise(function(res, rej){
		if (err){
			rej(err)
		}
		else{
			res(bcrypt.compareSync(password, this.password))
		}
	})
}

var addUser = (item) => {
	mongodb.connect(url, (err, db)=>{
		assert.equal(null, err)
		db.collection('users').insertOne(item, (err, result)=>{
			assert.equal(null, err)
			console.log('user inserted')
			db.close()
		})
	})
}

// var checkUser = (req, res) => {
// 	mongodb.connect(url, (err, db)=>{
// 		assert.equal(null, err)
// 		db.collection('users').findOne({$or: [{'email' :  req.body.email }, {'login' : req.body.login}]}, (err, result)=> {
// 			assert.equal(null, err)
// 			console.log(req.body.password)
// 			if (result && checkPassword(req.body.password)){
// 				req.session.user = req.body.login;
// 				res.redirect('/profile');
// 			} else {
// 				res.redirect('/');
// 			}
// 			db.close();
// 		})
// 	})
// }

module.exports = {
	'generateHash'	: generateHash,
	'addUser'		: addUser,
	// 'checkUser'		: checkUser,
	'checkPassword'	: checkPassword
};
