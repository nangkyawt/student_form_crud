const db = require("../models/index");
const catchasync = require("../utils/catchasync");
const APIfeatures = require("../utils/apifeatures");
const AppError = require("../utils/apperror");
const students = db.students;

// Import Excel
// exports.createBulk = async (req, res) => {
//   try {
//     if (!req.body || !Array.isArray(req.body)) {
//       return res.status(400).send({
//         status: "Fail",
//         message: "Invalid or empty request body for bulk insertion",
//       });
//     }
//     // Bulk Insert
//     const createdStudents = await students.bulkCreate(req.body);
//     res.status(201).send({
//       status: "Success",
//       message: "Bulk insertion successful",
//       data: createdStudents,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({
//       status: "Fail",
//       message: "Error occurred during bulk insertion" || error.message,
//     });
//   }
// };

//CREATE
exports.create = catchasync(async (req, res, next) => {
  if (!req.body.name) {
    return next(new AppError("Please enter your name", 400));
  }
  console.log(req.body.father_name);
  const Students = await students.create({
    id: req.body.id,
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

//GetAll
exports.findAll = (req, res) => {
  const Students = req.query;
  students
    .findAll(Students)
    .then((data) => {
      res.status(201).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "fail",
        message: err.message,
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
          message: `Cannot update Students with id=${id}`,
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
// exports.deleteAll = (res, req) => {
//   students
//     .destroy({
//       where: {},
//     })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Student was delete successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Student with id=${id}.May be Student was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Student with id=" + id,
//       });
//     });
// };
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
