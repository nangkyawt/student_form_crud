const app = require("./app");
const port = 3000;
require("./routers/students")(app);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
