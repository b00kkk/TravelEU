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
│   ├── vite행
