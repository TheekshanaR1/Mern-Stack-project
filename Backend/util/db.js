const mongoose = require("mongoose");
require("dotenv").config();

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/CCMS";

// Connect to MongoDB
const db = mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connection successful");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

module.exports = db;