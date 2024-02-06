const express = require("express");
const resultCtrl = require("../controllers/resultCtrl");

module.exports = (app) => {
  const resultRouter = express.Router();
  resultRouter
    .route("/")
    .post(resultCtrl.save)
    .get(resultCtrl.findAll)
    .delete(resultCtrl.deleteAll);
  resultRouter
    .post("/bulkCreate", resultCtrl.createBulk)
    .post("/createNewStudentAndMark", resultCtrl.createNewStudentAndMark)
    .post("/createStudentAndResults", resultCtrl.createStudentAndResults);

  resultRouter
    .delete("/:id", resultCtrl.delete)
    .get("/:id", resultCtrl.get)
    .delete("/:id", resultCtrl.deleteAllByStudentId)
    .patch("/:id", resultCtrl.update);
  app.use("/api/v1/examresults", resultRouter);
};
