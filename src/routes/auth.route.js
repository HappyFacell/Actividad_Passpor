const express = require("express");
const path = require("path");
const router = require("express").Router();
const passport = require("passport");
const { log } = require("console");

// path: auth/

// GET /login
router.get("/login", (req, res) => {
  res.sendFile("login.html", {
    root: path.join(__dirname, "..", "/public/html"),
  });
});

// GET /google/login
router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// GET /google/callback
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // print req.query.code
  // Successful authentication, redirect to “/”
  console.log(req.query.code);
  res.redirect("http://localhost:3000/auth/profile");
});
// GET /verifyLogin
router.get("/verifyLogin", (req, res) => {
  if (req.user === undefined) res.status(401).send("Not Authorized");
  else res.status(200).send("Logged In");
});

// GET /logout
router.get("/logout", (req, res) => {
  req.logOut();
  req.session = null;
  res.redirect("http://localhost:3000/");
});

router.get("/profile", (req, res) => {
  console.log(req.user);
  res.sendFile("profile.html", {
    root: path.join(__dirname, "..", "/public/html"),
  });
});

module.exports = router;
