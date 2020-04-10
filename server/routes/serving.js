console.log("Serving Routes Enabled");
const path = require("path");
const express = require("express");

module.exports = app => {
  console.log('dirName',__dirname);
  app.use("/", express.static(path.join(__dirname, "../../dist/task")));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../../dist/task", "index.html"));
  });
};
