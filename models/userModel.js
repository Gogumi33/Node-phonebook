const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// 모델명은 단수로 지정하고 시작 글자는 대문자.
// 데이터베이스에는 user로 들어감.
module.exports = mongoose.model("User", UserSchema);