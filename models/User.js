const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  pseudo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  following: [String],
  followers: [String],
  followingToShow: [String],
  description: String,
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dqwbskuge/image/upload/v1611315933/73b6dd3a54345fdd77e5aeed7e84ead0_t17u8k.jpg",
  },
  //links: ["http://snpachat/foo92"],
  links: [
    {
      url: String,
      network: {
        type: String,
        enum: ["Snapchat", "Facebook", "Twitter", "Youtube", "Instagram"],
      },
    },
  ],

  id_category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  nb_like: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
