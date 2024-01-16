const express = require("express");
const resultCtrl = require("../controllers/resultCtrl");

module.exports = (app) => {
  const resultRouter = express.Router();
  resultRouter
    .route("/")
    .post(resultCtrl.save)
    .get(resultCtrl.findAll)
    .delete(resultCtrl.deleteAll);
  app.use("/api/v1/examresults", resultRouter);
};