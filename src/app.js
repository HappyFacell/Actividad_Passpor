const express = require("express");
const path = require("path");
require("dotenv").config();
require("./config/passport");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["clave"], //clave para encriptar
  })
);
//inicializar passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("home.html", {
    root: path.join(__dirname, "/public/html"),
  });
});

module.exports = app;
