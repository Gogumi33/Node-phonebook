// Get all contacts
// Get /contacts
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// 하나의 컨트롤러 함수.
// npm i express-async-handler -> async핸들러 모듈 다운로드
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);


    res.send("Contacts Page");
    // async핸들러 사용 시 try-catch 안해도 댐.
});

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
const getContack = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.send(contact);
});

// 업데이트
const updateContack = asyncHandler(async (req, res) => {
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
    res.json(contact);
});

// 삭제
const deleteContack = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const contact = await Contact.findById(id);
    if(!contact){
        throw new Error("Contact not found");
    }

    await Contact.deleteOne();
    res.send("Deleted");
});


module.exports = { getAllContacts, createContact };