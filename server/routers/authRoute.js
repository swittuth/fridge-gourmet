const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.send("logged out successfully");
});

authRouter.get("/profile", (req, res) => {
  if (req.user) {
    res.send({
      redirectLink: "http://127.0.0.1:5173/",
      user: req.user,
    });
  } else {
    res.send({
      redirectLink: "http://127.0.0.1:5173/",
      user: null,
    });
  }
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
); // passport knows to authenticate with google

authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    // in this step google send back the info with a code that can then be used
    // by the application to pull data from the user on google
    res.redirect("http://127.0.0.1:5173"); // go back to the home page
  }
);
module.exports = authRouter;
