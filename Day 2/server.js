const express = require("express");
const app = express(); // server ko create kar rahe hai
const port = 3000;

app.get("/", function (req, res) {
  res.send("I am Ravi kumar Pandit ");
});
app.get("/home", function (req, res) {
  res.send("I  am a student of Mca ");
});

app.listen(port, function () {
  console.log("Server running on port " + port);
});


//app.listen (3000)   //server start kar rahe hai
