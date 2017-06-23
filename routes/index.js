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

router.route('/')
	.post((req, res)=>{
		if (req.body.submit === 'Sign in' && (req.body.login === undefined ||
			req.body.login === '' || req.body.password === undefined || req.body.password === ''))
			{
				req.session.error = "Wrong login or password";
				res.redirect('/');
			}
		else if (req.body.submit === 'Sign Up' && (req.body.fname === '' ||
		req.body.lname === '' || req.body.login === '' || req.body.password === ''))
			{
				req.session.error = "Incorrect information";
				res.redirect('/');
			}
		else if (req.body.submit === 'Sign Up')
		{
			User.findOne({$or: [{'email' :  req.body.email }, {'login' : req.body.login}]}, (err, user)=> {
				if (err) throw err ;

				if (user){
					req.session.error = "Email or Login already exists";
					res.redirect('/');
				} else {
					var newUser = new User();

					newUser.email = req.body.email;
					newUser.login = req.body.login;
					newUser.firstName = req.body.fname;
					newUser.lastName = req.body.lname;
					newUser.age = req.body.age;
					newUser.password = newUser.generateHash(req.body.password);
					newUser.gender = req.body.gender;
					newUser.save((err) => {
						if (err) throw err;
					});
					req.session.user = newUser.login;
					res.redirect('/profile');
				}
			})
		}
		else if (req.body.submit === 'Sign in')
		{
			User.findOne({$or: [{'email' :  req.body.email }, {'login' : req.body.login}]}, (err, user)=> {
				if (err) throw err ;

				if (user && user.checkPassword(req.body.password)){					
					res.redirect('/profile');
				} else {
					res.redirect('/');
				}
		}
		console.log(req.body)
	})
module.exports = router;
