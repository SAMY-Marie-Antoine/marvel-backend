const mongoose = require("mongoose"); // J'importe mongoose pour pouvoir faire mongoose.model

const User = mongoose.model("User", {
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String,
});
// Export de mon model pour pouvoir l'utiliser ailleurs
module.exports = User;
