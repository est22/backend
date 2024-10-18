const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, "access_secret", (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next(); // 다음 번 미들웨어로 제어가 넘어간다. 다음번 미들웨어가 없으면 이 미들웨어를 장착한 라우터 실행
  });
};

module.exports = {
  authenticateToken,
};
