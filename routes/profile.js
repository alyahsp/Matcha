var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=> {
	if (req.session.user)
	{
		res.locals.user = req.session.user
		res.render('profile')
	}
	else
	{
		// req.session.error = "Please login to access this page"
		res.redirect('/')
	}
})

module.exports = router;
