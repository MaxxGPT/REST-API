const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const UsersConstroller = require('../controllers/users.controller');
const uuidv4 = require('uuid/v4');
var expressValidator = require('express-validator');
const flash = require('req-flash');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(expressValidator());

//New User (Internal) - POST
router.post('/', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    //validations
    req.checkBody('firstName', 'First Name is Required').notEmpty();
    req.checkBody('lastName', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'A valid email is required').isEmail();
    req.checkBody('password', 'Password is Required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.redirect('/dashboard/users/new');
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
                res.redirect('/dashboard/users/new');
            }else{
                req.flash('success_message', "User registered!");
                res.redirect('/dashboard/users/list');
            }
            //console.log(user);
        });    
    }
});

/*Get user information*/
router.get('/me', authMiddleware.validate, (req, res)=>{
    return res.status(200).json(req.user);
});
/* See default user */
router.get('/seed', (req, res)=>{
    const randomKey = uuidv4();
    let newUser = new Users({
        firstName: "Admin",
        lastName: "Default",
        password: "Test.123",
        email: "admin@default.com",
        isAdmin: true,
        apiKey: randomKey.replace(/-/g,'')
    });
    newUser.save((err, _user)=>{
        if(err){
            return res.status(400).json(err);
        }else{
            return res.status(200).json({msg:"Default user seeded"});
        }
    });
});

/*Delete Users*/
router.delete('/remove', authMiddleware.validate, async (req, res) => {
    Users.remove({_id:req.user.id},(err)=>{
      if(err){
        return res.status(500).json({message:err.message});
      }else{
        return res.status(200).json({message:'User removed correctly.'});
      }
    });
});

/*PATCH Users*/
router.patch('/', authMiddleware.validate, async (req, res) => {
    if(req.body.password && (req.body.password == '' || req.body.password.length == 0)){
        delete req.body.password;
    }
    Users.findByIdAndUpdate(req.user.id, {$set:req.body}, (err)=>{
      if(err){
        return res.status(500).json({message:err.message});
      }else{
        return res.status(200).json({message:'User updated correctly.'});
      }
    });
});

/*Updare User API Key*/
router.get('/generateApi', authMiddleware.validate, async (req, res) => {
    const randomKey = uuidv4();
    Users.findByIdAndUpdate(req.user.id, {$set:{
        apiKey: randomKey.replace(/-/g,'')
    }}, (err)=>{
      if(err){
        return res.status(500).json({message:err.message});
      }else{
        return res.status(200).json({message:'API key generated correctly.'});
      }
    });
});

module.exports = router 