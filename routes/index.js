var express = require('express');
var router = express.Router();
var User = require('../models/user');

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
	if (req.body.submit === 'Sign Up' && (req.body.fname === '' ||
	req.body.lname === '' || req.body.login === '' || req.body.password === ''))
		{
			req.session.error = "Incorrect information";
			res.redirect('/');
		}
	else if (req.body.submit === 'Sign Up')
	{
		User.addUser(req, res);
	}
	// console.log(req.body)
})

router.post('/login', (req, res, next)=>{
	if (req.body.submit === 'Sign in' && (req.body.login === undefined ||
		req.body.login === '' || req.body.password === undefined || req.body.password === ''))
		{
			req.session.error = "Wrong login or password";
			res.redirect('/');
		}
	else if (req.body.submit === 'Sign in')
	{
		User.checkUser(req, res)
	}
})
module.exports = router;
