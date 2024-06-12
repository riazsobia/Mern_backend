const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    items: Array, // this will contain one or more listing objects
    totalValue: Number,
    numberOfItems: Number,
    fulfilled: Boolean,
    customer: Object // array of objects or just object
  },
  { timestamps: true },

  {
    collection: "orders"
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
