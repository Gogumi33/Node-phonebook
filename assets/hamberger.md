# 반응형 웹
이젠 모든 프로젝트가 반응형으로 안 하면 의미가 없을 정도로 기본화가 되었음.
이에 반응형에서 알아두면 좋은 '**햄버거메뉴**'를 만드는 법에 대해 알아보자.


<원래 기본 웹 페이지>
![](https://velog.velcdn.com/images/king33/post/0217822d-1706-437a-9951-2df8fa7d6052/image.PNG)


<반응형으로 볼 시 페이지>
![](https://velog.velcdn.com/images/king33/post/50fe0622-fe2b-4bee-88a2-2eb81bd502ca/image.PNG)
-> 반응형으로 볼 때엔 위에 있던 분야들이 사라지고, ㅡ모양이 3개 있는 햄버거 메뉴로 나오는 것을 확인할 수 있다.

저 버튼을 누르게 되면,

![](https://velog.velcdn.com/images/king33/post/e60ce525-adc5-42b5-9219-09e45e846cdf/image.PNG)
숨겨졌던 분야 메뉴들이 왼쪽에 터치하기 편하도록 잘 나오는 것을 확인할 수 있다.

이를 만드는 방법을 한번 파헤쳐보자.

---

1. 우선 html의 <body>태그 안에 제일먼저 저 사이드바에 보일 내용들을 먼저 잘 넣어준다.
```
    <!-- 햄버거 사이드바 내용들 -->
    <div class="side-menu" id="mySidenav">
      <button class="closebtn" onclick="closeNav()">&times;</button>
      <!-- %times는 x(닫기)아이콘 -->
      <div class="side-menu-list" id="menu-list">
        <button>General</button>
        <button>Sports</button>
        <button>Technology</button>
        <button>Business</button>
        <button>Entertainment</button>
        <button>Health</button>
        <button>Science</button>
      </div>
    </div>
```

2. 그 후에 반응형 시에 보이게 될 햄버거메뉴도 미리 돋보기 아이콘 옆에 넣어둔다.
  (필자는 아이콘을 간단히 부트스트랩을 이용하였다.)
```
<!-- 햄버거 & 검색창 -->
        <div>
          <i class="fas fa-bars hide icon-button" onclick="openNav()"></i>
          <!-- 햄버거! hide는 css속성 -->
          <i class="fas fa-search icon-button" onclick="openSearchBox()"></i>
          <span id="input-area" style="display: none;">
              <input type="text" id="search-input" placeholder="search">
              <button class="search-button" onclick="searchNews()">Go</button>
          </span>
        </div>
```
  
3. 이제 미디어쿼리로 조건을 주어 반응형 크기로 줄어들었을 때 컴포넌트들이 변화를 할 수 있도록 설정해주어야 한다. 미디어쿼리에 대해 간단히 알아보자.
  

# 미디어쿼리
미디어 쿼리란? 화면 해상도, 기기 방향 등의 조건으로 HTML에 적용하는 스타일을 전환할 수 있는 CSS3의 속성 중 하나이다. 반응형 웹 디자인에서는 미디어 쿼리를 사용해 적용하는 스타일을 기기마다(화면 크기마다) 전환할 수 있다.
  
즉, css에 조건문을 줄 수 있는 편리한 기능이다.
  
## 이제 CSS로 넘어와보자.
  
4. 우선 .hide 속성을 미리 만들어두어 기본 웹 화면일 때는 보이지 않을 햄버거 모양에 적용해보자.
```
    .hide {
    	display: none;
    }
```
  
5. 이후 이 hide 속성은 아까 미리 넣어둔 `<i class="fas fa-bars hide icon-button" onclick="openNav()"></i>` 햄버거메뉴에 hide를 넣어주어 안 보이게 만든다.
  
6. (중요) 이제 미디어쿼리를 드디어 적용시켜보면,
```
  @media screen and (max-width: 63rem) {
  /* 제일중요!! - 반응형 시 일정크기로 줄어들면 탭들이 햄버거로 변하도록 */
    .hide {
      display: inline;
    }
    .menus {
      display: none;
    }
    .logo {
      width: 200px;
      margin-bottom: 10px;
    }
  }
```
-> 위 코드를 분석해보면, 웹 사이트의 너비가 일정수준 줄어들었을 때 .hide였던 속성은 다시 사용자에게 보여지게 하고, 위 분야메뉴들은 사라지게 한다. 그리고 추가로 너무 크게 보였던 뉴스 로고는 더 작게 만들어서 사용자가 보기 편하게 하는 코드이다.
  
(이후 사이드 메뉴들의 자세한 css내용들은 생략한다.)
  
--- 
 
### 이렇게 미디어 쿼리를 이용한다면 css에서도 조건문을 자유롭게 이용할 수 있다는 것을 알아보았다.
### 결론은 이제 모든 프로젝트에 _반응형_을 잘 신경써서 공부하자!