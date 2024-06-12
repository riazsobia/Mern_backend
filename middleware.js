let jwt = require("jsonwebtoken");
require("dotenv").config();

// this middleware intercepts the requests and call next() function when condition is met
let checkToken = (req, res, next) => {
  console.log("inside the middleware");

  let token =
    // checking the header of request to find token and pass just an empty string if not found
    req.headers["x-access-token"] || req.headers["authorization"] || "";

  console.log("token ", token);

  if (token.startsWith("Bearer ")) {
    // removing Bearer from the token
    token = token.slice(7, token.length);
  }

  console.log("after berer romving");

  if (token) {
    console.log("token  process.env.SECRET ", token, process.env.SECRET);

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log("in error");
        return res.json({
          success: false,
          message: "token is not valid"
        });
      } else {
        // console.log(decoded);
        req.decoded = decoded;

        next();
      }
    });
  } else {
    return res.status(403).json({
      success: false,
      message: "Auth token has not been supplied"
    });
  }
};

module.exports = {
  checkToken: checkToken
};
