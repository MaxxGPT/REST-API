const express = require("express");
const router = express.Router();
const UsersConstroller = require("../controllers/users.controller");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var expressValidator = require("express-validator");

router.use(expressValidator());

//Register - POST
router.post("/", UsersConstroller.register);
router.get("/activate/:token", UsersConstroller.activate);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      UsersConstroller.getUserByActiveEmail(email, function (err, _user) {
        if (err) throw err;
        if (!_user) {
          return done(null, false, { message: "Unknown Email Address" });
        }
        const ismatch = _user.validPassword(password, _user.password);
        if (ismatch) {
          return done(null, _user);
        } else {
          return done(null, false, { message: "Invalid Passowrd" });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UsersConstroller.getUserById(id, function (err, user) {
    done(err, user);
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    session: true,
  }),
  function (req, res) {
    res.status(200).json({ msg: "Login correctly" });
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
