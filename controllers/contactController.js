// Get all contacts
// Get /contacts
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// 하나의 컨트롤러 함수.
// npm i express-async-handler -> async핸들러 모듈 다운로드
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find(); // 🔥🔥🔥 데이터베이스에서 가져온 모든 data 저장. - Contact.find

    res.render("index", {contacts: contacts}); // 🔥🔥🔥 위 db에서 받아온 것을 index.ejs에 고대로 넘겨줌.

    // res.send("Contacts Page");
    // async핸들러 사용 시 try-catch 안해도 댐.
});


// @@@@@
// view and Contact form
const addContactForm = (req, res) => {
    res.render("add"); // add.ejs 파일 보여주기.
}


// Create contact - 연락처만들기
const createContact = asyncHandler((async (req, res) => {
    console.log(req.body, "@@");

    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        return res.send("필수 값이 입력되지 않았습니다.");
    }

    // 몽고디비의 Contact라는 모델에 name, email, phone이 저장된다.
    const contact = await Contact.create({
        name, email, phone
    });


    res.send("Create Contacts!");
}))

// Get contact
// Get /contacts/:id
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); // 특정 id를 받아왔을 때 그 id것만 가져옴.
    // res.send가 아니라 res.render를 이용해서 ejs파일을 랜더시켜준다.
    res.render("update", {contact: contact});
});

// 업데이트
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const {name, email, phone} = req.body;
    const contact = await Contact.findById(id);
    if(!contact){
        throw new Error("Contact not found");
    }

    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    contact.save(); // 데이터 저장.
    res.redirect("/contacts"); // 강제로 페이지 고침.
});

// 삭제
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await Contact.findByIdAndDelete(id); // 단 한번에 삭제까지 수행.
    res.redirect("/contacts"); // 강제로 페이지 고침.
});


module.exports = { getAllContacts, createContact, getContact, updateContact, deleteContact, addContactForm };