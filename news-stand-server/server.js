const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();

const getNewsData = cb => {
  fs.readFile("./news-data.json", { encoding: "utf8" }, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    cb(jsonData);
  });
};

app.use(cors());

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  getNewsData(data => res.json(data));
});

app.listen(8080);
console.log("server start..");
