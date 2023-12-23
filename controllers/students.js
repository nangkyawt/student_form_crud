const db = require("../models/index");
const catchasync = require("../utils/catchasync");
const APIfeatures = require("../utils/apifeatures");
const AppError = require("../utils/apperror");
const students = db.students;

//CREATE
exports.create = catchasync(async (req, res, next) => {
  if (!req.body.name) {
    return next(new AppError("Please enter your name", 400));
  }
  console.log(req.body.name);
  const Students = await students.create({
    name: req.body.name,
    father_name: req.body.father_name,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    nrc_exists: req.body.nrc_exists,
    nrc: req.body.nrc,
  });
  res.status(201).send({
    status: "success",
    message: "Successfully created a post.",
    Students: Students,
  });
});

//UPDATE
exports.update = (req, res) => {
  const id = req.params.id;

  students
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Update successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Students with id=${id}.Maybe Student was not found or req.body is empty`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Students with id=" + id,
      });
    });
};

//Delete
exports.delete = (req, res) => {
  const id = req.params.id;
  students
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was delete successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}.May be Student was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id,
      });
    });
};

//DELETE ALL
exports.deleteAll = (res, req) => {
  students
    .destroy({
      where: {},
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was delete successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}.May be Student was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Student with id=" + id,
      });
    });
};
exports.deleteAll = catchasync(async (req, res, next) => {
  Posform.destroy({
    where: {},
    truncate: false,
  });
  res.status(200).json({
    status: "success",
    message: "delete successfully",
  });
});
