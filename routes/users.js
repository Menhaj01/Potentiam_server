const express = require("express");
const User = require("../models/User");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const upload = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth");

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

router.get("/me", function (req, res, next) {
  User.find({ _id: { $eq: req.session.currentUser } })
    .select("-password")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/all/byCategory", function (req, res, next) {
  // console.log(req.query.id_category);
  User.find({ id_category: { $eq: req.query.id_category } })
    // User.find({ id_category: { $eq: id_category } })
    .select("-password")
    .then((respondApi) => {
      // console.log(respondApi);
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      next(error);
    });
});

router.patch(
  "/me",
  requireAuth,
  upload.single("image"),
  function (req, res, next) {
    if (!req.session.currentUser)
      return res.status(401).json("You have to sign In");
    // console.log(req.body);
    // console.log(req.session.currentUser);
    if (req.file) {
      req.body.image = req.file.path; // Add profileImage key to req.body
    }

    User.findByIdAndUpdate(req.session.currentUser, req.body, { new: true })
      .select("-password")
      .then((respondApi) => {
        res.status(200).send(respondApi);
        console.log(respondApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

router.get("/:id", function (req, res, next) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

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
