const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const response_mock = require("./mock-data.js");

app.listen(4000, function() {
  console.log("start, express server on port 4000");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/news/:company", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  return res.json(
    response_mock.list.find(item => item.company === req.params.company)
  );
});

app.get("/api/news/my/:company/:subscribe", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const company = response_mock.list.find(
    item => item.company === req.params.company
  );
  const index = response_mock.list.indexOf(company);
  response_mock.list[index] = {
    ...response_mock.list[index],
    onSubscribe: req.params.subscribe == "true"
  };
  return res.json({ msg: "okay" });
});

app.get("/api/news/my/companies", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  return res.json({
    total: response_mock.list.filter(item => {
      if (req.query.onSubscribe) {
        return item.onSubscribe;
      } else {
        return true;
      }
    }).length,
    list: response_mock.list
      .filter(item => {
        if (req.query.onSubscribe) {
          return item.onSubscribe;
        } else {
          return true;
        }
      })
      .map(item => ({
        name: item.company,
        logo: item.logoImgUrl,
        onSubscribe: item.onSubscribe
      }))

      .sort()
      .slice(req.query.startIndex, req.query.startIndex + req.query.rowCount)
  });
});
