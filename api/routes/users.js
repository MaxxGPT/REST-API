const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const UsersConstroller = require('../controllers/users.controller');
const uuidv4 = require('uuid/v4');
var expressValidator = require('express-validator');
const flash = require('req-flash');

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

/*Delete Users*/
router.delete('/:id', async (req, res) => {
    Users.remove({_id:req.params.id},(err)=>{
      if(err){
        return res.status(500).json({message:err.message});
      }else{
        return res.status(200).json({message:'User removed correctly.'});
      }
    });
});

/*PATCH Users*/
router.patch('/:id', async (req, res) => {
    if(req.body.password && (req.body.password == '' || req.body.password.length == 0)){
        delete req.body.password;
    }
    req.checkBody('firstName', 'First Name is Required').notEmpty();
    req.checkBody('lastName', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'A valid Email is required').isEmail();

    Users.updateById(req.params.id, {$set:req.body}, (err)=>{
      if(err){
        return res.status(500).json({message:err.message});
      }else{
        return res.status(200).json({message:'User removed correctly.'});
      }
    });
});

module.exports = router 