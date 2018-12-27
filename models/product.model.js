const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type: String, required: true},
    surname:{type: String, required: true},
    urlNextcloud:{type:String, required:true},
    urlGitea:{type:String, required:true},
    urlTrello:{type:String, required:true}
});


// Export the model
module.exports = mongoose.model('user', UserSchema);