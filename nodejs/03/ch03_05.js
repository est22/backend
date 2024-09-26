const fs = require('fs');
const dirname = 'naver/daum/google';
fs.mkdirSync(dirname, { recursive: true });

// fs.writeFileSync 를 이용하여 naver/daum/google/out.txt 만들어보세요

const content = "안녕하세요 홍길동입니다 \n반갑습니다";
fs.writeFileSync(`${dirname}+/out.txt`, content);