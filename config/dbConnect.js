// MongoDB와 연결
const mongoose = require("mongoose");
require("dotenv").config(); // 먼저 실행.

// db에 접속해서 그 안에 있는 내용으로 무언가 하기 위해서는 "비동기처리" 필수.
const dbConnect = async () => {
    try{
        const connect = await mongoose.connect(process.env.DB_CONNECT); // 시간 걸리는 부분
        console.log("DB Connected");
    } catch (err){
        console.log(err);
    }
}

module.exports = dbConnect;