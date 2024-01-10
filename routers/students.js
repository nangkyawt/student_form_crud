const express = require("express");
const studentsCtrl = require("../controllers/students");

module.exports = (app) => {
  const router = express.Router();
  router
    .route("/")
    .post(studentsCtrl.create)
    .get(studentsCtrl.findAll)
    .delete(studentsCtrl.deleteAll);
  router.post("/bulkcreate", studentsCtrl.createBulk);
  router.patch("/:id", studentsCtrl.update).delete("/:id", studentsCtrl.delete);
  app.use("/api/v1/students", router);
};
