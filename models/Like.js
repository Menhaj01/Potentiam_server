const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
  },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
