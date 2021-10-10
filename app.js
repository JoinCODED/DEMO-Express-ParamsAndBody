const express = require("express");
const cookies = require("./cookies");

const app = express();

app.use(express.json());

// Cookie List
app.get("/cookies", (req, res) => {
  res.json(cookies);
});

app.get("/cookies/:cookieId", (req, res) => {
  const cookie = cookies.find((cookie) => cookie.id === +req.params.cookieId);
  res.json(cookie);
});

app.post("/cookies", (req, res) => {
  console.log(req.body);
});

const PORT = 8000;

app.listen(PORT, () =>
  console.log(`The application is running on localhost:${PORT}`)
);
