var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=> {
	// if (req.session.error)
	// {
	// 	res.locals.error = req.session.error;
	// 	req.session.error = undefined;
	// }
	res.render('profile')
})

module.exports = router;
