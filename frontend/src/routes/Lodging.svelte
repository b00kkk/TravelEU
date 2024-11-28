<script>
    import { onMount } from 'svelte';
    import { tripDuration } from '../lib/store';

    let lodgingAddresses = [];

    $: $tripDuration, setupLodgingAddresses($tripDuration);

    function setupLodgingAddresses(duration) {
        lodgingAddresses = Array.from({ length: duration }, () => ({ address: '' }));
    }

    function handleSubmit() {
        console.log("숙소 주소 정보:", lodgingAddresses);
        // 이 정보를 저장하거나 다음 처리 단계로 넘길 수 있습니다.
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
