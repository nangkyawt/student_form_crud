const dbConfig = require("../config/dbconfig");
const Sequelize = require("sequelize"); //ORM
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  //   dialect: "postgres",
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students = require("./students")(sequelize, Sequelize);
db.examresults = require("./resultModel")(sequelize, Sequelize);

//Table Relationship
db.students.hasMany(db.examresults, {
  foreignKey: "Student_id",
  as: "exam_results", //table name
});
db.examresults.belongsTo(db.students, {
  foreignKey: "Student_id",
  as: "student_forms", //table name
});

module.exports = db;
