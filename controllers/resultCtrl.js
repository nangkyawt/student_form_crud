const db = require("../models/index");
const catchasync = require("../utils/catchasync");
const ExamResults = db.examresults;
const Students = db.students;
// const students = require("../models/students");
// const ExamResults = require("../models/examresults");
// const Students = require("../models/students");

// CREATE
// exports.save = catchasync(async (req, res, next) => {
//   const subjectMarks = {
//     Myanmar: req.body.Myanmar,
//     English: req.body.English,
//     Mathematics: req.body.Mathematics,
//     Chemistry: req.body.Chemistry,
//     Physics: req.body.Physics,
//     Bio_Eco: req.body.Bio_Eco,
//   };
//   function markStatus(subjectMarks) {
//     const results = {};

//     for (const subject in subjectMarks) {
//       if (subjectMarks.hasOwnProperty(subject)) {
//         const mark = subjectMarks[subject];
//         results[subject] = {
//           mark,
//           status: mark >= 40 ? "Passed" : "Failed",
//         };
//       }
//     }

//     return results;
//   }
//   const subjectResults = markStatus(subjectMarks);
//   console.log(subjectResults);
//   let Result = true;
//   const totalMarks =
//     req.body.Myanmar +
//     req.body.English +
//     req.body.Mathematics +
//     req.body.Chemistry +
//     req.body.Physics +
//     req.body.Bio_Eco;
//   console.log(subjectMarks);

