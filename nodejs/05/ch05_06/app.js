const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`${PORT}에서 웹서버 실행중...`);
})