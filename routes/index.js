const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index");
});
/*if (process.env.NODE_ENV === "production") {
  app.use("*", (req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/public/index.html");
  });
}*/

module.exports = router;
