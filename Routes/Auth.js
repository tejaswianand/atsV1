// Importing Frameworks

const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/Email");

// Register User - Start

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const message = `${process.env.BASE_URL}/confirm/${user.id}`;
    await sendEmail(user.email, "Verify Email", message);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Register User - End

// Login User - Start

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong Credentials");

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(400).json("Wrong Credentials");

    if (user.verified != "true") {
      res.status(400).json("activate ac");
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login User - End

module.exports = router;
