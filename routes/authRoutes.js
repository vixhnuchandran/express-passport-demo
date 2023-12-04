const router = require("express").Router()
const passport = require("passport")

// auth login
router.get("/login", (req, res) => {
  return res.render("login")
})

// auth register
router.get("/register", (req, res) => {
  return res.render("register")
})

// auth logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      console.log("error in logging out")
    }
  })
  return res.redirect("/")
})

// auth with google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)
// auth with github
router.get("/github", passport.authenticate("github", { scope: ["profile"] }))

// auth google callbackURI
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user)
  return res.redirect("/profile")
})

// auth google callbackURI
router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  // res.send(req.user)
  return res.redirect("/profile")
})

module.exports = router
