const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String, 
    email: String, 
    password: String, 
    permissionLevel: { type: 'Number', default: 0 }, 
    created: { type: 'Date', default: Date.now }, 
    apiKey: String}, { collection: 'Users'});

userSchema.methods.generateHash = function(cb) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), cb);
  return cb();
};

userSchema.methods.validPassword = function(password, hash) {
  return bcrypt.compareSync(password, hash);
};

userSchema.post("save", function(_doc, next) {
  _doc.password = undefined;
  return next();
});

userSchema.pre("save", function(next) {
  this.generateHash(next);
});

module.exports = mongoose.model('Users', userSchema);
