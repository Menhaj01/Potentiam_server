const express = require("express");
const router = express.Router();

const Like = require("../models/Like");
const User = require("../models/User");
const { route } = require("./users");
// const ObjectId = require("mongoose").Types.ObjectId;


router.post("/", function (req, res, next) {
    const filter = { user_id: req.body.user_id, author_id: req.session.currentUser};
  Like.findOneAndUpdate(filter, {
    author_id: req.session.currentUser,
    user_id: req.body.user_id,
    created_at: Date.now()
  }, {new: true,
    upsert: true
})
    .then((respondApi) => {
      updateNbLike(req.body.user_id);
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      console.log(error);
    });
});

function updateNbLike(userID) {
    console.log("update nb like");
    const filter = {user_id: userID};
    Like.find(filter).then((likes) => {
        console.log(likes.length);
        User.findOneAndUpdate({_id: userID}, {nb_like: likes.length}, {upsert:true}).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
}


router.delete("/", function (req, res, next) {
    const filter = { user_id: req.body.user_id, author_id: req.session.currentUser};
  Like.findOneAndDelete(filter)
    .then((respondApi) => {
    updateNbLike(req.body.user_id);
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/mylikes", function (req, res, next) {
    const filter = {author_id: req.session.currentUser};
  Like.find(filter).populate("user_id")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      console.log(error);
    });
});    

module.exports = router;

