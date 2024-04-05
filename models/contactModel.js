// 스키마 구조 만들기.
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "전화번호는 반드시 기입해주세요."]
    }
},{
    timestamps: true // 자료 변경 시 자동으로 그 시각 기록.(createdAt, updatedAt)
})

// 이후 이 스키마를 모델로 변환시켜줘야한다.
// with mongoose.model(모델명, 스키마명);
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;