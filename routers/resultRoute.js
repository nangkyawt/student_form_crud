const express = require("express");
const resultCtrl = require("../controllers/resultCtrl");

module.exports = (app) => {
  const resultRouter = express.Router();
  resultRouter.route("/").post(resultCtrl.save).get(resultCtrl.findAll);

  resultRouter
    .post("/bulkCreate", resultCtrl.createBulk)
    .post("/createNewStudentAndMark", resultCtrl.createNewStudentAndMark)
    .post("/createStudentAndResults", resultCtrl.createStudentAndResults)
    .post("/excelImport", resultCtrl.excelImport);

  resultRouter
    .get("/:id", resultCtrl.get)
    .delete("/delete/:id", resultCtrl.delete)
    .delete("/:id", resultCtrl.deleteAllByStudentId)
    .delete("/mark/:id", resultCtrl.deleteMarkByStudentId)
    .patch("/:id", resultCtrl.update)
    .delete("/deleteone/:id", resultCtrl.deleteOne)
    .get("/findone/:id", resultCtrl.findOne);
  app.use("/api/v1/examresults", resultRouter);
};
