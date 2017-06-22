var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=> {
	if (req.session.user)
	{
		res.locals.user = req.session.user
		// req.session.user = undefined;
	}
	res.render('profile')
})

module.exports = router;
