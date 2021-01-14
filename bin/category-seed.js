require("dotenv").config();

const mongoose = require("mongoose");
const Category = require("../models/Category");

const categories = [
  {
    name: "Business",
  },
  {
    name: "Construction",
  },
  {
    name: "Design",
  },
  {
    name: "Fashion design",
  },
  {
    name: "Graphic design",
  },
  {
    name: "Interior design",
  },
  {
    name: "Economics",
  },
  {
    name: "Engineering",
  },
  {
    name: "Entrepreneurship",
  },
  {
    name: "Health care",
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
