const db = require("../models/index");
const catchasync = require("../utils/catchasync");
const ExamResults = db.examresults;
const Students = db.students;

// CREATE
exports.save = catchasync(async (req, res, next) => {
  const subjectMarks = {
    Myanmar: req.body.Myanmar,
    English: req.body.English,
    Mathematics: req.body.Mathematics,
    Chemistry: req.body.Chemistry,
    Physics: req.body.Physics,
    Bio_Eco: req.body.Bio_Eco,
  };
  function markStatus(subjectMarks) {
    const results = {};

    for (const subject in subjectMarks) {
      if (subjectMarks.hasOwnProperty(subject)) {
        const mark = subjectMarks[subject];
        results[subject] = {
          mark,
          status: mark >= 40 ? "Passed" : "Failed",
        };
      }
    }

    return results;
  }
  const subjectResults = markStatus(subjectMarks);
  console.log(subjectResults);
  let Result = true;
  const totalMarks =
    req.body.Myanmar +
    req.body.English +
    req.body.Mathematics +
    req.body.Chemistry +
    req.body.Physics +
    req.body.Bio_Eco;
  console.log(subjectMarks);

  for (const subject in subjectResults) {
    if (subjectResults.hasOwnProperty(subject)) {
      const result = subjectResults[subject];
      if (result.status === "Failed") {
        Result = false; // Set Result to false if any subject is failed
        break; // No need to continue checking if a failure is found
      }
    }
  }
  console.log(">>>>>>>");
  const examResults = await ExamResults.create({
    id: req.body.id,
    SchoolYear: req.body.SchoolYear,
    Myanmar: req.body.Myanmar,
    English: req.body.English,
    Mathematics: req.body.Mathematics,
    Chemistry: req.body.Chemistry,
    Physics: req.body.Physics,
    Bio_Eco: req.body.Bio_Eco,
    Total: totalMarks,
    Result: Result,
  });
  console.log(" >>>>>>>>>>>>><<<<<<<<<<<<<<<<");
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

//Get
exports.get = async (req, res) => {
  const id = req.params.id;
  const data = await Students.findAll({
    include: [
      {
        model: ExamResults,
        as: "Result",
      },
    ],
    where: {
      id: id,
    },
  });
  res.status(201).send({
    status: "Success",
    data,
  });
};
