<script>
    import { onMount } from 'svelte';
    import { tripDuration, selectedPlan } from '../lib/store';
    import { push } from 'svelte-spa-router';

    let lodgingAddresses = [];

    // 여행 기간에 따라 숙소 주소 필드 초기화
    $: $tripDuration, setupLodgingAddresses($tripDuration);

    // selectedPlan 스토어에서 현재 여행 계획을 가져와서 숙소 주소 배열 초기화
    selectedPlan.subscribe(value => {
        if (value && value.lodgingAddresses && value.lodgingAddresses.length > 0) {
            lodgingAddresses = value.lodgingAddresses;
        } else {
            setupLodgingAddresses($tripDuration);
        }
    });

    function setupLodgingAddresses(duration) {
        lodgingAddresses = Array.from({ length: duration }, () => ({ address: '' }));
    }

    function handleSubmit() {
        console.log("숙소 주소 정보:", lodgingAddresses);
        selectedPlan.update(currentPlan => {
            return { ...currentPlan, lodgingAddresses };
        });
        push("/route")
    }
</script>

<style>
    /* 전체 컨테이너 스타일 */
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        max-width: 600px;
        margin: auto;
        border-radius: 8px;
    }

    /* 제목 스타일 */
    h2 {
        color: #1e3a8a; /* 진한 파란색 */
        font-size: 26px;
        margin-bottom: 20px;
        font-weight: 600;
    }

    h3 {
        color: #1e40af; /* 진한 파란색 */
        font-size: 20px;
        margin-bottom: 10px;
        font-weight: 500;
    }

    /* 입력 필드 스타일 */
    input[type="text"] {
        width: 100%;
        padding: 12px;
        margin: 8px 0;
        border: 1px solid #d1d5db; /* 연한 회색 테두리 */
        border-radius: 8px;
        font-size: 16px;
        background-color: #fff;
    }

    input[type="text"]:focus {
        outline: none;
        border-color: #3b82f6; /* 파란색 테두리 */
        box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
    }

    /* 버튼 스타일 */
    button {
        margin-top: 20px;
        background-color: #3b82f6; /* 파란색 */
        color: white;
        padding: 12px 20px;
        font-size: 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #2563eb; /* 진한 파란색 */
    }

    /* 작은 카드 스타일로 각 날마다 숙소 정보 입력 */
    .lodging-card {
        background-color: #fff;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 20px;
        margin: 10px 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .lodging-card label {
        color: #1e40af;
        font-weight: bold;
    }
</style>

<div class="container">
    <h2>숙소 주소 입력</h2>
    <form on:submit|preventDefault={handleSubmit}>
        {#each lodgingAddresses as lodging, index}
            <div class="lodging-card">
                <h3>Day {index + 1} 숙소</h3>
                <label for={`address-${index}`}>주소:</label>
                <input id={`address-${index}`} type="text" bind:value={lodging.address} placeholder="숙소 주소를 입력하세요">
            </div>
        {/each}
        <button type="submit">저장</button>
    </form>
</div>
