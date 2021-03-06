const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Schema 
const UserSchema = new Schema({
    name:{type: String, required: true, minlength: 5,maxlength: 50},
    surname:{type: String, required: true, minlength: 5,maxlength: 50},
    password: {type: String, required: true, minlength: 5, maxlength: 1024},
    etude:{type: Number, required:true, min:0, max:10},
    specialite:{type:String, required:true}
});

// Authenticate input against database
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

// Hashing the password before saving it to the database
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

 // Export the model (user is the table)
module.exports = mongoose.model('user', UserSchema);

