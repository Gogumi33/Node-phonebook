![alt text](<연락처 프로젝트.PNG>)

# Node.js 2-3주차 스터디
# Express framework

## HTTP 메소드
![](https://velog.velcdn.com/images/king33/post/6ca9f59e-30cb-4484-aa68-42cc17694f8b/image.png)

HTTP 메소드란? 클라이언트와 서버가 REST라는 규율을 지키면서 서로 소통하는 방식이다.
* GET : 서버에 있는 것 조회
* POST : 서버에 등록
* PUT : 서버에 있는 것 수정
* DELETE : 서버에 있는 것 삭제

참조 - https://velog.io/@yh20studio/CS-Http-Method-%EB%9E%80-GET-POST-PUT-DELETE

---

## HTTP 메소드들 다뤄보기
먼저, VS Code에서 `npm init`이후 루트노드에 app.js (서버)파일을 만들어준다.
```
// 서버 파일.
// 노드몬이란? 서버 켜고 수정이 가능하게 해주는 모듈.

const express = require("express");
const app = express(); // express에서는 createServer() 해줄 필요 X. 이렇게 실행만 해주면 됨.

app.get("/", (req, res) => { // 매우 간단함 - 요청방식 : 함수이름
    res.send('Hello, Node!');
})
app.get("/contacts", (req, res) => {
    res.send("Contacts Page");
})

// GET, POST, PUT, DELETE
app.post("/contacts", (req, res) => { // post는 'thunder client' 다운로드.
    res.send("Create Contacts!");
})

app.listen(3000, () => { // 3000번 포트에서 실행
    console.log("서버가 실행중입니다.");
})
```
이때 GET방식은 그냥 localhost로도 볼 수 있지만, POST방식은 간단히 확인하기 위해서 Thunder Client라는 VS Code 확장팩을 설치해준다.

![](https://velog.velcdn.com/images/king33/post/9c141612-69a6-4574-8a42-0c43c1433f1a/image.PNG)

위와 같은 확장팩 화면에서 POST로 변경 뒤 해당 주소를 입력하면 잘 실행되는 것을 확인할 수 있다.

---

## 라우트 파라미터
특정한 자료만 가져오고 싶을 때 라우팅 코드에서 요청 URL 맨 뒤에 ':'을 붙인 뒤 변수를 작성한다.
`/요청 URL/:id`

```
// 특정 연락처 1개만 가져오기
app.get("/contacts/:id", (req, res) => {
    res.send(`해당 연락처 : ${req.params.id}`);
});

// 특정 연락처 수정하기(PUT)
app.put("/contacts/:id", (req, res) => {
    res.send(`연락처 수정 : ${req.params.id}`)
})
// 특정 연락처 삭제하기(DELETE)
app.delete("/contacts/:id", (req, res) => {
    res.send(`연락처 삭제 : ${req.params.id}`)
})
```
⭐""따옴표가 아니라 `백틱`이어야 함에 유의.

---

## 미들웨어
요청과 응답 중간에서 필요한 기능 미리 처리해주는 함수, 모듈

### 라우터 미들웨어
Router 객체를 이용해서 라우트 코드를 읽기 쉽고, 관리하기도 쉽게 만들어주는 미들웨어이다.

```
const router = express.Router(); // 라우터 선언

router.route("/contacts/:id") // 라우터 미들웨어 이용ver.
    .get((req, res) => {
        res.send(`해당 연락처 : ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`연락처 수정 : ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`연락처 삭제 : ${req.params.id}`)
    });
    
app.use(router); // 미들웨어를 쓰려면 이걸 꼭 알려줘야함.
```

-> but, app.js는 앱 전체를 실행시켜주는 주요 파일이므로 위 코드들은 따로 모듈화해서 빼 주어야 한다.

---

## 라우트 파일 모듈화

1. 루트 폴더에 'routes'폴더 만들어주기
2. 그 안에 'contactRoutes.js'파일 만들고
```
router.route("/contacts") 
router.route("/contacts/:id")
```
얘네들 그대로 잘라내기 후 복사.

3. 이후 새로만든 라우트 파일에서도 express 써야하므로,
```
const express = require("express");
const router = express.Router();
```
그대로 맨 위에 적어서 가져와준 뒤

4. (중요) `module.exports = router; // 모듈 내보내기.` 로 만든 모듈을 내보내준다.
5. 마지막으로 app.js로 다시 돌아와서
`app.use("/", require("./routes/contactRoutes")); // 미들웨어 모듈 만들어둔거 가져오기`
로 가져와 주면 된다.

### +) 바디파서 미들웨어
서버로 요청을 보낼 때 요청 본문에 담긴 것을 파싱하는 미들웨어이다.
* 파싱이란? 요청시 전송 자료를 프로그램에서 사용할 수 있는 형식으로 변환해주는 작업을 의미한다.

---

# 데이터베이스
## MongoDB
![](https://velog.velcdn.com/images/king33/post/4a722e9d-f33a-4c31-b794-2a59fb42c7a0/image.PNG)

* 관계형 데이터베이스 : 자료구조를 표 형태로 관리, SQL언어 사용
* NoSQL 데이터베이스 : 'SQL언어를 사용하지 않는' 데이터베이스이다. 문서 형태(JSON)로 자료를 저장하고, 자료 다루기도 쉬우며 JS만으로도 DB 언어가 해결된다.
+) 서버에 db만들수도 있고 / 클라우드에서 사용하는 방식도 가능하다.

## MongoDB - Node.js 연동
1. 몽고디비 홈페이지에서 회원가입을 완료하고, 자신의 IP에 따른 DB를 하나 생성해준다.
2. VS Code 확장에서 'MongoDB for VS Code'를 다운받은 뒤, 만들어둔 DB에서의 connection창에서 3. Add your connection string into your application code 밑의 코드를 그대로 복사하여 확장프로그램 연결하기에 붙여넣기 해 준다.
3. 연결 완료 시 오른쪽 하단 성공 메세지와 함께, 잎사귀에도 초록색 빛이 들어온다.

---

## 환경변수
app.js에게 몽고디비를 어떻게 연결할 지 알려주는 것(.env파일)

루트 폴더에 '.env'파일을 만들어주고, 여기에 환경변수값을 미리 저장해둔다.
```
// 환경변수 저장 파일.
// connection string값

DB_CONNECT = 몽고디비 홈페이지에서 복사.
```
DB_CONNECT의 string값은 홈페이지 'MongoDB for VS Code' -> 3. Connect to your MongoDB deployment 부분에서 그대로 복사하면 된다.

#### +) 추가 모듈설치 - for편리함
`npm i mongoose dotenv`
DB 연결하는 dbConnect.js 작성하려면 설치해라..😛

---

## 최종 연결작업
루트 공간에 'config'폴더 생성 후 'dbConnect.js'파일을 만든다.
```
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
```
-> 이렇게 하면 최종 연결이 모두 완료된다.

---

# 스키마와 모델
### 유저컬렉션 <- 도큐먼트 <- 스키마
* 스키마? 앱에서 사용할 자료의 구조, 형태 정하기

## 스키마의 새로운 객체 만들기
'models'폴더 생성 후 'contactModel.js'파일에
```
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
```



# 데이터베이스
## MongoDB 파헤치기

![](https://velog.velcdn.com/images/king33/post/1602b6e5-d9f9-4a74-ae81-0736273322a1/image.png)

## API와 어플리케이션
API란?
시스템 또는 어플리케이션 간에 서로 자료를 주고받으면서 특정 기능을 수행하는 것을 말한다. 프론트엔드의 꽃.
ex) 카카오톡 지도API, 음성인식API, 날씨API 등

## RESTful API
말 그대로 REST규율을 잘 지키는 API이다.

* CRUD
C - Create [POST]
R - Read [GET]
U - Update [PUT]
D - Delete [DELETE]

-> 자세한 건 이전 포스트에 정리해 둠.

## MVC 패턴
MVC 패턴이란 수천, 수만줄의 코드를 효율적으로 구성하기 위해 기능/역할에 따라 여러 파일(모듈)로 나눈 뒤 모두 연결해서 사용한다.
M(model), V(view), C(controller)

---

## 그렇다면 이 컨트롤러란?
라우트 코드를 처리하는 부분으로, 원래 있던 코드를 이 컨트롤러를 이용해 여러 파일로 나눠주면 코드들이 훨씬 더 간결해진다.

<원래 코드>
```
// 연락처 가져오기
router.route("/") 
    .get((req, res) => {
        res.send("Contacts Page");
    })
    .post((req, res) => { // post는 'thunder client' 다운로드.
        console.log(req.body);
        res.send("Create Contacts!");
    });
```

---

<컨트롤러 적용 후>
```
router.route("/") 
    .get(getAllContacts) // 미리 정의해 둔 getAllContacts 함수 가져와 씀.
    .post(createContact);
    // -> 컨트롤러로 만들 시 훨씬 더 간결해진다.
```
<따로 빼 놓은 contactController.js 컨트롤러 함수>
```
// Get all contacts
// Get /contacts
const asyncHandler = require("express-async-handler");

// 하나의 컨트롤러 함수.
// npm i express-async-handler -> async핸들러 모듈 다운로드
const getAllContacts = asyncHandler(async (req, res) => {
    res.send("Contacts Page");
    // async핸들러 사용 시 try-catch 안해도 댐.
});

// Create contact - 연락처만들기
const createContact = asyncHandler((async (req, res) => {
    console.log(req.body);

    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        return res.send("필수 값이 입력되지 않았습니다.");
    }

    res.send("Create Contacts!");
}))

module.exports = { getAllContacts, createContact };
```

---

## DB에 직접 추가하는 CRUD코드

### DB명령어
* create 함수 - db에 새로운 도큐먼트 생성.
`Contact.create({객체})`
* find 함수 - 조건에 맞는 도큐먼트 찾기. 조건지정 x시, 모든 도큐먼트를 찾는다.
 findOne 함수 - 조건맞는게 여러 개일 경우 첫 번째만 반환.
* updateOne / updateMany - 조건에 맞는 도큐먼트 찾아 내용을 업데이트 해준다.
* deleteOne / deleteMany - 해당조건 도큐먼트만 삭제.
* findById - 아이디 값 기준 찾기
`Contact.findById('1')`
* findByIdAndUpdate / findByIdAndDelete - 위 findById에서 추가기능 수행.

## 위 명령어를 이용한 모든 연락처 컨트롤러 함수들 만들기 📞
```
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
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.send(contact);
});

// 연락처 업데이트
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
    res.json(contact);
});

// 연락처 삭제
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const contact = await Contact.findById(id);
    if(!contact){
        throw new Error("Contact not found");
    }

    await Contact.deleteOne();
    res.send("Deleted");
});


module.exports = { getAllContacts, createContact };
```


# WEB 애플리케이션

## 템플릿 엔진 - EJS
템플릿 엔진이란? 동적인 컨텐츠를 보여주기 위해 DB에서 가져온 데이터를 템플릿 파일에 연결해주는 역할을 한다. (=뷰 엔진)

![](https://velog.velcdn.com/images/king33/post/17debfbd-310c-4b89-97dd-a728261c129e/image.PNG)


## EJS 엔진 사용하기
1. 터미널 창 열고 `npm i ejs` 로 엔진 다운로드.
2. app.js와서 이 설치한 EJS를 사용하겠다고 알려줘야 한다.
```
app.set("view engine", "ejs"); // ejs 엔진을 사용하겠다.
app.set("views", "./views");
```
3. 이제 views에서 ejs파일을 만들어 사용한다고 위 코드에 명시해 놨으므로, 루트폴더에서 views폴더를 만든 뒤 'getAll.ejs'파일을 넣어준다.
이후, assets의 getAll.html의 내용을 그대로 복사하여 붙여넣기 해 준다.
```
// getAll.ejs 파일

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Get All Contacts</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>
    * {
      margin:0;
      padding:0;
    }
    body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    h1 {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 3em;
      margin-bottom: 20px;
    }
    h1 i {
      margin-right: 0.8em;
    }
    h2 {
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <h1><i class="fa-solid fa-address-card"></i>Contacts Page</h1>
</body>
</html>
```
4. 이제 사용하고자 하는 부분에 위 파일을 가져와 쓰기만 하면 된다.
contactController.js의 getAllContact() 함수 안에 `res.render("getAll");` 라고 써주면 로컬호스트를 켰을 때 해당 템플릿이 보여진다.
-> .ejs는 빼고 적어도 상관 없다.

---

## EJS 엔진 기본문법
템플릿 파일에서 동적인 컨텐츠 처리하기.

>* <%= 변수 %>
* <% 자바스크립트 코드 %> - 단 코드 한줄한줄 다 이거 넣어줘야함
* <%- HTML 코드 %>

## 사용예시
내가 미리 선언해둔 정보를 템플릿에 그대로 보내 표시하고 싶다면?
```
const users = [
        {name: "Kim", email: "kimkim@aa", phone: "123"},
        {name: "Lee", email: "leelee@bb", phone: "456"},
    ];
    
res.render("getAll", {users: users});
```
"getAll" 옆에 매개변수로 객체배열을 넘겨주기만 하면 된다.

그리고 다시 getAll.ejs파일로 돌아와서 body태그에
```
<body>
  <h1><i class="fa-solid fa-address-card"></i>Contacts Page</h1>
  <h2>Users</h2>
  <ul>
    <% users.forEach(user => { %>
        <li> <%= user.name %> </li>
        <li> <%= user.email %> </li>
        <li> <%= user.phone %> </li>
        -------
    <% }); %>
  </ul>

</body>
```
EJS 엔진 기본문법을 이용하여 위와 같이 적어주면, 템플릿에 내가 미리 정의해 둔 객체배열이 잘 나타나는 것을 확인할 수 있다.

<결과화면>
![](https://velog.velcdn.com/images/king33/post/875382fe-e40f-4c6f-9bae-542aa5dc1dc7/image.PNG)

## +) 정적인 파일들?
웹에서 사용하는 css, JS, 이미지 파일 등 정적인 친구들은 별도의 폴더에 싹 다 모아놓고 사용하자.

🌳 루트폴더에 public이라는 폴더 생성 후 위 파일들 다 이동시키기.
이후 다시 app.js에 와서 사용한다고 선언
```
app.use(express.static("./public")); // 정적인 파일들은 따로 지정.
// 그럼 자동으로 이 파일들 뒤져서 꺼내가게 된다.
```

---

## EJS 파일
EJS는 앞서 템플릿이라고 소개를 했지만, 사실상 유저 화면에 보여지는 프론트엔드 파일이라고 이해하면 좋다.
![](https://velog.velcdn.com/images/king33/post/7b88a8bf-fa2f-4f3e-b03f-b22c7edee651/image.PNG)

## 🌟 최종작업 그림
![](https://velog.velcdn.com/images/king33/post/d1d34751-f7cc-4328-8d73-565dfc674059/image.PNG)

이제 위 (index, getAll, add, update).ejs 파일들을 미리 만들어둔 asset의 html파일들을 복사하여 그대로 똑같이 작성해준다.

But, getAll.ejs 파일을 제외한 3개의 파일의 헤더 부분이 모두 똑같으므로 이는 모듈로 따로 빼 주어 코드의 간결성을 높인다.
-> views폴더 안에 다시 include폴더를 만들고 여기에 `_header.ejs` 파일을 만들어준다.
**(모듈의 헤더라는 것을 나타내기 위해 앞에 `_`을 붙인다.)**

---

## EJS 폼을 통해 연락처를 추가해보자
![](https://velog.velcdn.com/images/king33/post/425ddeec-08ef-4e36-85d8-46a1aba64574/image.PNG)

우선, add.ejs파일과 index.ejs파일에 위 사진처럼 버튼을 누르면 각각 해당 페이지로 이동할 수 있도록 `<a>`태그의 href에 `/contacts`와 `/contacts/add`를 각각 넣어준다.

### ⭐중요 - 라우트 코드수정
라우트 코드에서 지금까지는 POST 명령어가 contacts(/) 경로일때만 발생되도록 하는 로직이었지만, 위 그림에서는 add경로에서 요청했을 때 POST가 발생한다.

-> 따라서 contactsRoutes.js 파일에서 route("/") 부분에 있던 post(createContacts)를 route("/add")밑으로 옮겨준다.
```
router.route("/") 
    .get(getAllContacts);
    
router.route("/add")
    .get(addContactForm)
    .post(createContact);

router.route("/:id")
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);
```

## 폼 태그의 'action' 역할
form태그에서 처리해야 될 함수 프로그램을 연결하고 싶을 땐 'action'이라는 속성을 사용하자.
```
<!-- 이 폼에 있는 내용을 POST 요청 방식으로 보낼 건데,
이를 처리하는 경로는 /contacts/add 이다. -->
  <form action="/contacts/add" method="POST" id="add-user">
```

이렇게까지 모든 작성을 마쳤다면, MongoDB에 연락처 추가가 제대로 이루어지는 것을 확인할 수 있다.


# 데이터베이스와 소통

## 📖연락처 수정하기
![](https://velog.velcdn.com/images/king33/post/2ec37c48-9980-4d9f-935d-859976cfed3f/image.PNG)

우선, 개인적인 연락처를 수정할 것이므로 contactController.js에서 개인 id값을 다루는 함수인 getContact로 이동하여 update.ejs파일을 렌더시켜주자.
```
// Get /contacts/:id
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); // 특정 id를 받아왔을 때 그 id것만 가져옴.
    // res.send가 아니라 res.render를 이용해서 ejs파일을 랜더시켜준다.
    res.render("update", {contact: contact});
});
```

이제 update.ejs파일에서는 각 id에 따라서 동적으로 값을 보여주어야 하므로 value부분을 수정해준다.
```
<div class="col-12">
            <label for="name" class="col-form-label">이름(Full Name)</label>
            <div>
              <input type="text" class="form-control" name="name" id="name" value="<%= contact.name %>">
            </div>
          </div>
          <div class="col-12">
            <label for="email" class="col-form-label">메일 주소(E-mail)</label>
            <div>
              <input type="text" class="form-control" name="email" id="email" value="<%= contact.email %>">
            </div>
          </div>
          <div class="col-12">
            <label for="phone" class="col-form-label">전화번호(Mobile)</label>
            <div>
              <input type="text" class="form-control" name="phone" id="phone" value="<%= contact.phone %>">
            </div>
          </div>
```

마지막으로 수정 아이콘에 각 id에 따른 수정창을 보여줄 수 있도록 href부분에 id값을 넣어준다.
```
<a href="/contacts/<%= contact._id %>" class="btn update" title="수정">
<i class="fas fa-pencil-alt"></i>
<!-- MongoDB 에서는 id앞에 밑줄을 표시하여 _id로 나타낸다. -->
```

---

## 폼에서의 PUT, DELETE
폼 태그에서는 POST와 GET만 가능하다. 따라서 PUT이나 DELETE를 해주기 위해서는 Ajax라는 기법을 사용해주거나, `method-override`라는 모듈을 설치한다. (더 간단)

## method-override 모듈
1. npm i method-override 패키지 설치
2. app.js에 이걸 쓴다고 말해주기
```
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
```
### (주의) ⭐ app.use()는 반드시 dbConnect(); 이전에 써주어야 한다.

3. 이제 update.ejs로 가서 form태그에 action 속성을 추가한다.
`<form action="/contacts/<%= contact._id %>?_method=PUT" method="POST" id="add-user">`

_**-> 이 경로를 PUT으로 받아야만 서버에서 수정해 줄 수 있으므로 현재있는 POST를 일단 덮어씌워주기 위해 뒤에`?_method=PUT`로써 붙여주는 것이다.**_

4. 마지막으로 연락처가 수정 후 json 쿼리를 보여주는 것이 아니라 다시 원래 연락처 페이지로 올 수 있도록 컨트롤러에 가서 updateContact의 마지막 부분을 redirect()를 이용하여 고쳐준다.
```
res.redirect("/contacts"); // 강제로 페이지 고침.
```

---

## 📖연락처 삭제하기
위와 마찬가지로 컨트롤러에 가서 deleteContact함수를 빠르게 수정해보자.
```
// 삭제
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await Contact.findByIdAndDelete(id); // 단 한번에 삭제까지 수행.
    res.redirect("/contacts"); // 강제로 페이지 고침.
});
```
-> 여기에서는 `findByIdAndDelete(id)`로 단 한번에 삭제까지 이루어 지는것이 매력적이다.

이제 다시 index.ejs로 넘어와서 삭제 버튼을 수정한다.
```
<!-- 폼 안에있는 X값을 클릭했을 때 그 정보를 서버로 넘겨주는 코드 -->
<form action="/contacts/<%= contact._id %>?_method=DELETE" method="POST">
	<input type="submit" class="btn delete" title="삭제" value="X">
</form>
```

---

# 로그인 기능 구현
## 관리자 계정 DB에 추가
드디어 백엔드의 꽃인 '로그인 기능'에 대해 배워본다.

우선, home.ejs파일을 만들고, 아래의 코드를 추가한다.
```
<%- include("./include/_header") %>

  <!-- Main -->
  <main id="site-main">

    <div class="home-container">
      <h3>로그인</h3>     
      <p>로그인이 필요한 서비스입니다.</p>

      <form class="login" method="POST" action="/">
        <label for="username"><b>Username</b></label>
        <input type="text" placeholder="사용자 아이디" name="username" id="username">
        <label for="password"><b>Password</b></label>
        <input type="password" placeholder="비밀번호" name="password" id="password">
      
        <button type="submit">로그인</button>
      </form>
    </div>
  </main>
  <!-- /Main -->

<%- include("./include/_footer") %>
```

그 다음 로그인에만 관련된 라우트 코드를 따로 작성한다.
* 컨트롤러 - loginController.js
* 라우터 - loginRoutes.js

<컨트롤러 코드>
```
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

// 페이지 등록 - Register page [GET]
const getRegister = (req, res) => {
    res.render("register");
}

module.exports = { getLogin, loginUser, getRegister };
```

<라우터 코드>
```
// 로그인에 관련된 라우트들만 작성.
const express = require("express");
const router = express.Router();
const { getLogin, loginUser, getRegister } = require("../controllers/loginController");

router.route("/")
    .get(getLogin)  // '/'(루트)로 GET 요청이 왔을 때 getLogin함수를 실행해라.
    .post(loginUser); // post방식일 때는 loginUser함수를 실행해라.

router.route("/register")
    .get(getRegister);

module.exports = router;
```

이후 다시 app.js로 가서 `app.use("/", require("./routes/loginRoutes"));` 코드를 추가해준다.

### 여기까지 했으면 기본적인 세팅은 완료되었다.

이제 폼 화면에서 아이디와 비번을 입력하면 서버로 보내주어야 하므로 `POST` 방식을 사용하여야 한다.

home.ejs 폼 양식에
```
<form class="login" method="POST" action="/">
```
를 적용시켜준다.

-> 여기까지에서 알 수 있는 <span style="color:red">기본 로직</span> 은
> 1. ejs 파일을 생성하였다면
2. 컨트롤러를 이용하여 관련 함수들을 작성하고,
3. 라우트 경로에 따른 상황에서 RESTful중 어떤 요청이 왔을 때 무슨 함수를 실행할 것인지 정해준 다음
4. app.js로 와서 app.use()를 통해 이 라우터를 사용하겠다고 알려주면 끝이 난다.

---

## DB에 특정 회원정보 저장
우선, 회원가입 기능을 만들고 이 폼에서 작성된 정보를 MongoDB에 저장하는 것을 먼저 구현해보자.

위에서 정리한 <span style="color:red">기본 로직</span> 을 이용해서 똑같이 register.ejs부터 시작한다.
```
<%- include("./include/_header") %>

  <!-- Main : 아이디와 비번 / 비번확인 -->
  <!-- 이 .ejs파일을 만들었다면 이 파일을 언제 렌더링 할 것인지 컨트롤러 함수 만들어야 함 -->
  <!-- 이후 register경로로 GET요청이 들어왔을 때 ejs파일을 실행할 컨트롤러가 만들어진 것이고, -->
  <!-- 위 getRegister함수를 실행하려면 라우트 코드를 작성해주어야 한다. -->
  <main id="site-main">

    <h3>사용자 등록</h3>

    <form class="register">
      <label for="username"><b>아이디</b></label>
      <input type="text" placeholder="아이디" name="username" id="username">
      <label for="password"><b>비밀번호</b></label>
      <input type="password" placeholder="비밀번호" name="password" id="password">
      <label for="password2"><b>비밀번호 확인</b></label>
      <input type="password" placeholder="비밀번호 확인" name="password2" id="password2">
      <input type="submit" value="등록" class="register-btn">
    </form>    
  </main>
  <!-- /Main -->

<%- include("./include/_footer") %>
```

### 이번에는 이 사용자 정보를 저장할 DB 스키마를 정의해주자.

db와 관련된 파일은 'models'폴더에 있음. 여기에 스키마 지정 코드인 userModel.js를 만든다.
```
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
module.exports = mongoose.model("User", UserSchema);
```

---

이번에는 비밀번호와 비밀번호 확인 부분이 같은지를 비교하는 기능을 구현해보자.

## 틈새개념 - 🔐암호화
우리는 DB에 저장되는 비밀번호를 그대로 저장시킨다면 심각한 위험성을 가지게 되므로 '암호화'라는 개념을 적용시켜서 다른 문자로 변환 뒤에 저장시켜야 한다.

(인턴할 때 Airtable 데이터베이스에 이를 적용시켜 저장시켜야 하는데 AES256을 API를 통해 혼자 낑낑 적용시키느라 고생했던 기억이 떠오른다...)

여기 Node.js에서는 그냥 모듈만 다운로드하면 끝나나보다..

### bcrypt 모듈
해시 함수를 이용해서 다른 문자열로 변환시켜주는 모듈이다.
![](https://velog.velcdn.com/images/king33/post/3936df7b-3086-437d-9c78-54f53803d648/image.PNG)

그래서 비밀번호와 비밀번호 확인을 둘 다 동시에 해시 함수에 넣는다면 변환된 값도 서로 같기 때문에 이 둘을 비교해줌으로써 확인 기능이 완성되는 것이다.
![](https://velog.velcdn.com/images/king33/post/bf102112-59b6-4202-8673-0f23a5562b44/image.PNG)

### bcrypt 모듈 적용하는법
1. `npm i bcrypt`로 모듈설치
2. 앞서 만들어둔 스키마와 방금 설치한 비크립트 모듈을 가져와준다.
```
const User = require("../models/userModel.js");
const bycrypt = require("bcrypt");
```
3. 컨트롤러로 돌아와 registerUser() 함수를 작성한다.
```
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
```

여기까지 잘 작성한다면 회원가입이 잘 이루어지는 것을 확인할 수 있다.
![](https://velog.velcdn.com/images/king33/post/bae854ec-42c2-48a4-a9a1-1245af0235be/image.PNG)
-> 	<span style="color:green">비밀번호는 해쉬함수로 잘 암호화되어 나온다.</span>

---

## 로그인 - 사용자 인증
이제 사용자가 로그인을 하려고 폼에 아이디와 비밀번호를 입력하면 이 정보를 받아와서 데이터베이스를 확인하고, 정보가 존재하면 로그인O / 정보가 없다면 로그인X 를 해주는 로직이다.

## JWT : JSON Web Token

여기서 잠깐, 세션과 토큰이란?
* 세션 = 서버에 저장되어 있으면서 클라이언트에 있는 세션 ID와 비교
* 토큰 = 인증할 떄 필요한 모든 정보가 포함되어 있으면서 특정 서버에 따로 저장하지 않는다. (서버간 공유 가능)

+) 쿠키 = 웹에 사용자가 접속 시, 사이트에서 사용자 컴으로 보내는 조그마한 텍스트 조각이다. 여기에는 언제 접속했는지, 어느위치에서 몇 번 접속했는지 등 이러한 정보들이 들어있다.

### 대략적인 과정
>로그인 버튼을 눌러 서버로 요청을 하면 서버에서는 사용자 확인을 진행한다. DB에 있는 사용자라면 이 '토큰'을 발급해주는데, '토큰'은 우리 데이터베이스에 있는 사람이다 라는 것을 증명해주는 존재이다. 이는 브라우저(클라이언트)에 쿠키 라는 형태로 저장되는데 클라이언트는 이걸 사용자인증이 필요한 요청을 보낼 때 마다 같이 첨부하여 보낸다.

![](https://velog.velcdn.com/images/king33/post/356b6efa-50f1-419a-80ff-f947380439aa/image.PNG)

## JWT 환경 구축하기
우선 JWT 모듈과, 토큰을 읽을 수 있는 cookie-parser 라는 모듈도 같이 설치해 주어야 한다.
```
npm i cookie-parser jsonwebtoken
```

그 다음은 .env 파일에 JWT 키를 아무 값으로 설정해둔다.
```
// JWT 토큰 인증키 - 값은 어떤 값이어도 상관 없다.
JWT_SECRET = aaaaa;
```

loginController.js 파일로 돌아와서 아래와 같이 선언작업을 해준다.
```
// .env파일에서 jwt키 가져와 jwtSecret 변수에 할당.
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
// JSON Web토큰 가져옴
const jwt = require("jsonwebtoken");
```

### ⭐중요 - DB에서 값 찾기
위에서 선언을 모두 마쳤다면, loginUser() 함수로 내려와 아래와 같은 코드를 적어준다.
```
// (중요) 사용자 이름을 이용하여 DB에서 이 값을 가진 유저 찾아옴.
const user = await User.findOne({username});
    
if(!user) {
    return res.json({ message: '일치하는 사용자가 없습니다.'});
}
```
**_-> findOne() 이라는 함수를 잘 기억해두자._**

## 비밀번호 매칭 및 토큰발급
```
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
```

이후, 로컬호스트로 들어가 로그인 페이지에서 맨 처음 저장해두었던 아이디와 비밀번호를 치고 들어가면 정상적으로 연락처 목록이 화면에 렌더되는 것을 확인할 수 있다.

![](https://velog.velcdn.com/images/king33/post/4724f6cf-ada0-4146-abed-12071551d791/image.PNG)

렌더된 페이지에서 '개발자도구' 를 열고 들어가보면, 쿠키 탭에 token이라는 토큰이 잘 들어와 있는 것도 확인할 수 있다.

### The End.