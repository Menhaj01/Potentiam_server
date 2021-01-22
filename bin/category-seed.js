require("dotenv").config();

const mongoose = require("mongoose");
const Category = require("../models/Category");

const categories = [
  {
    name: "Beauty",
  },
  {
    name: "Chinese cuisine",
  },
  {
    name: "Comics",
  },
  {
    name: "Fashion design",
  },
  {
    name: "Food",
  },
  {
    name: "Shopping",
  },
  {
    name: "Marriage",
  },
  {
    name: "Home and garden",
  },
  {
    name: "Hip hop music",
  },
  {
    name: "Hair products",
  },
  {
    name: "Guitar",
  },
  {
    name: "French cuisine",
  },
  {
    name: "Video games",
  },
  {
    name: "Interior design",
  },
  {
    name: "Economics",
  },
  {
    name: "TV reality shows",
  },
  {
    name: "Swimming",
  },
  {
    name: "Tennis",
  },
];

(async () => {
  try {
    const self = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connection to ${self.connection.name} succesful.`);
    const createdcategories = await Category.create(categories);
    console.log(createdcategories);
    self.connection.close();
  } catch (error) {
    console.log(`An error has occured while seeding... ${error}`);
  }
})();
