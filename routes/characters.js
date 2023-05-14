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
const Characters = require("../models/Characters");
require("dotenv").config();

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post(
  "/characters/upload",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const pictureToUpload = req.files.picture;
      const result = await cloudinary.uploader.upload(
        convertToBase64(pictureToUpload)
        //{ folder: "/vinted/offers/" }
      );
      const { id_characters, name, description, comics } = req.body;
      const newCharacter = new Characters({
        id_characters: id_characters,
        name: name,
        description: description,
        comics: [comics],
        thumbnail: result,
        owner: userId,
      });
      await newCharacter.save();
      res.status(201).json({ newCharacter });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
);

router.get("/characters", async (req, res) => {
  try {
    //let sort = "";
    console.log(req.query);
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    // J'interroge le backend du reacteur en envoyant la clef API et les différents query
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );
    // Je renvoie le data au front
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/characters/:id", async (req, res) => {
  try {
    const paramsId = req.params.id;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${paramsId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
