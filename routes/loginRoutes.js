// 로그인에 관련된 라우트들만 작성.
const express = require("express");
const router = express.Router();
const { getLogin, loginUser } = require("../controllers/loginController");

router.route("/")
    .get(getLogin)  // '/'(루트)로 GET 요청이 왔을 때 getLogin함수를 실행해라.
    .post(loginUser); // post방식일 때는 loginUser함수를 실행해라.

module.exports = router;