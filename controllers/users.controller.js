const Users = require('../models/users');

module.exports = {
	getUserByEmail: function(email, callback){
	    var query = {email: email};
	    Users.findOne(query, callback);
	},
	getUserById: function(id, callback){
	    Users.findById(id, callback);
	}
}