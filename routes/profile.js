const express = require('express');
const router = express.Router();
const database = require('../config/database')

router.get('/', async (req, res, next)=> {
	if (req.session.user)
	{
		let db = await database.connect()
		let user = await db.collection('users').findOne({'login' : req.session.user})

		// console.log(user['firstName'])
		res.locals.user = req.session.user
		res.render('profile', {
			title: 'Profile',
			css : "<link rel='stylesheet' href='./css/profile.css'>",
			firstName : user['firstName'],
			lastName : user['lastName'],
			age: user['age'],
			gender : user['gender'],
			bio: user['bio'],
			interests: user['interests'],
			score: user['score'],
			orientation: user['orientation']
		})
	}
	else
	{
		req.session.error = "Please Login To Access This Page"
		res.redirect('/')
	}
})

module.exports = router;
