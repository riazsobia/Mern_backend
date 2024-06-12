const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOneOrder,
  fulfilOrder
} = require("../controllers/order-controller");

//here are the routes for Orders
router.get("/all", getOrders);
router.get("/:id", getOneOrder);
router.put("/fulfil/:id", fulfilOrder);

module.exports = router;
