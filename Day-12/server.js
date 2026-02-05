require("dotenv").config();
const connectTodb = require("./scr/config/database");
const app = require("./scr/app");

connectTodb();

app.listen(3000, () => {
  console.log("server is runnig on port 3000");
});
