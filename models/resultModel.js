module.exports = (sequelize, Sequelize) => {
  const examresults = sequelize.define("abc", {
    SchoolYear: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Myanmar: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    English: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    Mathematics: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    Chemistry: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    Physics: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    Bio_Eco: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
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
