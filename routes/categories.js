const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
// const ObjectId = require("mongoose").Types.ObjectId;

router.get("/all", function (req, res, next) {
  Category.find()
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/search", function (req, res, next) {
  Category.find({ name: { $regex: req.query.searchText, $options: "i"}}) //.find take in parameters la query. It needs to match with the regex. req.query.q = q= (do the link with q=)
    .then((respondApi) => {
      res.status(200).send(respondApi);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;

