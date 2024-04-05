// 서버 파일. - APP전체를 실행시키는 중요 파일이다.
// 노드몬이란? 서버 켜고 수정이 가능하게 해주는 모듈.

const express = require("express");
const dbConnect = require("./config/dbConnect");

const app = express(); // express에서는 createServer() 해줄 필요 X. 이렇게 실행만 해주면 됨.

dbConnect();

app.get("/", (req, res) => { // 매우 간단함 - 요청방식 : 함수이름
    res.send('Hello, Node!');
});

// 파싱을 위한 미들웨어 등록 (바디파서)
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// 루트를 미리 /contacts로 설정
app.use("/contacts", require("./routes/contactRoutes")); // 미들웨어 모듈 만들어둔거 가져오기


// @@@@@
app.listen(3000, () => { // 3000번 포트에서 실행
    console.log("서버가 실행중입니다.");
})

