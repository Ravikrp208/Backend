require("dotenv")
const app = require("./src/app");
const connectTodb =require("./src/config/database")

app.listen(3000, () => {
  console.log("server is runnig on port 3000");
});
