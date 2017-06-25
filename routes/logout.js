var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=> {
	res.locals.user = undefined
	req.session.user = undefined
	res.redirect('/')
})

module.exports = router;
