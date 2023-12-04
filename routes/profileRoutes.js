const router = require("express").Router()

const authCheck = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login")
  } else {
    next()
  }
}
router.get("/", authCheck, (req, res) => {
  //   res.send("profile view- " + req.user.username)
  console.log(req.session)
  res.render("dashboard", {
    user: req.user,
  })
})

module.exports = router
