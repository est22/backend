const http = require('http'); // require: 외부 모듈

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write("안녕 홍길동");
    res.end();
}).listen(4500);

