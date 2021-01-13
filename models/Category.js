const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    enum: [
      "Business",
      "Construction",
      "Design",
      "Fashion design",
      "Graphic design",
      "Interior design",
      "Economics",
      "Engineering",
      "Entrepreneurship",
      "Health care",
    ],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
