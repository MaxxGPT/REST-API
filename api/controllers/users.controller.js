require("dotenv").config();

const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers/dbErrorHandling");
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

const SESConfig = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
};

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

          //Email data sending
          //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property

          const params = {
            Destination: {
              ToAddresses: [email],
            },
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: `
			   <h1>Please Click link to activate your account</h1>
			   <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
			   <hr/>
			   <p>This email contain sensitive info</p>
			   <p>${process.env.CLIENT_URL}</p>
		   `,
                },
                Text: {
                  Charset: "UTF-8",
                  Data: `
			   Please Click link to activate your account\n
			   ${process.env.CLIENT_URL}/users/activate/${token}\n\n
			   This email contain sensitive info 
			   ${process.env.CLIENT_URL}
		   `,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: "Account Activation Link",
              },
            },
            Source: process.env.EMAIL_FROM,
          };

          new AWS.SES(SESConfig).sendEmail(params, (err, data) => {
            if (err) {
              console.log(err);
              res.status(400).json({
                error: "Something went wrong",
              });
            } else {
              res.status(200).json({ msg: "User created" });
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
};
