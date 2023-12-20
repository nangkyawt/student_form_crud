const db = require("../models/index");
const catchasync = require("../utils/catchasync");
const APIfeatures = require("../utils/apifeatures");
const students = db.students;

//CREATE
exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name cannot be empty!",
    });
  }
  students
    .create({
      name: req.body.name,
      father_name: req.body.father_name,
      date_of_birth: req.body.date_of_birth,
      gender: req.body.gender,
      nrc_exists: req.body.nrc_exists,
      nrc: req.body.nrc,
    })
    .then((data) => {
      return res.status(201).send({
        status: "success",
        message: "Successfully created a post.",
        data: data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: "fail",
        message: err.message || "Some error occurred while creating a post",
      });
    });
};

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
