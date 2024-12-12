<script>
  import { is_login } from "../lib/store";
  import { push } from 'svelte-spa-router';
  import UserLogin from './UserLogin.svelte';

  // 로그인 여부를 확인하는 함수
  function handleButtonClick() {
      if ($is_login) {
          push("/date-select"); // 로그인 시 DateSelect 페이지로 이동
      } else {
          alert("로그인을 해주세요."); // 로그인 팝업
      }
  }
</script>

<style>
/* 전체 화면 중앙 정렬 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
}

/* 버튼 스타일 */
.button {
  padding: 20px 60px;
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  background: #4682b4; /* 블루 계열 색상 */
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* 부드러운 그림자 */
  transition: all 0.3s ease;
}

/* 버튼 호버 효과 */
.button:hover {
  background: #5dade2; /* 밝은 블루 */
  transform: scale(1.05); /* 약간 확대 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 강조된 그림자 */
}

/* 버튼 클릭 효과 */
.button:active {
  transform: scale(0.98); /* 살짝 축소 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 축소 */
}
</style>

<div class="container">
  <button class="button" on:click={handleButtonClick}>Start</button>
</div>
