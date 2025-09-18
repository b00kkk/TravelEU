# TravelEU 

## 실행영상
https://github.com/b00kkk/TravelEU/blob/main/%EC%B4%88%EA%B8%B0%EC%98%81%EC%83%81(Flask).mp4

## 실행법
1. 라이브러리 및 필요 환경 갖추기
-  Svelte 사용을 위해 Node.js 설치
-  터미널에서 cd frontend 와 npm install 입력

2. 서버 실행
- npm run dev
- uvicorn main:app --reload
  
3. 웹페이지 실행
- http://localhost:8000 을 웹 브라우저에서 접속

## 프로젝트 수행 배경
코로나로 인한 거리두기가 종식되면서 여행과 관광지 방문이 활성화 되고 있는 상황이다. 
이러한 상황에서 주변 사람들과 같이 여행을 가거나 패키지가 아닌 자유여행을 가려 할때 직접 여행을 할때 복잡함을 줄여주기 위해 이 프로젝트를 개발하게 되었다

## 개발 기간
- 초기 Flask
![image](https://github.com/user-attachments/assets/99cb8b64-20f5-463e-a068-6af242ba812f)
2023.11.01 ~ 2023.12.12

- fastapi
  >2024.11.01 ~ 2024.11.30

## 멤버
> 초기 Flask
>- 김대표(팀장) : 서버 및 기획
>- 김부겸 : BackEnd
>- 김선휘 : FrontEnd
>- 안세준 : BackEnd
>- 유나현 : FrontEnd

> fastapi
> - 김부겸

## 파일 구조
```
TRAVELEU                                                             
├── frontend/
│   ├── public/
│   │   ├── vite.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Error.svelte
│   │   │   └── Navigation.svelte
│   │   ├── lib/
│   │   │   ├── store.js
│   │   │   └── api.js
│   │   ├── routes/
│   │   │   ├── DateSelect.svelte
│   │   │   ├── Home.svelte
│   │   │   ├── Lodging.svelte
│   │   │   ├── Route.svelte
│   │   │   ├── SpotSelect.svelte
│   │   │   ├── Survey.svelte
│   │   │   ├── UserCreate.svelte
│   │   │   └── UserLogin.svelte
│   │   ├── .env
│   │   ├── app.css
│   │   ├── App.svelte
│   │   └── main.js
│   ├── package.json
│   ├── package-lock.json
│   ├── svelte.config.json
│   ├── vite.config.json
│   ├── README.md
│   └── .gitignore
├── domain/
│   │   ├── user/
│   │   │   ├── user_crud.py
│   │   │   ├── user_schema.py
│   │   │   └── user_router.py
│   │   ├── spot/
│   │   │   ├── spot_crud.py
│   │   │   ├── spot_schema.py
│   │   │   └── spot_router.py
├── migrations/       
│   ├── env.py
│   └── README.md
├── bigdata.db
├── models.py
├── database.py
└── main.py
```

## 주요 기능
### 회원가입/로그인
- DB 값 확인
- 암호화

### 추천 관광지
- 사용자가 나이, 성별, 동행인에 관한 설문폼 작성
- 작성 데이터를 사전에 입력한 설문폼과 비교하여 추천 관광지를 보여줌
- SVD 이용

### 구글맵
- 사용자가 관광지를 모를것이라 대비해 버튼을 누르면 팝업으로 구글맵에 관광지를 입력하여 보여줌
- API를 이용해 교통 수단(차량, 대중교통)에 맞추어 최적 경로와 시간을 보여줌
- Nearest Neighbor Algorithm 사용

### 포트포워딩
- 우분투에서 포트포워딩 진행
