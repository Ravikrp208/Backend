const express = require("express");
const app = express();

let port = 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

// app.use((req, res) => {
//   console.log("Request received");
//   res.send("Hello from Express!");

// });

// app.use((req, res) => {
//   console.log("Request received");
//   res.send({
//     name: "apple",
//     color: "red",
//   });
// });

// app.use((req, res) => {
//   console.log("Request received");

//   let code = `
//     <h1>Fruits</h1>
//     <ul>
//       <li>Apple</li>
//       <li>Banana</li>
//       <li>Mango</li>
//     </ul>
//   `;

//   res.send(code);
// });

//routing

// app.get("/", (req, res) => {
//   res.send("hello ,i am root");
// });
// app.get("/apple", (req, res) => {
//   res.send("you contaacted apple");
// });
// app.get("/banana", (req, res) => {
//   res.send("you contaacted banana");
// });

// app.get(/.*/, (req, res) => {
//   res.status(404).send("404: This path does not exist");
// });

// app.post("/", (req, res) => {
//   res.send("you sent a post reqest to root");
// });

// app.get("/", (req, res) => {
//   res.send("hello, I am root");
// });



// app.get("/:username/:id", (req, res) => {
//   let { username, id } = req.params; // ✅ Correct
//   let htmlStr = `<h1>Welcome to the page of @${username} (ID: ${id})</h1>`;
//   res.send(htmlStr);
// });


app.get("/search", (req, res) => {
  let { q } = req.query;

  if (!q) {
    return res.send("<h1>Nothing searched</h1>");
  }

  res.send(`<h1>Search result for query: ${q}</h1>`);
});
