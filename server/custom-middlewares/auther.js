const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

var verify = promisify(jwt.verify);

exports.authStatus = async (req, res, next) => {
  let token = req.get("Authorization");
  if (token) {
    token = token.split(" ")[1];

    verify(token, "MY_SECRET")
      .then(dec => {
        req.user = {
          _id: dec._id,
          email: dec.email
        };
        console.log("Authenticated !");
        next();
      })

      .catch(error => {
        console.log("Illegal token");
        const e = new Error("Unauthorized Request");
        e.statusCode = 401;
        next(e);
      });
  } else {
    console.log("NO token");
    const e = new Error("Unauthorized Request");
    e.statusCode = 401;
    next(e);
  }
};
