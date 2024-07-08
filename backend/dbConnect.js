const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGOATLAS);

    console.log("Data Base Connected");
  } catch (err) {
    console.log("found few error while connection with DB", err.message);
  }
};

dbConnect();

module.exports = mongoose;
