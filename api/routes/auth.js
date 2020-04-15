const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const UsersConstroller = require('../controllers/users.controller');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const uuidv4 = require('uuid/v4');
var expressValidator = require('express-validator');
const flash = require('req-flash');

router.use(expressValidator());

//Register - POST
router.post('/', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    //validations
    req.checkBody('firstName', 'Your First Name is Required').notEmpty();
    req.checkBody('lastName', 'Your Last Name is Required').notEmpty();
    req.checkBody('email', 'A valid email is required').isEmail();
    req.checkBody('password', 'An Account Passowrd Is Required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.status(400).json(errors);
    } else {
        const randomKey = uuidv4();
        var newUser = new Users({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            apiKey: randomKey.replace(/-/g,'')
        });
        newUser.save(function(err, user) {
            if(err){
                //throw(err);
                console.log(err);
                res.status(400).json(err);
            }else{
                req.flash('success_message', "You are now registered!");
                res.status(200).json({msg:'User created'});
            }
            //console.log(user);
        });    
    }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function(email, password, done){
    UsersConstroller.getUserByEmail(email, function(err, _user){
        if(err) throw err;
        if(!_user){
            return done(null, false, {message: 'Unknown Email Address'});
        }
        const ismatch = _user.validPassword(password, _user.password);
        if(ismatch){
            return done (null, _user); 
        } else {
            return done(null, false, {message: 'Invalid Passowrd'});
        }
    });
}));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UsersConstroller.getUserById(id, function(err, user) {
        done(err, user) 
    });
}); 

router.post('/login', passport.authenticate('local', {
        session:true,
    }), function(req, res) {
    res.status(200).json({msg:'Login correctly'});
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('Success_message', 'You are now logged out!')
    res.status(200).json({msg:'Logout'});
});

module.exports = router 