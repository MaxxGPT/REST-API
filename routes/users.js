const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

router.get('/register', (req, res) => {
    res.render('register.hbs', {
        pageTitle: 'register'
    });
});

router.get('/login', (req, res) => {
    res.render('login.hbs', {
        pageTitle: 'login'
    });
});

router.post('/register', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    //validations
    req.checkBody('firstName', 'Your First Name is Required').notEmpty();
    req.checkBody('lastName', 'Your Last Name is Required').notEmpty();
    req.checkBody('email', 'A valide email is required').notEmpty();
    req.checkBody('password', 'An Account Passowrd Is Required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors:errors 
        });
    } else {
        var newUser = new newUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        newUser.createUser(newUser, function(err, user) {
            if(err) throw(err);
            console.log(user);
        });

        req.flash('success_message', "You are now registered!");
        res.redirect('/login');
    }
});

passport.use(new LocalStrategy({
    email: 'email'
},
function(email, password, done){
    Users.getUserByEmail(email, function(err, Users){
        if(err) throw err;
        if(!Users){
            return done(null, false, {message: 'Unknown Email Address'});
        }

        Users.comparePassword(password, user.password, function(err, ismatch){
            if(err) throw err;
            if(ismatch){
                return done (null, user); 
            } else {
                return done(null, false, {message: 'Invalid Passowrd'});
            }
        });
    });
}));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.getUserByID(id, function(err, user) {
        done(err, user) 
    });
}); 

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    successFlash: 'Welcome',
    failureFlash: 'Invalid Email or Passowrd!'
}), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('Success_message', 'You are now logged out!')
    res.redirect('/');
});

module.exports = router 