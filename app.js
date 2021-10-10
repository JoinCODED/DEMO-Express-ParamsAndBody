const express = require("express");
const cookies = require("./cookies");

const app = express();

// Cookie List
app.get("/cookies", (req, res) => {
  res.json(cookies);
});

const PORT = 8000;

app.listen(PORT, () =>
  console.log(`The application is running on localhost:${PORT}`)
);
