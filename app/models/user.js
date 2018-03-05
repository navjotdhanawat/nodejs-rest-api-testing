var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//book schema definition
var UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
UserSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the UserSchema for use elsewhere.
module.exports = mongoose.model('User', UserSchema);