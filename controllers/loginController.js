// 로그인과 관련된 함수들만 이곳에 작성한다.
const asyncHandler = require("express-async-handler");

// Get login page [GET]
const getLogin = (req, res) => {
    res.render("home"); // home.ejs파일을 사용자에게 보여줌.
}

// 사용자가 로그인 하려고 함 - Login user [POST]
const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    if(username == "admin" && password ==="1234") {
        res.send("로그인 성공!");
    } else {
        res.send("로그인 실패...");
    }
})

module.exports = { getLogin, loginUser };