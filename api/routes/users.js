const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const uuidv4 = require("uuid/v4");
var expressValidator = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const bcrypt = require("bcrypt");
const UsersConstroller = require("../controllers/users.controller");

router.use(expressValidator());

//New User (Internal) - POST
router.post("/", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;

  //validations
  req.checkBody("firstName", "First Name is Required").notEmpty();
  req.checkBody("lastName", "Last Name is Required").notEmpty();
  req.checkBody("email", "A valid email is required").isEmail();
  req.checkBody("password", "Password is Required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.redirect("/dashboard/users/new");
  } else {
    const randomKey = uuidv4();
    var newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      apiKey: randomKey.replace(/-/g, ""),
    });
    newUser.save(function (err, user) {
      if (err) {
        //throw(err);
        console.log(err);
        res.redirect("/dashboard/users/new");
      } else {
        req.flash("success_message", "User registered!");
        res.redirect("/dashboard/users/list");
      }
      //console.log(user);
    });
  }
});

/*Get user information*/
router.get("/me", authMiddleware.validate, (req, res) => {
  return res.status(200).json(req.user);
});

/*Delete Users*/
router.delete("/", authMiddleware.validate, async (req, res) => {
  Users.remove({ _id: req.user.id }, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({ message: "User removed correctly." });
    }
  });
});

/*PATCH Users*/
router.patch("/", authMiddleware.validate, async (req, res) => {
  console.log("PATCH", req.body);
  if (
    req.body.password &&
    (req.body.password == "" || req.body.password.length == 0)
  ) {
    delete req.body.password;
  }
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );
  }
  Users.findByIdAndUpdate(req.user.id, { $set: req.body }, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({ message: "User updated correctly." });
    }
  });
});

/*Updare User API Key*/
router.get("/generateApi", authMiddleware.validate, async (req, res) => {
  const randomKey = uuidv4();
  const apiKey = randomKey.replace(/-/g, "");
  Users.findByIdAndUpdate(
    req.user.id,
    {
      $set: {
        apiKey
      },
    },
    (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      } else {
        return res
          .status(200)
          .json({ apiKey });
      }
    }
  );
});

router.get("/usage", authMiddleware.validate, UsersConstroller.getApiUsage);

module.exports = router;
