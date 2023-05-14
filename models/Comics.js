const mongoose = require("mongoose");

const Comics = mongoose.model("Comics", {
  id_comics: Number,
  title: String,
  description: String,
  thumbnail: Object,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Characters",
  },
});

module.exports = Comics;
