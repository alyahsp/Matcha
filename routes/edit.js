const express = require('express')
const router = express.Router()
const database = require('../config/database')
const User = require('../models/User')
const getAge = require('get-age')

router.get('/', async (req, res, next)=> {
	let db = await database.connect()
	let user = await db.collection('users').findOne({'login' : req.session.user})

	if (user)
	{
		res.locals.user = req.session.user
		res.render('edit', {
			title: 'Edit Profile',
			css: "<link rel='stylesheet' href='./css/edit.css'>",
			firstName : user['firstName'],
			lastName : user['lastName'],
			bday : user['bday'],
			bmonth: user['bmonth'],
			byear: user['byear'],
			email: user['email'],
			gender: user['gender'],
			orientation : user['orientation'],
			bio: user['bio']
		})
	}
	else
	{
		req.session.error = "Please login to access this page"
		res.redirect('/')
	}
})

router.post('/', (req, res, next)=>{
	let item = {
		firstName: req.body.fname,
		lastName: req.body.lname,
		login: req.body.login,
		age: getAge(req.body.byear + '-' + req.body.bmonth + '-' + req.body.bday),
		bday: req.body.bday,
		bmonth: req.body.bmonth,
		byear: req.body.byear,
		email : req.body.email,
		gender: req.body.gender,
		orientation: req.body.orientation,
		bio: req.body.bio
	}
	console.log(req.body)
	User.updateUser(item, req.session.user)
	req.session.user = req.body.login
	res.redirect('/profile')
})
module.exports = router;
