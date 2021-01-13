require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const users = [
  {
    name: "",
  },
];
const items = [{}];
(async () => {
  try {
    const self = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connection to ${self.connection.name} succesful.`);
    const createdUsers = await User.create(users);
    console.log(createdUsers);
    self.connection.close();
  } catch (error) {
    console.log(`An error has occured while seeding... ${error}`);
  }
})();
