const express = require("express");
const app = express();
app.use(express.json());
const router = express.Router();
const hashFunction = require("../utils/encryptFunction");
const decryptFunction = require("../utils/decryptFunction");
const isAuthenticated = require("../middlewares/isAuthenticated");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const { email, username, password, confirPassword } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email });
    if (!username) {
      return res.status(500).json({ message: "username vide !!!" });
    }
    if (password !== confirPassword) {
      return res.status(500).json({ message: "password différents !!!" });
    }
    if (user) {
      return res
        .status(500)
        .json({ message: "email exite déjà dans la base !!!" });
    }
    const result = hashFunction(password);
    console.log("resultat :", result[0], result[1], result[2]);
    const newUser = new User({
      email: email,
      username: username,
      salt: result[0],
      hash: result[1],
      token: result[2],
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      token: newUser.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //Je regarde si user est dans la base
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user === null) {
      return res.status(401).json({ message: "vérifier email !" });
    }

    const hash = decryptFunction(user.salt, password);

    if (user.email !== email) {
      return res.status(500).json({ message: "Unauthorized !" });
    }

    if (hash !== user.hash) {
      return res.status(401).json({ message: "Unauthorized!!" });
    }
    res.json({
      _id: user._id,
      token: user.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
