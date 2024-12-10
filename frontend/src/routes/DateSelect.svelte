<script>
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.min.css";
  import { tripDuration } from "../lib/store"; 
  import { push } from "svelte-spa-router"; // 페이지 이동
  
  let startDate = "";
  let endDate = "";

  let startPicker, endPicker;

  function initFlatpickr() {
      startPicker = flatpickr("#startDate", {
          dateFormat: "Y-m-d",
          minDate: "today",
          onChange: (selectedDates) => {
              startDate = selectedDates[0] ? selectedDates[0].toLocaleDateString("sv-SE") : "";

              if (selectedDates[0]) {
                  const nextDay = new Date(selectedDates[0]);
                  nextDay.setDate(nextDay.getDate() + 1);
                  endPicker.set("minDate", nextDay);
              }
          },
      });

      endPicker = flatpickr("#endDate", {
          dateFormat: "Y-m-d",
          minDate: "today",
          onChange: (selectedDates) => {
              endDate = selectedDates[0] ? selectedDates[0].toLocaleDateString("sv-SE") : "";

              // 여행 기간 계산
              if (startDate && endDate) {
                  const start = new Date(startDate);
                  const end = new Date(endDate);
                  const durationInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
                  tripDuration.set(durationInDays); // 여행 일수 store에 저장
              }
          },
      });
  }

  import { onMount } from 'svelte';
  onMount(initFlatpickr);

  function handleNext() {
      if (startDate && endDate) {
          push("/survey"); // 다음 페이지로 이동
      } else {
          alert("여행 시작일과 종료일을 선택하세요.");
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

  .date-picker {
      width: 100%;
      margin: 10px 0;
  }

  .label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
      color: #333;
  }

  input[type="text"] {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  input[type="text"]:focus {
      outline: none;
      border-color: #5dade2;
      box-shadow: 0 0 4px rgba(81, 167, 232, 0.5);
  }

  button {
      margin-top: 20px;
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

  p {
      margin: 5px 0;
      color: #555;
  }
</style>

<div class="container">
  <h3>여행 날짜 선택</h3>

  <div class="date-picker">
      <label for="startDate" class="label">여행 시작일</label>
      <input type="text" id="startDate" placeholder="날짜 선택" readonly />
  </div>

  <div class="date-picker">
      <label for="endDate" class="label">여행 종료일</label>
      <input type="text" id="endDate" placeholder="날짜 선택" readonly />
  </div>

  <div>
      <p>선택된 여행 시작일: {startDate}</p>
      <p>선택된 여행 종료일: {endDate}</p>
  </div>

  <button on:click={handleNext}>다음</button>
</div>
