const Listing = require("../models/Listing");
const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
require("dotenv").config();

// this method gets all the availabe listings.
const getListings = async (req, res) => {
  try {
    let listings = await Listing.find().sort("-createdAt");
    res.json(listings);
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
};

// this method will fetch one listing from the database as per the id
const getOneListing = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let listing = await Listing.findById(id);

    res.json(listing);
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

// this method will create a new listing and save it in the database. Only admin can access the route and it needs admin auth
const createListing = async (req, res) => {
  const { title, image, description, price, orders, available } = req.body;

  console.log(("inside create listing = ", req.body));

  const newListing = new Listing({
    title,
    image,
    description,
    price,
    orders,
    available
  });

  try {
    await newListing.save();
    res.json(newListing);
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

// this method will let you edit a listing by a given id. Only admin can access this route
const editListing = async (req, res) => {
  const { id } = req.params;
  const { title, image, description, price, orders, available } = req.body;

  try {
    let listing = await Listing.findById(id);
    listing.title = title;
    listing.description = description;
    listing.image = image;
    listing.price = price;
    listing.orders = orders;
    listing.available = available;
    await listing.save();

    // or this
    // await Listing.updateOne({ id: id }, { title: title });
    console.log(listing);

    res.json(listing);
  } catch (err) {
    res.json(err);
  }
};

// this deletes the listing by id. Only admin can access this route
const deleteListing = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);

    listing.remove();
    res.send("listing deleted.");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

const login = async (req, res) => {
  // console.log("inside login route");
  // console.log(req.headers);

  let { username, password } = req.body;
  // console.log("username and password = ", username, password);
  // console.log(req.body);

  let mockedUsername = "admin@gmail.com";
  let mockedPassword = "password";

  if (username && password) {
    if (username === mockedUsername && password === mockedPassword) {
      // with jwt.sign u could send extre details like we did with username down below
      // decoded.username will give you access to the username provided in the first login
      let token = jwt.sign(
        { username: username, oneMore: "yes" },
        process.env.SECRET
        // enable the object below to put a time limit on the token. right now the token will only clear if admins logs out
        // {
        //   expiresIn: "1h"
        // }
      );
      res.json({
        success: true,
        message: "Authentication successfull",
        token: token
        // this token is then saved in the browser
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Incorrect username or password"
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Auth failed, please check the request"
    });
  }
};

module.exports = {
  createListing,
  getListings,
  editListing,
  deleteListing,
  getOneListing,
  login
};
