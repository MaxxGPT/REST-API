const express = require('express');
const router = express.Router();
const apiKeyMiddleware = require('../middlewares/api_key.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const Source = require('../models/sources');
const User = require('../models/users');

/*Show dashboard*/
router.get("/", authMiddleware.validate, (req, res) => {
    res.render('dashboard.ejs', {
    	api_key: req.user.apiKey
    });
});

/*Show Sources list*/
router.get("/sources/list", authMiddleware.validate, (req, res) => {
	Source.find().exec((err, _sources)=>{
		if(err){
			console.log(err);
		}
	    res.render('sources/list-sources.ejs', {
	    	sources: _sources
	    });
	});
});

/*Show Sources form*/
router.get("/sources/new", authMiddleware.validate, (req, res) => {
    res.render('sources/new-sources.ejs');
});

/*Show Users list*/
router.get("/users/list", authMiddleware.validate, (req, res) => {
	User.find().exec((err, _users)=>{
		if(err){
			console.log(err);
		}
	    res.render('users/list-users.ejs', {
	    	users: _users
	    });
	});
});

/*Show User form*/
router.get("/users/new", authMiddleware.validate, (req, res) => {
    res.render('users/new-users.ejs');
});

/*Show Update User form*/
router.get("/users/update/:id", authMiddleware.validate, (req, res) => {
	User.findById(req.params.id).exec((err, _user)=>{
		if(err){
			console.log(err);
		}
		if(!_user){
			res.redirect('/dashboard');
		}else{
	    	res.render('users/update-users.ejs', {
	    		user: _user
	    	});
		}
	});
});

router.get("/test", apiKeyMiddleware.validate, (req, res) => {
	res.status(200).json({msg:"Valid API KEY"});
});

module.exports = router;