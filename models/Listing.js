const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: String,
    image: Array,
    description: String,
    price: String,
    orders: Number,
    available: Boolean
  },
  { timestamps: true },

  {
    collection: "listings"
  }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
