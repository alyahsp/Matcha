const express = require('express');
const router = express.Router();
const database = require('../config/database')

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

})
module.exports = router;
