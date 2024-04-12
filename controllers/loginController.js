// 로그인과 관련된 함수들만 이곳에 작성한다.
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// .env파일에서 jwt키 가져와 jwtSecret 변수에 할당.
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
// JSON Web토큰 가져옴
const jwt = require("jsonwebtoken");

// Get login page [GET]
const getLogin = (req, res) => {
    res.render("home"); // home.ejs파일을 사용자에게 보여줌.
}

// 사용자가 로그인 하려고 함 - Login user [POST]
const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    // if(username == "admin" && password ==="1234") {
    //     res.send("로그인 성공!");
    // } else {
    //     res.send("로그인 실패...");
    // }

    // (중요) 사용자 이름을 이용하여 DB에서 이 값을 가진 유저 찾아옴.
    const user = await User.findOne({username});
    
    if(!user) {
        return res.json({ message: '일치하는 사용자가 없습니다.'});
    }

    // 비밀번호 매칭
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.json({ message: '비밀번호가 틀렸습니다.'});
    }

    // 비밀번호가 맞다면 토큰 발행 [id값을 토큰에 집어넣는다.]
    // 또한 내 서버에서 발급한 토큰인지 알 수 있도록 비밀키도 같이 넣어준다.
    const token = jwt.sign( {id: user._id}, jwtSecret );
    
    // 쿠키에 저장할 이름 / 정보 / http프로토콜로만 접속 하겠다.
    res.cookie("token", token, {httpOnly: true});
    res.redirect("/contacts"); // 로그인 완료 시 연락처목록 렌더.
})

// 페이지 등록 - Register page [GET]
const getRegister = (req, res) => {
    res.render("register"); // register.ejs 파일을 보여준다.
}
// 사용자 등록 - Register User [POST]
const registerUser = asyncHandler( async(req, res) => {
    const { username, password, password2 } = req.body;
    if(password === password2){
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create( { username, password:hashedPassword });
        res.json({ message: "Reginster successful", user });
    }
    else{
        res.send("Register Failed");
    }
})


module.exports = { getLogin, loginUser, getRegister, registerUser };