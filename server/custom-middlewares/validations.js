const { body, check } = require("express-validator");
const User = require("../models/User");

const registerUser = [
  check("password").isLength({ min: 3 }),
  check("name")
    .not()
    .isEmpty(),
  body("email")
    .isEmail()
   
];

module.exports = {
  registerUser,
};
