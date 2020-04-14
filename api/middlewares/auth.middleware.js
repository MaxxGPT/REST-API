const Users = require('../models/users');

module.exports = {
	validate: (req, res, next) => {
		if(!req.user){
			return res.status(403).json({msg:"Session expired"});
		}else{
			next();
		}
	}
};