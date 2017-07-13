var bcrypt = require('bcrypt');
var mongodb = require('mongodb').MongoClient;
var assert = require('assert')

var url = 'mongodb://localhost:27017/Matcha_DB';

var generateHash = (password) =>{
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

function checkPassword (password){
	return bcrypt.compareSync(password, this.password);
}

var addUser = (item) => {
	mongodb.connect(url, (err, db)=>{
		assert.equal(null, err)
		db.collection('users').insertOne(item, (err, result)=>{
			assert.equal(null, err)
			console.log('item inserted')
			db.close()
		})
	})
}

var checkUser = (req, res) => {
	mongodb.connect(url, (err, db)=>{
		if (err){
			throw(err);
		}else{
			db.collection('users').findOne({$or: [{'email' :  req.body.email }, {'login' : req.body.login}]}, (err, result)=> {
				if (err) throw err ;

				if (result && checkPassword(req.body.password)){
					res.redirect('/profile');
				} else {
					res.redirect('/');
				}
			})
		}
		db.close();
	})
}

module.exports = {
	'generateHash' : generateHash,
	'addUser'	: addUser,
	'checkUser'	: checkUser
};
