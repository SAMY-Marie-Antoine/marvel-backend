const mongoose = require("mongoose");

const Characters = mongoose.model("Characters", {
  id_characters: Number,
  name: String,
  description: String,
  comics: Array,
  thumbnail: Object,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Characters;
