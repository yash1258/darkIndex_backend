var express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const passport = require("passport");
var router = express.Router();

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res
) {
  res.json("respond with a resource");
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "INDEX*DARK", {
          expiresIn: "1000000",
        });
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      creationDate: new Date(),
    });
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
