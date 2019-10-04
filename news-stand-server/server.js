const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  try {
    fs.readFile("./news-data.json", (err, data) => {
      if (err) throw err;

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(data);
      res.end();
    });
  } catch (error) {
    console.error(err);
    res.err;
    res.end();
  }
});

server.listen(8080);
console.log("server has started.");
