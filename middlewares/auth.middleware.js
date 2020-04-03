const Users = require('../models/users');

module.exports = {
	validate: (req, res, next) => {
		if(!req.user){
			return res.redirect('/login');
		}else{
			next();
		}
	}
};