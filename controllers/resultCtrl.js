const db = require("../models/index");
const catchasync = require("../utils/catchasync");
const ExamResults = db.examresults;

const subjects = [
  "Myanmar",
  "English",
  "Mathematics",
  "Chemistry",
  "Physics",
  "Bio_Eco",
];

// CREATE
exports.save = catchasync(async (req, res, next) => {
  var results = "";
  subjects.forEach((subject) => {
    const subjectMarks = req.body[subject];
    if (subjectMarks >= 40) {
      return (results = "Passed");
    }
    if (subjectMarks < 40) {
      return (results = "Failed");
    }
  });
  const totalMarks =
    req.body.Myanmar +
    req.body.English +
    req.body.Mathematics +
    req.body.Chemistry +
    req.body.Physics +
    req.body.Bio_Eco;
  // console.log(">>>>>>>>>");
  // console.log(results);
  // console.log(totalMarks);
  // console.log(req.body.ExamResults);
  console.log(">>>>>>>");
  const examResults = await ExamResults.create({
    SchoolYear: req.body.SchoolYear,
    Myanmar: req.body.Myanmar,
    English: req.body.English,
    Mathematics: req.body.Mathematics,
    Chemistry: req.body.Chemistry,
    Physics: req.body.Physics,
    Bio_Eco: req.body.Bio_Eco,
    Total: totalMarks,
    Result: results == "Passed" ? true : false,
  });
  res.status(201).send({
    status: "Success",
    message: "Successfully created a post.",
    examResults: examResults,
  });
});

//GetAll
exports.findAll = (req, res) => {
  const examResults = req.query;
  ExamResults.findAll(examResults)
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
  ExamResults.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Delete successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Mark with id=${id}.May be Mark was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Mark with id=" + id,
      });
    });
};

// DELETE
exports.deleteAll = catchasync(async (req, res, next) => {
  ExamResults.destroy({
    where: {},
    truncate: false,
  });
  res.status(200).json({
    status: "Success",
    message: "Delete successfully",
  });
});
