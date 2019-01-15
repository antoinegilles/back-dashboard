const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type: String, required: true, minlength: 5,maxlength: 50},
    surname:{type: String, required: true, minlength: 5,maxlength: 50},
    urlNextcloud:{type:String, required:true},
    urlGitea:{type:String, required:true},
    urlTrello:{type:String, required:true},
    password: {type: String, required: true, minlength: 5, maxlength: 1024},
});
//authenticate input against database
UserSchema.statics.authenticate = function (name, password, callback) {
    User.findOne({ name: name })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }
//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;

      next();
    })
  });

 // Export the model
module.exports = mongoose.model('user', UserSchema);
