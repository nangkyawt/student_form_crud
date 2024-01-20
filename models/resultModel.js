module.exports = (sequelize, Sequelize) => {
  const examresults = sequelize.define("Result", {
    Result_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      notEmpty: true,
      autoIncrement: true,
    },
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
