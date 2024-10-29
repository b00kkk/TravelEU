<script>
    import { is_login } from "../lib/store";
    import { push } from 'svelte-spa-router';
    import UserLogin from './UserLogin.svelte';
  
    // 로그인 여부를 확인하는 함수
    function handleButtonClick() {
      if ($is_login) {
        push("/date-select");  // 로그인 시 DateSelect 페이지로 이동
      } else {
        alert("로그인을 해주세요."); // 로그인 팝업
      }
    }
  </script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 전체 화면 중앙 정렬 */
  }
  
  .button {
    padding: 40px 80px;
    font-size: 40px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .button:hover {
    background-color: #2980b9;
  }
</style>

<div class="container">
  <button class="button" on:click={handleButtonClick}>Start</button>
</div>