const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const GithubStrategy = require("passport-github2").Strategy
const User = require("../models/userModel")

require("dotenv").config()

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        $or: [{ authId: profile.id }, { email: profile.emails[0].value }],
      }).then(currUser => {
        if (currUser) {
          console.log("user is:" + currUser)
          done(null, currUser)
        } else {
          new User({
            username: profile.displayName,
            authId: profile.id,
            email: profile.emails[0].value,
            imageurl: profile.photos[0].value,
            authType: "google",
          })
            .save()
            .then(newUser => {
              console.log("new user created" + newUser)
              done(null, newUser)
            })
        }
      })
    }
  )
)

passport.use(
  new GithubStrategy(
    {
      callbackURL: "/auth/github/redirect",
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        $or: [{ authId: profile.id }, { email: profile.emails[0].value }],
      }).then(currUser => {
        if (currUser) {
          console.log("user is:" + currUser)
          done(null, currUser)
        } else {
          new User({
            username: profile.displayName,
            authId: profile.id,
            email: profile.emails[0].value,
            imageurl: profile.photos[0].value,
            authType: "github",
          })
            .save()
            .then(newUser => {
              console.log("new user created" + newUser)
              done(null, newUser)
            })
        }
      })
    }
  )
)
