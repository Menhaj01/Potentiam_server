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
      "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
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
