const express = require("express");
const User = require("../models/User");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const upload = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth");

router.get("/all", function (req, res, next) {
  User.find()
    .select("-password -email")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/me", function (req, res, next) {
  User.findOne({ _id: { $eq: req.session.currentUser } })
    .select("-password -email")
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
    .select("-password -email")
    .then((respondApi) => {
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
    if (req.file) {
      req.body.image = req.file.path; // Add profileImage key to req.body
    }

    User.findByIdAndUpdate(req.session.currentUser, req.body, { new: true })
      .select("-password -email")
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
  // console.log(req.query.id);
  User.findById(req.params.id)
    .select("-password -email")
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
  console.log(req.params.id);
  console.log(req.body._id);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID User connected unknown : " + req.params.id);
  if (!ObjectId.isValid(req.body._id))
    return res.status(400).send("ID User to follow unknown : " + req.body._id);
  if (req.params.id === req.body._id)
    return res.status(400).send("You can NOT follow YOU!!!");
  //Add to follower list
  User.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { following: req.body._id } },
    { new: true }
  )
    .select("-password -email")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });

  //add to following list
  User.findByIdAndUpdate(
    req.body._id,
    { $addToSet: { followers: req.params.id } },
    { new: true }
  )
    .select("-password -email")
    .then((respondApi) => {})
    .catch((error) => {
      return res.status(500).json(error);
    });
});

router.patch("/unfollow/:id", function (req, res, next) {
  // If the Id is valid
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  if (!ObjectId.isValid(req.body._id))
    return res.status(400).send("ID unknown : " + req.body._id);

  //remove to follower list
  User.findByIdAndUpdate(
    req.params.id,
    { $pull: { following: req.body._id } },
    { new: true }
  )
    .select("-password -email")
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });

  //remove to following list
  User.findByIdAndUpdate(
    req.body._id,
    { $pull: { followers: req.params.id } },
    { new: true }
  )
    .select("-password -email")
    .then((respondApi) => {})
    .catch((error) => {
      return res.status(500).json(error);
    });
});

module.exports = router;
