var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var db = require('./config/database');

var index = require('./routes/index');
var profile = require('./routes/profile');
var edit = require('./routes/edit');
var logout = require('./routes/logout');

var app = express();

// db().then(
// 	(database) => {
// 		//here the traitement
// 	}
// ).catch((error) => {
// 	console.error(error);
// 	throw(error);
// })

// view engine setup
app.engine('ejs', require('express-ejs-extend'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'ilovefood',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}))

//Routes
app.use('/', index);
// app.use('/signin', signin);
// app.post('/signin', )
app.use('/profile', profile);
app.use('/edit', edit);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
