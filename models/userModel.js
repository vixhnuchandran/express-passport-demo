const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  authType: { type: String, enum: ["google", "github", "normal"] },
  authId: { type: String, unique: true },
  email: { type: String, unique: true },
  imageurl: String,
})

const User = mongoose.model("user", userSchema)

module.exports = User
