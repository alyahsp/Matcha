const express = require('express');
const router = express.Router();
const User = require('../models/User');
const database = require('../config/database')

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.error)
	{
		res.locals.error = req.session.error;
		req.session.error = undefined;
	}
	res.render('index');
});

router.post('/register', (req, res, next)=>{
	if ((req.body.fname === '' || req.body.lname === '' ||
	req.body.login === '' || req.body.password === '' || req.body.password))
	{
		req.session.error = "Incorrect information";
		res.redirect('/');
		return
	}
	next()
	// console.log(req.body)
})

router.post('/register', (req, res, next)=>{
	let item = {
		email : req.body.email,
		login: req.body.login,
		firstName: req.body.fname,
		lastName: req.body.lname,
		bday: req.body.bday,
		bmonth: req.body.bmonth,
		byear: req.body.byear,
		password: User.generateHash(req.body.password),
		gender: req.body.gender
	}
	User.addUser(item);
	req.session.user = req.body.login;
	res.redirect('/profile');
	// console.log(req.body)
})

router.post('/login', async (req, res, next)=>{
	let db = await database.connect();
	let result = await db.collection('users').findOne({$or: [{'email' :  req.body.email }, {'login' : req.body.login }]})

	if (result && User.checkPassword(req.body.password)){
		req.session.user = req.body.login;
		res.redirect('/profile');
	}
	else if (result){
		req.session.error = 'Wrong Password'
		res.redirect('/');
	}
	else {
		req.session.error = 'Login is not found'
		res.redirect('/');
	}
	// if (req.body.submit === 'Sign in' && (req.body.login === undefined ||
	// 	req.body.login === '' || req.body.password === undefined || req.body.password === ''))
	// 	{
	// 		req.session.error = "Wrong login or password";
	// 		res.redirect('/');
	// 	}
	// else if (req.body.submit === 'Sign in')
	// {
	// 	User.checkUser(req, res)
	// }
})
module.exports = router;
