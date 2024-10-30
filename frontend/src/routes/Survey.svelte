<script>
    import { push } from 'svelte-spa-router';

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
        
        // 다음 페이지로 이동
        push("/spot-select"); 
      } else {
        alert("모든 질문에 답해주세요.");
      }
    }
  </script>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
  
    .question {
      margin: 15px 0;
      width: 100%; /* 전체 너비를 사용 */
      max-width: 400px; /* 최대 너비 제한 */
    }
  
    .label {
      font-weight: bold;
    }
  
    .input-field {
      width: 100%; /* 100% 너비 */
      padding: 10px; /* 패딩 통일 */
      margin-top: 5px;
      box-sizing: border-box; /* 박스 크기 계산에 패딩 포함 */
      border: 1px solid #ccc; /* 테두리 스타일 추가 */
      border-radius: 4px; /* 둥근 모서리 */
    }
  
    button {
      margin-top: 20px;
      padding: 10px 15px;
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
  