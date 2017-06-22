var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	login			: String,
	password		: String,
	email			: String,
	firstName		: String,
	lastName		: String,
	bio				: String,
	location		: String,
	lastConnected	: Number,
	popularity		: Number,
	age				: Number,
	orientation		: {
		type		: String,
		enum		: ['Bisexual', 'Homosexual', 'Heterosexual'],
	},
	gender			: {
		type		: String,
		enum		: ['Male', 'Female'],
	},
	photos			: [
		{
			link		: String,
			profilePic	: Boolean,
		}
	],
	interests		: [],
	favorites		: [],
	disliked		: []
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.checkPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('User', userSchema);
