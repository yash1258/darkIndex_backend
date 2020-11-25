var express = require("express");
const User = require("../models/users");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});
router.post("/login", async function (req, res) {
  try {
    let query = { email: req.body.email };
    let user = await User.find(query).exec();
    if (!user) {
      throw new Error("user Not found");
    }
  } catch (err) {
    console.log(err);
    res.status(503).json(err);
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    creationDate: req.body.creationDate,
  });
  try {
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
