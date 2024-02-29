# where we meet?
- 우리 어디서 만날까? : https://where-we-meet.vercel.app/
  
# 1. 팀 및 프로젝트 소개
## 1-1. 팀 소개
<img width="890" alt="스크린샷 2024-02-29 오후 4 07 29" src="https://github.com/ketchup0211/where-we-meet/assets/69431340/00963462-3bca-4c07-8f5d-ddd20a8a0cd4">

안녕하세요, 저희는 **개발자 모드** 팀입니다. 4인 개발 팀이며 전원 메인으로 FE 포지션을 맡고 있습니다.<br/>
<small>프로젝트 기간 동안 하고 싶었던 기능들을 마음껏 구현해보며 새로운 도전을 많이 해보자 라는 취지에서 ‘개발자 모드’ 라는 작명을 하게 되었습니다. </small>
## 1-2. 프로젝트 소개
### 1-2-1. 프로젝트 주제 선정 계기 : where we meet
<img width="890" alt="스크린샷 2024-02-29 오후 4 08 35" src="https://github.com/ketchup0211/where-we-meet/assets/69431340/01dfff2d-2241-4931-b40d-91ec87c8796f">

이번 프로젝트 명은 "where we meet" 입니다. <br/>
기존 [when2meet](https://www.when2meet.com/) 이라는 웹 사이트를 유용하게 사용하던 팀원(이참)이 제시한 아이디어로, 약속 시간 외에도 장소를 정할 때 when2meet과 같은 웹 사이트가 있으면 좋겠다는 생각을 하였습니다.<br/>
각지에 떨어진 친구들과 약속 장소를 정할 때 꽤 오래걸렸는데, 거리를 기준으로 빠르고 공평하게 만날 장소를 정할 수 있으면 좋겠다는 생각을 했습니다. <br/>이러한 서비스를 제공하는 모델의 경우 다운로드가 필요합 앱 보다는 빠르게 접속하여 사용할 수 있는 웹이 더욱 적절하다고 생각했고, 이번 프로젝트 기간인 4일간 구현 하기에도 적합하다 생각하여 해당 주제를 선정하게 되었습니다. **우리 어디서 만나?**
### 1-2-2. 프로젝트가 제공하는 기능
where we meet 는 모임 방을 생성하고, 모임 방에서 각자의 위치를 등록하여 이를 기반으로 적절한 만남 장소를 추천해주는 서비스를 제공하는 것을 목적으로 하고 있습니다.
1. 모임 방 생성
2. 간이 로그인으로 이름 및 위치 등록 가능
3. 등록된 유저들의 위치 기반으로 중심점을 찾고, 중심점을 기반으로 주변 만남 장소 추천
### 1-2-3. 페이지 설명
#### Landing Page
<img width="890" alt="스크린샷 2024-02-29 오후 4 14 15" src="https://github.com/ketchup0211/where-we-meet/assets/69431340/67f0a38e-5547-456d-b9b7-c52dcc7a1ed8">

-  새로운 모임 방을 생성할 수 있습니다.
#### Room Page
<img width="890" alt="스크린샷 2024-02-29 오후 4 14 23" src="https://github.com/ketchup0211/where-we-meet/assets/69431340/79e1253e-5e38-4060-9e32-f94e991a74b4">

- 간이 로그인을 할 수 있습니다.
- 위치 조회 및 등록이 가능합니다.
- 파티원과 그 위치를 보는 기능이 있습니다.
- 등록된 파티원들의 위치를 기반으로 최적의 만남 반경 및 장소를 추천하는 기능이 있습니다.
- 반경 내 필터링을 통해 인프라를 확인하는 기능이 있습니다.
- 페이지 링크를 카카오톡으로 공유할 수 있는 기능이 있습니다.
- 반경 조절 및 중간 지점으로 이동이 가능합니다.
- 기타 UX 개선을 위한 인터렉션이 잘 구현되어 있습니다.
---
# 2. 사용한 주요 기술
<img width="890" alt="스크린샷 2024-02-29 오후 4 09 45" src="https://github.com/ketchup0211/where-we-meet/assets/69431340/3bef228c-c47b-4665-85b0-81c4c9298953">

## 2-1. React Query
- 데이터 요청과 변경하는 과정에 있어서 단순하고 직관적인 방식을 채택하였습니다.
## 2-2. Json-Server
- 이번 프로젝트에서 사용하는 데이터는 비교적 간단한 데이터 서버를 요구했기 때문에 Json-server 만으로도 충분하다고 판단하여 사용했습니다.
## 2-3 API
- ReactKakaoMapSDK
  [https://react-kakao-maps-sdk.jaeseokim.dev/]
  - 이번 React 프로젝트에서 사용한 주요 기술들을 참고하였습니다.
- Kakao Map API
  [https://apis.map.kakao.com/]
  - SDK문서에 존재하지 않는 정보들을 참고하였습니다.
---
# 3. 주요 기능 구현
### 3-1. KakaoMapAPI를 통해 Map Data를 받아오고, 추가적인 수정을 반영했습니다.
- 클릭 상호작용으로 위치를 보이는 기능
- 특정 위치를 중심으로 일정 반경을 보이는 기능
- 일정 반경에서 특정 키워드를 가진 인프라를 보이는 기능
### 3-2. 각 유저별 데이터와 Map Data의 데이터를 상호 반영하였습니다.
- 검색기능을 통해 특정 위치를 추적하고 저장 할 수 있는 기능
- 특정 위치의 데이터를 유저가 가질 수 있는 기능
- 유저간 서로가 가진 데이터를 기준으로 Map Data에 기준점을 표시하는 기능
### 3-3. Json-server를 통해 데이터를 관리하고, glitch와 vercel로 배포를 진행하였습니다.
---
# 4. 커밋 룰과 PR, 브랜치 규칙

## 커밋 룰
<img width="890" alt="스크린샷 2024-02-29 오후 4 10 31" src="https://github.com/ketchup0211/where-we-meet/assets/69431340/4a160e72-6bf1-42d2-b694-0ab831e2387b">

- [INIT] 초기 생성 (초기 세팅, git 생성자)
- [ADD] 파일 또는 폴더 생성 / 기능 추가
- [MOD] 파일 수정
- [DEL] 파일 또는 폴더 삭제
- [FIX] 버그 수정
- [SCRIPT] package.json 등 변경(npm 설치 등)
Git Rule의 경우 자잘한 단위로 커밋을 자주 올리도록 했고, 대문자와 대괄호를 사용해 커밋 내역을 직관적으로 확인할 수 있도록 했습니다. <br/>또한 영어로 commit 로그를 남겨 통일성을 주었습니다.
## PR
<img width="890" alt="스크린샷 2024-02-29 오후 4 10 43" src="https://github.com/ketchup0211/where-we-meet/assets/69431340/d1e14c1e-d135-4d15-8c21-d86ef9313604">
- PR 등록 시 양식이 자동으로 적용되도록 하였습니다.
- 작은 단위로 PR을 남기고 필요성, 변화, 수정된 사항 등을 설명하여 어떤 것이 변경 되었는 지 정확히 남겼습니다.
- PR을 기능 단위로 자주 올리도록 노력하여 서로의 로그가 명확히 남아있을 수 있도록 노력하였습니다.

## 브랜치명 및 관리 (Branch Flow)
**브랜치 명 :** **page_name/main-function/derived-function**
- **dev : main branch**
- **feature/map**
- **feature/search-place**
- **feature/map-center-location**
- **feature/map-resize**
---
# 5. 체크리스트
- [x] 반복적으로 사용되는 컴포넌트는 공용 컴포넌트화 하였는지 (재사용성)
- [x] 상태관리 라이브러리(react-query 등)를 사용하여 서버 state를
      관리하였는지
- [x] 새로고침 후에도 상태가 유지되는지
- [x] 변수 이름이 semantic 한지 (의미를 바로 알아볼 수 있는지)
- [x] 페이지 컴포넌트가 too nested 되어 있지는 않은 지 (컴포넌트 리팩토링이 필요한 상태인지)
- [x] 서버 mutation 요청 전에 유효성검사 진행하였는지
---
# 6. 폴더 구조
📦src<br/>
 ┣ 📂assets<br/>
 ┃ ┗ 📜react.svg<br/>
 ┣ 📂components<br/>
 ┃ ┣ 📂commons<br/>
 ┃ ┃ ┣ 📂buttons<br/>
 ┃ ┃ ┣ 📂inputs<br/>
 ┃ ┃ ┣ 📂lodings<br/>
 ┃ ┃ ┗ 📂modals<br/>
 ┃ ┗ 📂units<br/>
 ┃ ┃ ┣ 📂detailComponent<br/>
 ┃ ┃ ┃ ┗ 📂article<br/>
 ┃ ┃ ┃ ┃ ┣ 📜Article.jsx<br/>
 ┃ ┃ ┃ ┃ ┗ 📜ArticleStyle.module.css<br/>
 ┃ ┃ ┣ 📂homeComponent<br/>
 ┃ ┃ ┃ ┣ 📂articleList<br/>
 ┃ ┃ ┃ ┃ ┣ 📜ArticleList.jsx<br/>
 ┃ ┃ ┃ ┃ ┗ 📜ArticleListStyle.module.css<br/>
 ┃ ┃ ┃ ┗ 📂categoryNavigation<br/>
 ┃ ┃ ┃ ┃ ┣ 📜CategoryNavigation.jsx<br/>
 ┃ ┃ ┃ ┃ ┗ 📜CategoryNavigation.module.css<br/>
 ┃ ┃ ┗ 📂layout<br/>
 ┃ ┃ ┃ ┣ 📜Footer.jsx<br/>
 ┃ ┃ ┃ ┣ 📜Header.jsx<br/>
 ┃ ┃ ┃ ┗ 📜Layout.jsx<br/>
 ┣ 📂pages<br/>
 ┃ ┣ 📂detail<br/>
 ┃ ┃ ┣ 📜Detail.jsx<br/>
 ┃ ┃ ┗ 📜Detail.module.css<br/>
 ┃ ┗ 📂home<br/>
 ┃ ┃ ┣ 📜Home.jsx<br/>
 ┃ ┃ ┗ 📜HomeStyle.module.css<br/>
 ┣ 📂redux<br/>
 ┃ ┣ 📂config<br/>
 ┃ ┗ 📂modules<br/>
 ┣ 📂shared<br/>
 ┣ 📂util<br/>
 ┣ 📜App.css<br/>
 ┣ 📜App.jsx<br/>
 ┣ 📜index.css<br/>
 ┗ 📜main.jsx<br/>

