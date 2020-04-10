const responseHandler = require("../utils/response-handler");
const { validationResult } = require("express-validator");

module.exports = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log("Sending the resp");

    responseHandler(res, 422, {
      error: error
        .array()
        .map(e => `${e.msg} at ${e.param}`)
        .join(",")
    });
    return false;
  } else {
    return true;
  }
};
