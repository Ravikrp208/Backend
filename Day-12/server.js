require('dotenv').config ()
const app= require("./src/app")
const connectToDB = require("./src/config/database")


connectTodb();

app.listen(3000, () => {
  console.log("server is runnig on port 3000");
});
