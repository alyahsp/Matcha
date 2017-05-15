var express = require('express');
var router = express.Router();

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
		else if (req.body.submit === 'Sign Up' && (req.body.login === undefined ||
			req.body.login === '' || req.body.password === undefined || req.body.password === ''))
			{
				req.session.error = "Wrong login or password";
				res.redirect('/');
			}
		console.log(req.body)
	})
module.exports = router;
