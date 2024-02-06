const db = require("../models/index");
const catchasync = require("../utils/catchasync");
const APIfeatures = require("../utils/apifeatures");
const AppError = require("../utils/apperror");
const students = db.students;

// Import Excel
exports.createBulk = async (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body)) {
      return res.status(400).send({
        status: "Fail",
        message: "Invalid or empty request body for bulk insertion",
      });
    }
    // Bulk Insert
    const createdStudents = await students.bulkCreate(req.body);
    res.status(201).send({
      status: "Success",
      message: "Bulk insertion successful",
      data: createdStudents,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: "Fail",
      message: "Error occurred during bulk insertion" || error.message,
    });
  }
};

//CREATE
exports.create = catchasync(async (req, res, next) => {
  // Existing Student
  const existingStudent = await students.findOne({
    where: { Student_id: req.body.Student_id },
  });
  if (existingStudent) {
    return res.status(400).send({
      status: "Fail",
      message: "Student ID already exists",
    });
  }

  console.log(req.body.Father_Name);
  const Students = await students.create({
    Student_id: req.body.Student_id,
    Name: req.body.Name,
    Father_Name: req.body.Father_Name,
    Date_of_Birth: req.body.Date_of_Birth,
    Gender: req.body.Gender,
    Nrc_Exists: req.body.Nrc_Exists,
    Nrc: req.body.Nrc,
  });
  res.status(201).send({
    status: "success",
    message: "Successfully created a post.",
    Students: Students,
  });
});

// exports.create = async (req, res) => {
//   console.log(req.body);
//   if (!req.body.Name) {
//     return res.status(404).send({
//       message: "Please enter your name",
//     });
//   }
//   const existingStudent = await students.findOne({
//     where: { id: req.body.id },
//   });
//   if (existingStudent) {
//     return res.status(400).send({
//       status: "Fail",
//       message: "Student ID already exists",
//     });
//   }
//   console.log(req.body.father_name);

//   students
//     .create({
//       id: req.body.id,
//       name: req.body.name,
//       father_name: req.body.father_name,
//       date_of_birth: req.body.date_of_birth,
//       gender: req.body.gender,
//       nrc_exists: req.body.nrc_exists,
//       nrc: req.body.nrc,
//     })
//     .then((data) => {
//       res.status(201).send({
//         status: "Success",
//         message: "Successfully created",
//         Students: students,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send({
//         status: "Fail",
//         message: "Some error occoured while creating a user" || err.message,
//       });
//     });
// };
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
      where: { Student_id: id },
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
      where: { Student_id: id },
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
  students.destroy({
    where: {},
    truncate: false,
  });
  res.status(200).json({
    status: "success",
    message: "delete successfully",
  });
});

exports.findOne = (req, res) => {
  const id = req.params.id;

  students
    .findOne({
      where: { Student_id: id },
    })
    .then((student) => {
      if (student) {
        res.status(200).send({
          message: "Student found",
          data: student,
        });
      } else {
        res.status(404).send({
          message: `Cannot find student with id=${id}`,
        });
      }
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging purposes
      res.status(500).send({
        message: "Error finding student with id=" + id,
      });
    });
};
