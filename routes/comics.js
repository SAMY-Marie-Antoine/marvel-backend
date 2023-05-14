const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const axios = require("axios");

const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const cloudinary = require("cloudinary").v2;

const fileUpload = require("express-fileupload");
const Comics = require("../models/Comics");
require("dotenv").config();

// const stripe = require("stripe")(process.env.STRIPE);

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post(
  "/comics/upload",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      const charactersId = req.characters.id;
      const pictureToUpload = req.files.picture;
      const result = await cloudinary.uploader.upload(
        convertToBase64(pictureToUpload)
        //{ folder: "/vinted/offers/" }
      );
      const { id_comics, title, description } = req.body;
      const newComics = new Comics({
        id_comics: id_comics,
        title: title,
        description: description,
        thumbnail: result,
        owner: charactersId,
      });
      await newComics.save();
      res.status(201).json({ newComics });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
);

router.get("/comics", async (req, res) => {
  try {
    //let sort = "";
    console.log(req.query);
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    // J'interroge le backend du reacteur en envoyant la clef API et les différents query
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    // Je renvoie le data au front
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:id", async (req, res) => {
  try {
    const paramsId = req.params.id;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${paramsId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
