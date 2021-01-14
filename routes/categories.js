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

module.exports = router;
