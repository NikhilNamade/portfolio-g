const mongoose = require("mongoose");

const mongooseURI = process.env.DB_URL;

const coonectTomongo = async () => {
  await mongoose.connect(mongooseURI);
  console.log("connect to mongo");
};
module.exports = coonectTomongo;
