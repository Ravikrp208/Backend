require("dotenv").config();
const app = require("./src/app")
const connectToBD = require("./src/config/database")
const { request } = require("./src/app");

connectToBD();
app.listen(3000, () => {
  console.log("server is runnig on port 3000");
});
