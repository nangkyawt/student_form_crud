const express = require("express");
const studentsCtrl = require("../controllers/students");

module.exports = (app) => {
  const router = express.Router();
  router.route("/").post(studentsCtrl.create);
  router.patch("/:id", studentsCtrl.update).delete(studentsCtrl.delete);
  app.use("/api/v1/students", router);
};
