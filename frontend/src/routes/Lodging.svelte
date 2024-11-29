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
        push("/next-page")
    }
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        padding: 20px;
        max-width: 600px;
        margin: auto;
    }
    input, button {
        margin-top: 10px;
    }
</style>

<div class="container">
    <h2>숙소 주소 입력</h2>
    <form on:submit|preventDefault={handleSubmit}>
        {#each lodgingAddresses as lodging, index}
            <div>
                <h3>Day {index + 1} 숙소 주소</h3>
                <label for={`address-${index}`}>주소:</label>
                <input id={`address-${index}`} type="text" bind:value={lodging.address} placeholder="숙소 주소를 입력하세요">
            </div>
        {/each}
        <button type="submit">저장</button>
    </form>
</div>
