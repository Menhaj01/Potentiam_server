const express = require("express");
const User = require("../models/User");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/all", function (req, res, next) {
  User.find()
    .select("-password")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      next(error);
    });
});

router.patch("/:id", function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .select("-password")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id", function (req, res, next) {
  User.findById(req.params.id)
    .select("-password")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/:id", function (req, res, next) {
  // If the Id is valid
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  User.findByIdAndRemove(req.params.id)
    .then((respondApi) => {
      res.status(200).send("Successfull Deleted");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.patch("/follow/:id", function (req, res, next) {
  // If the Id is valid
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  if (!ObjectId.isValid(req.body.idToFollow))
    return res.status(400).send("ID unknown : " + req.body.idToFollow);

  //Add to follower list
  User.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { following: req.body.idToFollow } },
    { new: true }
  )
    .select("-password")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });

  //add to following list
  User.findByIdAndUpdate(
    req.body.idToFollow,
    { $addToSet: { followers: req.params.id } },
    { new: true }
  )
    .select("-password")
    .then((respondApi) => {})
    .catch((error) => {
      return res.status(500).json(error);
    });
});

router.patch("/unfollow/:id", function (req, res, next) {
  // If the Id is valid
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  if (!ObjectId.isValid(req.body.idToUnfollow))
    return res.status(400).send("ID unknown : " + req.body.idToUnfollow);

  //remove to follower list
  User.findByIdAndUpdate(
    req.params.id,
    { $pull: { following: req.body.idToUnfollow } },
    { new: true }
  )
    .select("-password")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });

  //remove to following list
  User.findByIdAndUpdate(
    req.body.idToUnfollow,
    { $pull: { followers: req.params.id } },
    { new: true }
  )
    .select("-password")
    .then((respondApi) => {})
    .catch((error) => {
      return res.status(500).json(error);
    });
});

module.exports = router;
