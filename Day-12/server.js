require('dotenv').config () //dotenv variable ko access karta hai
const app= require("./src/app")
const connectToDB =require("./src/config/database")


connectToDB();

app.listen(3000, () => {
  console.log("server is runnig on port 3000");
});
