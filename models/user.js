var bcrypt = require('bcrypt');
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/Matcha_DB';

var generateHash = (password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

function checkPassword (password){
	return bcrypt.compareSync(password, this.password);
}

var addUser = (req, res) => {
	MongoClient.connect(url, (err, db)=>{
		if (err){
			throw(err);
		}else{
			db.collection('users').findOne({$or: [{'email' :  req.body.email }, {'login' : req.body.login}]}, (err, result)=> {
				if (err) throw err ;

				if (result !== null){
					req.session.error = "Email or Login already exists";
					res.redirect('/');
				} else {
					db.collection('users').insertOne({email : req.body.email, login: req.body.login,
						firstName: req.body.fname, lastName: req.body.lname, bday: req.body.bday,
						bday: req.body.bmonth, bday: req.body.byear,
						password: generateHash(req.body.password), gender: req.body.gender}, (err, result)=>{
							console.log(err);
						})
					req.session.user = req.body.login;
					res.redirect('/profile');
				}
			})
		}
		db.close();
	})
	console.log(req.body)
}

var checkUser = (req, res) => {
	MongoClient.connect(url, (err, db)=>{
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
