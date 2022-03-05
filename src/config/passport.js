const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const port = 3000;
var profileId;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `http://localhost:${port}/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("working");
      // console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);
      // console.log("profile", profile);
      // lookup user using User class
      const newUser = {
        id: profile.id,
        imagen: profile._json.picture,
        email: profile._json.email,
      };
      profileId = profile.id;
      // if not exist, save it using User and call done(null, createdUser)
      let users = User.fetchData();
      if (users.find((user) => user.email === newUser.email) === undefined) {
        done(null, User.create(newUser));
      }
      // if it does exist call done(null, user)
      done(null, User);
    }
  )
);

passport.serializeUser(function (user, done) {
  let users = user.fetchData();
  let userId = users.find((user) => user.id === profileId);
  // console.log(userId.id);
  done(null, userId.id);
});
passport.deserializeUser(function (id, done) {
  User.find(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
