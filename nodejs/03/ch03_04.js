const fs = require('fs');

const content = "안녕하세요 홍길동입니다 \n반갑습니다";
// fs.writeFile('out.txt', content, err => { });
fs.writeFileSync('out.sync.txt', content);