const db = require("../models/index");
const catchasync = require("../utils/catchasync");
const ExamResults = db.examresults;
const Students = db.students;
const { Op } = require("sequelize");
const { sequelize } = require("../models");

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
    .then((examResults) => {
      res.status(201).send({
        status: "success",
        data: examResults,
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

//Delete one
// exports.deleteOne = (req, res) => {
//   const id = req.params.id;
//   ExamResults.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Delete successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Mark with id=${id}.May be Mark was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Mark with id=" + id,
//         error: err.message,
//       });
//     });
// };

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
// Assuming you have a file for database models
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    await db.sequelize.transaction(async (t) => {
      // Delete records from db.examresults
      const numDeletedExamResults = await db.examresults.destroy({
        where: { Student_id: id },
        transaction: t,
      });

      // Delete records from db.student
      const numDeletedStudent = await db.students.destroy({
        where: { Student_id: id },
        transaction: t,
      });
      console.log(
        numDeletedExamResults,
        numDeletedStudent,
        " >>>>>>>>>>>>>>>>>>>"
      );

      if (numDeletedStudent === 1) {
        res.send({
          message: "Delete successful!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete student with id=${id} or related exam results. Student or exam results were not found!`,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message:
        "Could not delete student with id=" + id + " or related exam results.",
      error: error.message,
    });
  }
};

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

exports.createStudentAndResults = catchasync(async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    // Check if required fields are null
    if (
      !req.body.Student_id ||
      !req.body.Name ||
      !req.body.Father_Name ||
      !req.body.Date_of_Birth ||
      typeof req.body.Gender == "undefined" ||
      typeof req.body.Nrc_Exists == "undefined" ||
      !req.body.examResults
    ) {
      // Prepare the error messages for each field
      const errorMessages = [];
      if (!req.body.SchoolYear) {
        errorMessages.push("School Year is required.");
      }
      if (!req.body.Student_id) {
        errorMessages.push("Student ID is required.");
      }
      if (!req.body.Name) {
        errorMessages.push("Name is required.");
      }
      if (!req.body.Father_Name) {
        errorMessages.push("Father's Name is required.");
      }
      if (!req.body.Date_of_Birth) {
        errorMessages.push("Date of Birth is required.");
      }
      if (typeof req.body.Gender == "undefineds") {
        errorMessages.push("Gender is required.");
      }
      if (typeof req.body.Nrc_Exists == "undefined") {
        errorMessages.push("NRC Exists is required.");
      }
      if (!req.body.Nrc) {
        errorMessages.push("NRC is required.");
      }
      if (!req.body.examResults) {
        errorMessages.push("Exam Results are required.");
      }
      console.log(errorMessages);
      // Send response with error messages
      return res.status(400).send({
        status: "Fail",
        message: "Required Field",
        errors: errorMessages,
      });
    }

    // Create the student
    const createdStudent = await Students.create(
      {
        Student_id: req.body.Student_id,
        Name: req.body.Name,
        Father_Name: req.body.Father_Name,
        Date_of_Birth: req.body.Date_of_Birth,
        Gender: req.body.Gender,
        Nrc_Exists: req.body.Nrc_Exists ? "Yes" : "No",
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

// FindOne Mark
exports.findOne = (req, res) => {
  const id = req.params.id;

  ExamResults.findOne({
    where: { id: id },
  })
    .then((examResults) => {
      if (examResults) {
        res.status(200).send({
          message: "Mark found",
          data: examResults,
        });
      } else {
        res.status(404).send({
          message: `Cannot find mark with id=${id}`,
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

//findOne and destroy
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  // Find the mark first
  ExamResults.findOne({
    where: { id: id },
  })
    .then((examResults) => {
      if (!examResults) {
        // If mark doesn't exist, return 404 Not Found
        return res.status(404).send({
          message: `Cannot find mark with id=${id}`,
        });
      }

      // If mark exists, proceed with deletion
      // Destroy the mark
      return ExamResults.destroy({
        where: { id: id },
      });
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Delete successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Mark with id=${id}. May be Mark was not found!`,
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

// exports.excelImport = catchasync(async (req, res) => {
//   const t = await db.sequelize.transaction();

//   try {
//     // Create the student
//     const createdStudent = await Students.create(
//       {
//         Student_id: req.body.Student_id,
//         Name: req.body.Name,
//         Father_Name: req.body.Father_Name,
//         Date_of_Birth: req.body.Date_of_Birth,
//         Gender: req.body.Gender,
//         Nrc_Exists: req.body.Nrc_Exists,
//         Nrc: req.body.Nrc,
//       },
//       { transaction: t }
//     );

//     // Bulk insert exam results
//     const bulkItems = req.body.examResults.map((item) => {
//       item.Student_id = req.body.Student_id;
//       item.Total = calculateTotalMark(item);
//       item.Result = itemResult(item);
//       return item;
//     });

//     const createdMarks = await ExamResults.bulkCreate(bulkItems, {
//       transaction: t,
//     });

//     // Commit the transaction
//     await t.commit();

//     res.status(201).send({
//       status: "Success",
//       message: "Student and exam results created successfully",
//       student: createdStudent,
//       examResults: createdMarks,
//     });
//   } catch (error) {
//     console.error(error);
//     // Rollback the transaction in case of an error
//     await t.rollback();

//     res.status(500).send({
//       status: "Fail",
//       message: "Error occurred during creation" || error.message,
//     });
//   }
// });
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   ExamResults.findOne({
//     where: { id: id },
//   })
//     .then((examResults) => {
//       if (examResults) {
//         res.status(200).send({
//           message: "Mark found",
//           data: examResults,
//         });
//       } else {
//         res.status(404).send({
//           message: `Cannot find mark with id=${id}`,
//         });
//       }
//     })
//     .catch((err) => {
//       console.error(err); // Log the error for debugging purposes
//       res.status(500).send({
//         message: "Error finding mark with id=" + id,
//       });
//     });
// };

// exports.excelImport = async (req, res) => {
//   try {
//     if (!req.body || !Array.isArray(req.body)) {
//       return res.status(400).send({
//         status: "Fail",
//         message: "Invalid or empty request body for bulk insertion",
//       });
//     }

//     // Extract Student_ids from the request body
//     const studentIds = req.body.map((student) => student.Student_id);

//     // Filter out null or undefined Student_ids
//     const validStudentIds = studentIds.filter(
//       (id) => id !== null && id !== undefined
//     );

//     if (validStudentIds.length === 0) {
//       return res.status(400).send({
//         status: "Fail",
//         message: "No valid Student_id found in the request body",
//       });
//     }

//     // Find existing Student_ids in the database
//     const existingIds = await Students.findAll({
//       where: {
//         Student_id: {
//           [Op.in]: validStudentIds,
//         },
//       },
//       attributes: ["Student_id"],
//     });

//     const existingStudentIds = existingIds.map((student) => student.Student_id);
//     const newStudents = req.body.filter(
//       (student) => !existingStudentIds.includes(student.Student_id)
//     );

//     if (existingIds.length > 0) {
//       console.log("Existing students:", existingIds);
//     }

//     // Bulk Insert new students
//     const createdStudents = await Students.bulkCreate(newStudents);

//     // Bulk Insert exam results
//     const createdExamResults = await ExamResults.bulkCreate(
//       req.body.flatMap((student) =>
//         student.examResults.map((result) => {
//           // Calculate totalMarks for each student
//           const totalMarks =
//             result.Myanmar +
//             result.English +
//             result.Mathematics +
//             result.Chemistry +
//             result.Physics +
//             result.Bio_Eco;
//           return {
//             Student_id: student.Student_id,
//             SchoolYear: result.SchoolYear,
//             Myanmar: result.Myanmar,
//             English: result.English,
//             Mathematics: result.Mathematics,
//             Chemistry: result.Chemistry,
//             Physics: result.Physics,
//             Bio_Eco: result.Bio_Eco,
//             Total: totalMarks,
//           };
//         })
//       )
//     );

//     res.status(201).send({
//       status: "Success",
//       message: "Students and exam results created successfully",
//       students: createdStudents,
//       examResults: createdExamResults,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({
//       status: "Fail",
//       message: "Error occurred during bulk insertion" || error.message,
//     });
//   }
// };

// exports.excelImport = async (req, res) => {
//   try {
//     if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
//       return res.status(400).send({
//         status: "Fail",
//         message: "Invalid or empty request body for bulk insertion",
//       });
//     }

//     await sequelize.transaction(async (t) => {
//       for (const student of req.body) {
//         // Validation - check if student data is valid
//         if (!isValidStudent(student)) {
//           console.error("Invalid student data:", student);
//           continue; // Skip this student and move to the next one
//         }

//         const existingStudent = await Students.findOne({
//           where: { Student_id: student.Student_id },
//           transaction: t,
//         });

//         // if (existingStudent) {
//         //   await ExamResults.destroy({
//         //     where: { Student_id: student.Student_id },
//         //     transaction: t,
//         //   });
//         // }

//         await Students.upsert(student, { transaction: t });

//         const examResultsToInsert = student.examResults
//           .map((result) => {
//             // Validation - check if exam result data is valid
//             if (!isValidExamResult(result)) {
//               console.error("Invalid exam result data:", result);
//               return null;
//             }

//             const totalMarks =
//               result.Myanmar +
//               result.English +
//               result.Mathematics +
//               result.Chemistry +
//               result.Physics +
//               result.Bio_Eco;
//             return {
//               Student_id: student.Student_id,
//               SchoolYear: result.SchoolYear,
//               Myanmar: result.Myanmar,
//               English: result.English,
//               Mathematics: result.Mathematics,
//               Chemistry: result.Chemistry,
//               Physics: result.Physics,
//               Bio_Eco: result.Bio_Eco,
//               Total: totalMarks,
//               Result: result.Result === "Passed" ? false : true,
//             };
//           })
//           .filter(Boolean); // Filter out null values

//         await ExamResults.bulkCreate(examResultsToInsert, { transaction: t });
//       }

//       res.status(201).send({
//         status: "Success",
//         message: "Students and exam results created/updated successfully",
//       });
//     });
//   } catch (error) {
//     console.error("Error occurred during bulk insertion:", error);
//     await t.rollback(); // Rollback the transaction if an error occurs
//     res.status(400).send({
//       status: "Fail",
//       message: "Error occurred during bulk insertion" || error.message,
//     });
//   }
// };

// Function to validate student data
function isValidStudent(student) {
  return (
    student &&
    student.Student_id &&
    student.examResults &&
    Array.isArray(student.examResults)
  );
}

// Function to validate exam result data
function isValidExamResult(result) {
  return (
    result &&
    result.SchoolYear &&
    typeof result.Myanmar === "number" &&
    typeof result.English === "number" &&
    typeof result.Mathematics === "number" &&
    typeof result.Chemistry === "number" &&
    typeof result.Physics === "number" &&
    typeof result.Bio_Eco === "number"
  );
}

exports.excelImport = async (req, res) => {
  let transaction;
  try {
    if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).send({
        status: "Fail",
        message: "Invalid or empty request body for bulk insertion",
      });
    }

    transaction = await sequelize.transaction();

    for (const student of req.body) {
      // Validation - check if student data is valid
      if (!isValidStudent(student)) {
        console.error("Invalid student data:", student);
        continue; // Skip this student and move to the next one
      }

      const existingStudent = await Students.findOne({
        where: { Student_id: student.Student_id },
        transaction,
      });

      // if (existingStudent) {
      //   // Delete existing exam results for the student
      //   await ExamResults.destroy({
      //     where: { Student_id: student.Student_id },
      //     transaction,
      //   });
      // }
      //  if (existingStudent) {
      //    // Delete existing exam results for the student
      //    await ({
      //    where: { Student_id: student.Student_id },
      //   transaction,
      //   });
      // }

      // Upsert student information
      await Students.upsert(student, { transaction });

      // Insert new exam results for the student
      const examResultsToInsert = student.examResults.map((result) => {
        // Validation - check if exam result data is valid
        if (!isValidExamResult(result)) {
          console.error("Invalid exam result data:", result);
          return null;
        }

        const totalMarks =
          result.Myanmar +
          result.English +
          result.Mathematics +
          result.Physics +
          result.Chemistry +
          result.Bio_Eco;
        return {
          Student_id: student.Student_id,
          SchoolYear: result.SchoolYear,
          Myanmar: result.Myanmar,
          English: result.English,
          Mathematics: result.Mathematics,
          Chemistry: result.Chemistry,
          Physics: result.Physics,
          Bio_Eco: result.Bio_Eco,
          Total: totalMarks,
          Result: result.Result === "Passed" ? true : false,
        };
      });

      await ExamResults.bulkCreate(examResultsToInsert.filter(Boolean), {
        transaction,
      });
    }

    await transaction.commit();

    res.status(201).send({
      status: "Success",
      message: "Students and exam results created/updated successfully",
    });
  } catch (error) {
    console.error("Error occurred during bulk insertion:", error);
    if (transaction) await transaction.rollback(); // Rollback the transaction if an error occurs
    res.status(400).send({
      status: "Fail",
      message: "Error occurred during bulk insertion" || error.message,
    });
  }
};

// Delete marks by studentid
exports.deleteMarkByStudentId = async (req, res) => {
  const id = req.params.id;

  try {
    await db.sequelize.transaction(async (t) => {
      // Delete records from db.examresults
      const numDeletedExamResults = await db.examresults.destroy({
        where: { Student_id: id },
        transaction: t,
      });

      console.log(numDeletedExamResults, "Delete mark by student id");

      if (numDeletedExamResults > 0) {
        res.send({
          message: "Delete successful!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete student with id=${id} or related exam results. Student or exam results were not found!`,
        });
      }
    });
  } catch (error) {
    console.error("Error deleting student or related exam results:", error);
    res.status(500).send({
      message: `Could not delete student with id=${id} or related exam results.`,
      error: error.message,
    });
  }
};

// exports.deleteMarkByStudentId = async (req, res) => {
//   const id = req.params.id;

//   try {
//     // Fetch student data before deletion
//     const student = await db.students.findOne({
//       where: { id },
//     });

//     if (!student) {
//       return res.status(404).send({
//         message: `Student with id=${id} not found.`,
//       });
//     }

//     // Delete exam results
//     const numDeletedExamResults = await db.examresults.destroy({
//       where: { Student_id: id },
//     });

//     console.log(numDeletedExamResults, "Delete exam results by student id");

//     if (numDeletedExamResults > 0) {
//       res.send({
//         message: "Exam results deleted successfully!",
//         student: student, // Include student data in the response
//       });
//     } else {
//       res.status(404).send({
//         message: `No exam results found for student with id=${id}.`,
//         student: student, // Include student data even if no exam results were found
//       });
//     }
//   } catch (error) {
//     console.error("Error deleting exam results:", error);
//     res.status(500).send({
//       message: `Could not delete exam results for student with id=${id}.`,
//       error: error.message,
//     });
//   }
// };
