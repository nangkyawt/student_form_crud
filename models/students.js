module.exports = (sequelize, Sequelize) => {
  const students = sequelize.define("student_forms", {
    Student_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      notEmpty: true,
    },
    Name: {
      type: Sequelize.STRING,
    },
    Father_Name: {
      type: Sequelize.STRING,
    },
    Date_of_Birth: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    Gender: {
      type: Sequelize.BOOLEAN,
    },
    Nrc_Exists: {
      type: Sequelize.BOOLEAN || null,
    },
    Nrc: {
      type: Sequelize.STRING,
    },
  });
  return students;
};
