const express = require("express")
const path = require("path")
const passportSetup = require("./config/passport")
const connection = require("./config/database")
const authRoutes = require("./routes/authRoutes")
const profileRoutes = require("./routes/profileRoutes")
const passport = require("passport")
const session = require("express-session")
require("dotenv").config()

const app = express()

// view engine setup
app.set("view engine", "ejs")

// session
app.use(
  session({
    secret: [process.env.sessionKey],
    maxAge: 24 * 60 * 60 * 1000,
    resave: false,
    saveUninitialized: true,
  })
)
// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes)

// home route
app.get("/", (req, res) => {
  res.render("home")
})
// static files
app.use("/img", express.static(path.resolve(__dirname, "src/images")))
app.use("/css", express.static(path.resolve(__dirname, "src/styles")))

connection().then(() => {
  app.listen(3000, () => {
    console.log("App now listening for requests for port 3000.")
  })
})
