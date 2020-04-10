const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String },
  password: String,
  gender: {
    type: String,
    default: 'Male'
  },
  image: {
    type: String,
    default: `/images/user.png`
  },
 active: {
   type: Boolean,
   default: true
 },
  phone: {
    type: Number,
  },
   
 
});

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
}

// module.exports = mongoose.model("users", UserSchema);
// Create a model
const User = mongoose.model('user', UserSchema);

// Export the model
module.exports = User;
