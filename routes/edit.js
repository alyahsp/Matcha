var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=> {
	if (req.session.user)
	{
		res.locals.user = req.session.user
		res.render('edit', {
			title: 'Edit Profile',
			css: "<link rel='stylesheet' href='./css/edit.css'>"
		})
	}
	else
	{
		req.session.error = "Please login to access this page"
		res.redirect('/')
	}
})

module.exports = router;
