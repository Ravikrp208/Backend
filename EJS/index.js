const express = require("express");
const app = express();
const path = require("path");

const port = 3000;

app.set("view engine", "ejs");

// Set the directory for views
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("home.ejs"); // looks for 'views/home.ejs'
});

app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  const followers = ["adam", "shivam", "manish", "rupesh", "sourav"];
  res.render("instagram.ejs", { username, followers });
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/rolldice", (req, res) => {
  res.render("rolldice.ejs");
});
// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
