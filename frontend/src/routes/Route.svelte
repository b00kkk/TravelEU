<script>
    import { selectedPlan } from '../lib/store';

    let days = [];

    selectedPlan.subscribe(plan => {
        days = [];
        // 모든 키를 순회하면서 각 일자의 데이터 추출
        for (let key in plan) {
            if (plan.hasOwnProperty(key) && key !== 'lodgingAddresses' && typeof plan[key] === 'object') {
                days.push({
                    ...plan[key],
                    dayIndex: key  // 일자 인덱스 추가
                });
            }
        }
    });
</script>

<style>
    .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 10px;
    }
    .day-container {
        border: 1px solid #ccc;
        margin-top: 20px;
        padding: 10px;
    }
    h2 {
        font-size: 1.5em;
        margin-bottom: 10px;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin-bottom: 5px;
    }
</style>

<div class="container">
    <h1>여행 일정별 관광지 목록</h1>
    {#each days as day, index}
        <div class="day-container">
            <h2>Day {parseInt(day.dayIndex) + 1}</h2>
            {#if day.selectedSpots}
                <ul>
                    {#each day.selectedSpots as spot}
                        <li>{spot}</li>
                    {/each}
                </ul>
            {:else}
                <p>선택된 관광지가 없습니다.</p>
            {/if}
        </div>
    {/each}
</div>
