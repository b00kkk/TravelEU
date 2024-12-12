<script>
  import { push } from 'svelte-spa-router';
  import { surveyData } from '../lib/store';

  let travelFor = "";
  let age = "";
  let gender = "";

  // 선택된 질문 1 값을 숫자로 매핑
  function mapTravelFor(value) {
      switch(value) {
          case "alone": return 1; // 혼자
          case "partner": return 2; // 연인
          case "friends": return 3; // 친구
          case "family": return 4; // 가족
          default: return 0; // 기본값
      }
  }

  // 성별 값을 숫자로 매핑
  function mapGender(value) {
      switch(value) {
          case "male": return 1; // 남성
          case "female": return 2; // 여성
          default: return 0; // 기본값
      }
  }

  function handleSubmit() {
      // 입력값 확인 및 다음 페이지로 이동
      const travelForValue = mapTravelFor(travelFor);
      const genderValue = mapGender(gender);

      if (travelForValue && age && genderValue) {
          // 필요시 입력값 저장 로직 추가
          console.log("여행 대상을 숫자로 저장:", travelForValue);
          console.log("나이:", age);
          console.log("성별을 숫자로 저장:", genderValue);
          surveyData.set({
              travelFor: travelForValue,
              age: age,
              gender: genderValue
          });
          // 다음 페이지로 이동
          push("/spot-select");
      } else {
          alert("모든 질문에 답해주세요.");
      }
  }
</script>

<style>
  /* 컨테이너 스타일 */
  .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      max-width: 500px;
      margin: auto;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      background: #fff;
      font-family: 'Arial', sans-serif;
  }

  h3 {
      font-size: 24px;
      color: #4682b4;
      margin-bottom: 20px;
  }

  /* 질문 스타일 */
  .question {
      width: 100%;
      margin: 15px 0;
      max-width: 400px;
  }

  .label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
      color: #333;
  }

  .input-field {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .input-field:focus {
      outline: none;
      border-color: #5dade2;
      box-shadow: 0 0 4px rgba(81, 167, 232, 0.5);
  }

  /* 버튼 스타일 */
  button {
      margin-top: 30px;
      padding: 12px 20px;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      background-color: #4682b4;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
  }

  button:hover {
      background-color: #5dade2;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  button:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="container">
  <h3>여행을 위한 설문조사</h3>

  <div class="question">
      <label for="travelFor" class="label">누구를 위한 여행인가?</label>
      <select id="travelFor" class="input-field" bind:value={travelFor}>
          <option value="" disabled selected>선택하세요</option>
          <option value="alone">혼자</option>
          <option value="partner">연인</option>
          <option value="friends">친구</option>
          <option value="family">가족</option>
      </select>
  </div>

  <div class="question">
      <label for="age" class="label">질문1 대상의 나이는?</label>
      <input type="number" id="age" class="input-field" bind:value={age} placeholder="나이 입력" min="0" />
  </div>

  <div class="question">
      <label for="gender" class="label">질문1 대상의 성별은?</label>
      <select id="gender" class="input-field" bind:value={gender}>
          <option value="" disabled selected>성별 선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
      </select>
  </div>

  <button on:click={handleSubmit}>제출</button>
</div>
