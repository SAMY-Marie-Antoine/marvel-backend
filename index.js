const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const userRoutes = require("./routes/user");
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const offerRoutes = require("./routes/offer");

app.use(userRoutes);
app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(offerRoutes);

// app.get("/", (req, res) => {
//   res.status(201).json({ message: "Bienvenue sur le site de marvel !!" });
// });

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not available !!" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🚀🚀🚀!");
});
