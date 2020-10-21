const Users = require("../models/users");

module.exports = {
  validate: (req, res, next) => {
    Users.findOne(
      {
        apiKey: req.query.api_key,
      },
      (err, _user) => {
        if (err) {
          return res.status(403).json(err);
        } else if (!_user) {
          return res.status(403).json({ msg: "API KEY is invalid." });
        } else {
          req.user = _user;
          next();
        }
      }
    );
  },
};
