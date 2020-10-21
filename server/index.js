const port = process.env.PORT || 5000;
const db = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./users.routes");
const logger = require("./logger");
const fs = require("fs").promises;
const app = express();
const data = require("./five-letter-words.json");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(logger);

app.get("/", (req, res) => {
  res.json({ status: "success", message: "Server is live" });
});

app.get("/random-word", async (req, res) => {
  const words = data.fiveLetterWords;
  const word = words[Math.floor(Math.random() * words.length)];
  res.send(word);
});

app.use("/api", userRoutes);

app.listen(port, function () {
  console.log(`Server listening to port ${port}`);
});
