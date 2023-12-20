module.exports = {
  HOST: "localhost",
  USER: "mit",
  PASSWORD: "12192023",
  DB: "students",
  dialect: "postgres", //mysql, sqlite
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
