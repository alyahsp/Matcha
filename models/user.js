const mongodb = require('mongodb').MongoClient;
const assert = require('assert')

const url = 'mongodb://localhost:27017/Matcha_DB';


const addUser = (item) => {
	mongodb.connect(url, (err, db)=>{
		assert.equal(null, err)
		db.collection('users').insertOne(item, (err, result)=>{
			assert.equal(null, err)
			console.log('User Inserted')
			db.close()
		})
	})
}

const updateUser = (item, login) => {
	mongodb.connect(url, (err, db)=>{
		assert.equal(null, err)
		db.collection('users').update({'login': login}, { $set: item }, (err, result)=>{
			assert.equal(null, err)
			console.log('User Updated')
			db.close()
		})
	})
}

// let calculateAge = (date) =>{
// 	let dd = today.getDate()
// 	let mm = today.getMonth() + 1 //January is 0!
// 	let yyyy = today.getFullYear()
//
// 	if(dd < 10){
// 		dd='0'+dd
// 	}
// 	if(mm < 10){
// 		mm='0'+mm
// 	}
// 	let today = yyyy + mm + dd
// 	let age = (today - date).toString()
// 	age =
// 	return (age)
// }
// var generateHash = (password) =>{
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// };
//
// var checkPassword = (password)=>{
// 	return new Promise(function(res, rej){
// 		if (password != null){
// 			res(bcrypt.compareSync(password, this.password))
// 		}
// 		else {
// 			rej()
// 		}
//
// 	})
// }
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
	// 'generateHash'	: generateHash,
	'addUser'		: addUser,
	'updateUser'	: updateUser
	// 'checkUser'		: checkUser,
	// 'checkPassword'	: checkPassword
};
