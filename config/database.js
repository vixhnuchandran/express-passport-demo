const mongoose = require("mongoose")
require("dotenv").config()

const connStr = process.env.MONGODB_URL
const connection = async () => {
  try {
    mongoose.connect(connStr)
    console.log("connected to mongodb")
  } catch (error) {}
}

// const UserSchema = new mongoose.Schema({
//   username: String,
//   hash: String,
//   salt: String,
// })
// const User = connection.model("User", UserSchema)

module.exports = connection
