const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Corrigido de minlenght para minlength
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
