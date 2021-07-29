const express = require("express");
const bcrypt = require("bcryptjs");
const cloudinary = require("./cloudinary");
const user = require("./model");
const uploaded = require("./multer");
const router = express.Router();
const path = require("path");
const genToken = require("./token");

router.get("/", async (req, res) => {
  const getData = await user.find();
  res.json(getData);
});

router.post("/", uploaded.single("avatar"), async (req, res) => {
  const { email, password } = req.body;

  const emailExist = await user.findOne({ email });
  if (emailExist) {
    res.send("Email already Exist");
  } else {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newData = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      avatar: result.secure_url,
      path: req.file.path,
      cloud_id: result.public_id,
    });

    res.json(newData);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const findEmail = await user.findOne({ email });
  if (findEmail) {
    const checkPassword = await bcrypt.compare(password, findEmail.password);
    if (checkPassword) {
      res.json({
        message: `welcome back ${findEmail.name}`,
        data: {
          _id: findEmail._id,
          name: findEmail.name,
          email: findEmail.email,
          password: findEmail.password,
          avatar: findEmail.avatar,
          path: findEmail.path,
          cloud_id: findEmail.cloud_id,
          token: genToken(findEmail._id),
        },
      });
    } else {
      res.send("Access Denied");
    }
  }
});

module.exports = router;
