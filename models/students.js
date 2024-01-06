module.exports = (sequelize, Sequelize) => {
  const students = sequelize.define("students", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      notEmpty: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    father_name: {
      type: Sequelize.STRING,
    },
    date_of_birth: {
      type: Sequelize.DATE,
    },
    gender: {
      type: Sequelize.BOOLEAN,
    },
    nrc_exists: {
      type: Sequelize.BOOLEAN || null,
    },
    nrc: {
      type: Sequelize.STRING,
    },
  });
  return students;
};
