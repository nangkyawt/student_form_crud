module.exports = (sequelize, Sequelize) => {
  const examresults = sequelize.define("exam_results", {
    SchoolYear: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Myanmar: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    English: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Mathematics: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Chemistry: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Physics: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Bio_Eco: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Total: {
      type: Sequelize.INTEGER,
    },
    Result: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
  return examresults;
};
