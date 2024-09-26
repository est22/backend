// File routing

const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "application/json");

     if (path == "/json") {
         const data = fs.readFileSync('test.json', 'utf-8');
         const result = JSON.parse(data);
         const resStr = JSON.stringify(result);
         res.end(resStr);
        
     } else {
       res.end("");
     }

}).listen(4500);
