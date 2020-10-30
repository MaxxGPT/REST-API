require("dotenv").config();

const Users = require("../models/users");
const Usage = require("../models/usage");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");
const emailService = require("../services/email.service");
const subWeeks = require("date-fns/subWeeks")

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
          if (err.errmsg.includes("duplicate")) {
            res.status(405).json({ msg: "Duplicated" });
          } else {
            console.log(err);
            res.status(400).json(err);
          }
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
            <p><a href="${process.env.CLIENT_URL}/api/auth/activate/${token}">ACTIVATE</a></p>
            <hr/>
            <p>This email contain sensitive info</p>
            <p>${process.env.CLIENT_URL}</p>
          `,
          };

          console.log(mailOptions);

          emailService.sendEmail({ mailOptions: mailOptions }, function (
            err,
            msg
          ) {
            if (err) {
              return res.status(400).json(err);
            } else {
              return res
                .status(200)
                .json({ token });
            }
          });
        }
      });
    }
  },
  getUserByActiveEmail: function (email, callback) {
    var query = { email, status: true };
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
            res.status(200).redirect(307, '/login')
          }
        });
      }
    });
  },
  getApiUsage: async (req, res) => {
    const _usage = await Usage.aggregate([{
      $match: {
        user: req.user._id,
        date: { $gte: subWeeks(new Date(), 1) }
      }
    }, {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        req: { $sum: 1 }
      }
    }, {
      "$sort": { "_id": 1 },
    }, { "$limit": 7 }]);
    return res.status(200).json(_usage)
  },
  update: async (req, res) => {
    if (
      req.body.password &&
      (req.body.password == "" || req.body.password.length == 0)
    ) {
      delete req.body.password;
    }
    const _userFromModel = await Users.findById(req.user.id);
    if (_userFromModel.name !== req.body.name) {
      _userFromModel.history.push({ field: 'name', value: _userFromModel.name })
      _userFromModel.name = req.body.name;
    }
    if (_userFromModel.email !== req.body.email) {
      _userFromModel.history.push({ field: 'email', value: _userFromModel.email })
      _userFromModel.email = req.body.email;
    }
    if (req.body.password && _userFromModel.password !== req.body.password) {
      _userFromModel.history.push({ field: 'password', value: _userFromModel.password })
      _userFromModel.password = req.body.password;
    }

    (await _userFromModel).save()

    res.status(200).json({ message: "User updated correctly." });
  }
};