//   for (const subject in subjectResults) {
//     if (subjectResults.hasOwnProperty(subject)) {
//       const result = subjectResults[subject];
//       if (result.status === "Failed") {
//         Result = false; // Set Result to false if any subject is failed
//         break; // No need to continue checking if a failure is found
//       }
//     }
//   }
//   console.log(">>>>>>>");
//   const examResults = await ExamResults.create({
//     Student_id: req.body.Student_id,
//     SchoolYear: req.body.SchoolYear,
//     Myanmar: req.body.Myanmar,
//     English: req.body.English,
//     Mathematics: req.body.Mathematics,
//     Chemistry: req.body.Chemistry,
//     Physics: req.body.Physics,
//     Bio_Eco: req.body.Bio_Eco,
//     Total: totalMarks,
//     Result: Result,
//   });
//   console.log(" >>>>>>>>>>>>><<<<<<<<<<<<<<<<");
//   res.status(201).send({
//     status: "Success",
//     message: "Successfully created a post.",
//     examResults: examResults,
//   });
// });
exports.save = catchasync(async (req, res, next) => {
  console.log(id, ">>>>>>>>>>");
  try {
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

    let Result = true;
    const totalMarks =
      req.body.Myanmar +
      req.body.English +
      req.body.Mathematics +
      req.body.Chemistry +
      req.body.Physics +
      req.body.Bio_Eco;

    for (const subject in subjectResults) {
      if (subjectResults.hasOwnProperty(subject)) {
        const result = subjectResults[subject];
        if (result.status === "Failed") {
          Result = false;
          break;
        }
      }
    }

    const examResults = await ExamResults.create({
      Student_id: req.body.id,
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

    console.log("Exam Results created successfully:", examResults);

    res.status(201).send({
      status: "Success",
      message: "Successfully created a post.",
      examResults: examResults,
    });
  } catch (error) {
    console.error("Error creating exam results:", error);
    res.status(500).send({
      status: "Error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
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

  ExamResults.update(req.body, {
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
        error: err.message,
      });
    });
};

// DELETE ALL BY STUDENT ID
exports.deleteAllByStudentId = (req, res) => {
  const Student_id = req.params.id;
  ExamResults.destroy({
    where: { Student_id: Student_id },
  });
  Students.destroy({
    where: { Student_id: Student_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Delete successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Mark with id=${Student_id}.May be Mark was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Mark with id=" + Student_id,
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

// exports.createBulk = async (req, res) => {
//   const id = req.body.Student_id;
//   console.log(id);
//   try {
//     if (!req.body || !Array.isArray(req.body)) {
//       return res.status(400).send({
//         status: "Fail",
//         message: "Invalid or empty request body for bulk insertion",
//       });
//     }
//     console.log(req.body);
//     req.body = req.body.map((item) => {
//       // Modify the logic based on how you want to change the ID
//       item.Student_id = id;
//       item.Total = calculateTotalMark(item);
//       item.Result = itemResult(item);

//       return item;
//     });
//     console.log(req.body);

//     // Bulk Insert

//     const createdMarks = await ExamResults.bulkCreate(req.body);
//     res.status(201).send({
//       status: "Success",
//       message: "Bulk insertion successful",
//       data: createdMarks,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({
//       status: "Fail",
//       message: "Error occurred during bulk insertion" || error.message,
//     });
//   }
// };

exports.createBulk = async (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body)) {
      return res.status(400).send({
        status: "Fail",
        message: "Invalid or empty request body for bulk insertion",
      });
    }
    // Extract IDs from the request body
    const newIds = req.body.map((Student_id) => Student_id.id);
    // Check if any of the new IDs already exist in the database
    const existingIds = await ExamResults.findAll({
      where: {
        Student_id: newIds,
      },
      attributes: ["id"], // Only fetch the IDs for existing records
    });
    console.log(this.ExamResults);
    if (existingIds.length > 0) {
      return res.status(400).send({
        status: "Fail",
        message: "One or more IDs already exist in the database",
        existingIds: existingIds.map((record) => record.id),
      });
    }
    // Bulk Insert
    const createdStudent = await ExamResults.bulkCreate(req.body);
    res.status(201).send({
      status: "Success",
      message: "Bulk insertion successful",
      data: createdStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: "Fail",
      message: "Error occurred during bulk insertion" || error.message,
    });
  }
};

function itemResult(item) {
  const subjects = [
    "Myanmar",
    "English",
    "Mathematics",
    "Chemistry",
    "Physics",
    "Bio_Eco",
  ];
  const isFailed = subjects.some((subject) => item[subject] < 40);
  return isFailed ? false : true;
}

function calculateTotalMark(item) {
  // Implement your logic to calculate TotalMark based on multiple subjects
  const subjects = [
    "Myanmar",
    "English",
    "Mathematics",
    "Chemistry",
    "Physics",
    "Bio_Eco",
  ];
  const totalMark = subjects.reduce(
    (sum, subject) => sum + (item[subject] || 0),
    0
  );
  return totalMark;
}

// exports.createStudentAndResults = catchasync(async (req, res) => {
//   const id = req.body.Student_id;

//   try {
//     // Check if the student already exists
//     const existingStudent = await Students.findOne({
//       where: { Student_id: id },
//     });

//     if (!existingStudent) {
//       // Create the student
//       const createdStudent = await Students.create({
//         Student_id: id,
//         Name: req.body.Name,
//         Father_Name: req.body.Father_Name,
//         Date_of_Birth: req.body.Date_of_Birth,
//         Gender: req.body.Gender,
//         Nrc_Exists: req.body.Nrc_Exists,
//         Nrc: req.body.Nrc,
//       });

//       // Bulk insert exam results
//       const bulkItems = req.body.examResults.map((item) => {
//         item.Student_id = id;
//         item.Total = calculateTotalMark(item);
//         item.Result = itemResult(item);
//         return item;
//       });

//       const createdMarks = await ExamResults.bulkCreate(bulkItems);

//       res.status(201).send({
//         status: "Success",
//         message: "Student and exam results created successfully",
//         student: createdStudent,
//         examResults: createdMarks,
//       });
//     } else {
//       res.status(400).send({
//         status: "Fail",
//         message: "Student ID already exists",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       status: "Fail",
//       message: "Error occurred during creation" || error.message,
//     });
//   }
// });

exports.createStudentAndResults = catchasync(async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    // Create the student
    const createdStudent = await Students.create(
      {
        Student_id: req.body.Student_id,
        Name: req.body.Name,
        Father_Name: req.body.Father_Name,
        Date_of_Birth: req.body.Date_of_Birth,
        Gender: req.body.Gender,
        Nrc_Exists: req.body.Nrc_Exists,
        Nrc: req.body.Nrc,
      },
      { transaction: t }
    );

    // Bulk insert exam results
    const bulkItems = req.body.examResults.map((item) => {
      item.Student_id = req.body.Student_id;
      item.Total = calculateTotalMark(item);
      item.Result = itemResult(item);
      return item;
    });

    const createdMarks = await ExamResults.bulkCreate(bulkItems, {
      transaction: t,
    });

    // Commit the transaction
    await t.commit();

    res.status(201).send({
      status: "Success",
      message: "Student and exam results created successfully",
      student: createdStudent,
      examResults: createdMarks,
    });
  } catch (error) {
    console.error(error);
    // Rollback the transaction in case of an error
    await t.rollback();

    res.status(500).send({
      status: "Fail",
      message: "Error occurred during creation" || error.message,
    });
  }
});

//Get
// exports.get = async (req, res) => {
//   const id = req.params.id;
//   const data = await Students.findAll({
//     include: [
//       {
//         model: ExamResults,
//         as: "results",
//       },
//     ],
//     where: {
//       Student_id: id,
//     },
//   });
//   res.status(201).send({
//     status: "Success",
//     data,
//   });
// };

//Delete TB RS
exports.get = async (req, res) => {
  const id = req.params.id;
  const data = await Students.findAll({
    include: [
      {
        model: ExamResults,
        as: "exam_results",
      },
    ],
    where: {
      Student_id: id,
    },
  });
  res.status(201).send({
    status: "Success",
    data,
  });
};

// exports.newCreate = catchasync(async (req, res, next) => {

//   try {
//     const subjectMarks = {
//       Myanmar: req.body.Myanmar,
//       English: req.body.English,
//       Mathematics: req.body.Mathematics,
//       Chemistry: req.body.Chemistry,
//       Physics: req.body.Physics,
//       Bio_Eco: req.body.Bio_Eco,
//     };

//     function markStatus(subjectMarks) {
//       const results = {};

//       for (const subject in subjectMarks) {
//         if (subjectMarks.hasOwnProperty(subject)) {
//           const mark = subjectMarks[subject];
//           results[subject] = {
//             mark,
//             status: mark >= 40 ? "Passed" : "Failed",
//           };
//         }
//       }

//       return results;
//     }

//     const subjectResults = markStatus(subjectMarks);

//     let Result = true;
//     const totalMarks =
//       req.body.Myanmar +
//       req.body.English +
//       req.body.Mathematics +
//       req.body.Chemistry +
//       req.body.Physics +
//       req.body.Bio_Eco;

//     for (const subject in subjectResults) {
//       if (subjectResults.hasOwnProperty(subject)) {
//         const result = subjectResults[subject];
//         if (result.status === "Failed") {
//           Result = false;
//           break;
//         }
//       }
//     }

//     const examResults = await ExamResults.create({
//       Student_id: req.body.Student_id,
//       SchoolYear: req.body.SchoolYear,
//       Myanmar: req.body.Myanmar,
//       English: req.body.English,
//       Mathematics: req.body.Mathematics,
//       Chemistry: req.body.Chemistry,
//       Physics: req.body.Physics,
//       Bio_Eco: req.body.Bio_Eco,
//       Total: totalMarks,
//       Result: Result,
//     });

//     console.log("Exam Results created successfully:", examResults);

//     res.status(201).send({
//       status: "Success",
//       message: "Successfully created a post.",
//       examResults: examResults,
//     });
//   } catch (error) {
//     console.error("Error creating exam results:", error);
//     res.status(500).send({
//       status: "Error",
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// });

//NewCreate
exports.createNewStudentAndMark = catchasync(async (req, res, next) => {
  try {
    // Check if the student already exists
    const existingStudent = await Students.findOne({
      where: { Student_id: req.body.Student_id },
    });

    if (existingStudent) {
      return res.status(400).send({
        status: "Fail",
        message: "Student ID already exists",
      });
    }

    // Create a new student
    const newStudent = await Students.create({
      Student_id: req.body.Student_id,
      Name: req.body.Name,
      Father_Name: req.body.Father_Name,
      Date_of_Birth: req.body.Date_of_Birth,
      Gender: req.body.Gender,
      Nrc_Exists: req.body.Nrc_Exists,
      Nrc: req.body.Nrc,
    });

    // Create exam results for the new student
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

    let Result = true;
    const totalMarks =
      req.body.Myanmar +
      req.body.English +
      req.body.Mathematics +
      req.body.Chemistry +
      req.body.Physics +
      req.body.Bio_Eco;

    for (const subject in subjectResults) {
      if (subjectResults.hasOwnProperty(subject)) {
        const result = subjectResults[subject];
        if (result.status === "Failed") {
          Result = false;
          break;
        }
      }
    }

    // Create exam results
    const examResults = await ExamResults.create({
      Student_id: req.body.Student_id,
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

    console.log(
      "New Student and Exam Results created successfully:",
      newStudent,
      examResults
    );

    res.status(201).send({
      status: "Success",
      message: "Successfully created a new student and exam results.",
      newStudent: newStudent,
      examResults: examResults,
    });
  } catch (error) {
    console.error("Error creating new student and exam results:", error);
    res.status(500).send({
      status: "Error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
