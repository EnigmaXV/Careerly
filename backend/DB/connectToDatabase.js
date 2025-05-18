const mongoose = require("mongoose");

const connectToDatabase = async (url) => {
  return mongoose.connect(url);
};

module.exports = connectToDatabase;
