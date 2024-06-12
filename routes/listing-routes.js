const express = require("express");
const router = express.Router();
let middleware = require("../middleware");

const {
  createListing,
  getListings,
  getOneListing,
  editListing,
  deleteListing,
  login
} = require("../controllers/listing-controller");

//here are the routes to listings
router.post("/new", middleware.checkToken, createListing);
router.get("/all", getListings);
router.put("/edit/:id", middleware.checkToken, editListing);
router.delete("/delete/:id", middleware.checkToken, deleteListing);
router.get("/:id", getOneListing);
router.post("/admin/login", login);

module.exports = router;
