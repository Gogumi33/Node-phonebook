const express = require("express");
const router = express.Router();


// 연락처 가져오기
router.route("/") 
    .get((req, res) => {
        res.send("Contacts Page");
    })
    .post((req, res) => { // post는 'thunder client' 다운로드.
        console.log(req.body);
        res.send("Create Contacts!");
    });
    

router.route("/:id") // 라우터 미들웨어 이용ver.
    .get((req, res) => {
        res.send(`해당 연락처 : ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`연락처 수정 : ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`연락처 삭제 : ${req.params.id}`)
    });

// app.get("/contacts", (req, res) => {
//     res.send("Contacts Page");
// });
// // 새 연락처 추가
// app.post("/contacts", (req, res) => { // post는 'thunder client' 다운로드.
//     res.send("Create Contacts!");
// });



// // 특정 연락처 1개만 가져오기
// app.get("/contacts/:id", (req, res) => {
//     res.send(`해당 연락처 : ${req.params.id}`);
// });

// // GET, POST, PUT, DELETE

// // 연락처 수정하기(PUT)
// app.put("/contacts/:id", (req, res) => {
//     res.send(`연락처 수정 : ${req.params.id}`)
// })
// // 연락처 삭제하기(DELETE)
// app.delete("/contacts/:id", (req, res) => {
//     res.send(`연락처 삭제 : ${req.params.id}`)
// })

module.exports = router; // 모듈 내보내기.