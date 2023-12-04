const mongoose = require("mongoose")
require("dotenv").config()

const connStr = process.env.MONGODB_URL
const connection = async () => {
  try {
    mongoose.connect(connStr)
    console.log("connected to mongodb")
  } catch (error) {}
}

module.exports = connection
