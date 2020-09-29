require("dotenv").config();

const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers/dbErrorHandling");
const uuidv4 = require("uuid/v4");
const emailService = require("../services/email.service");

module.exports = {
  register: (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //validations
    req.checkBody("name", "Your  Name is Required").notEmpty();
    req.checkBody("email", "A valid email is required").isEmail();
    req.checkBody("password", "An Account Passowrd Is Required").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
      res.status(400).json(errors);
    } else {
      const randomKey = uuidv4();
      var newUser = new Users({
        name: name,
        email: email,
        password: password,
        apiKey: randomKey.replace(/-/g, ""),
      });
      newUser.save(function (err, user) {
        if (err) {
          //throw(err);
          console.log(err);
          res.status(400).json(err);
        } else {
          //Generate Token
          const token = jwt.sign(
            {
              email,
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
              expiresIn: 60 * 60 * 24, //expires in a day
            }
          );

          let mailOptions = {
            from: "'Asatera' <" + process.env.EMAIL_FROM + ">",
            to: email,
            subject: "Account Activation Link",
            html: `
            <h1>Please Click link to activate your account</h1>
            <p><a href="${process.env.CLIENT_URL}/users/activate/${token}">ACTIVATE</a></p>
            <hr/>
            <p>This email contain sensitive info</p>
            <p>${process.env.CLIENT_URL}</p>
          `,
          };

          emailService.sendEmail({ mailOptions: mailOptions }, function (
            err,
            msg
          ) {
            if (err) {
              return res.status(400).json(err);
            } else {
              return res
                .status(200)
                .json({ msg: "Check your email for activation link." });
            }
          });
        }
        //console.log(user);
      });
    }
  },
  getUserByEmail: function (email, callback) {
    var query = { email: email };
    Users.findOne(query, callback);
  },
  getUserById: function (id, callback) {
    Users.findById(id, callback);
  },
  activate: (req, res) => {
    jwt.verify(req.params.token, process.env.JWT_ACCOUNT_ACTIVATION, function (
      err,
      decode
    ) {
      if (err) {
        res.status(400).json(err);
      } else {
        Users.findOneAndUpdate(
          {
            email: decode.email,
          },
          {
            $set: {
              status: true,
            },
          }
        ).exec((err, _user) => {
          if (err) {
            return res.status(400).json(err);
          } else if (!_user) {
            return res.status(400).json({ msg: "Error" });
          } else {
            res.status(200).json(decode);
          }
        });
      }
    });
  },
};
