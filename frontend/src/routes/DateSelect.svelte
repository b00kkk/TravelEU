<script>
    import flatpickr from "flatpickr";
    import "flatpickr/dist/flatpickr.min.css";
    import { tripDuration } from "../lib/store"; 
    import { push } from "svelte-spa-router";     // 페이지 이동을 위한 push
    
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
            const durationInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24))+1;
            tripDuration.set(durationInDays);  // 여행 일수 store에 저장
            console.log("여행일수:", durationInDays); 
        }
        },
      });
    }
  
    import { onMount } from 'svelte';
    onMount(initFlatpickr);
  
    // 다음 버튼 클릭 시
    function handleNext() {
      if (startDate && endDate) {
        push("/survey");  // 다음 페이지로 이동
      } else {
        alert("여행 시작일과 종료일을 선택하세요.");
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
  
    .date-picker {
      margin: 10px 0;
    }
  
    .label {
      font-weight: bold;
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
  