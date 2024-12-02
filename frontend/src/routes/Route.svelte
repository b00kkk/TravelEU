<script>
    import { onMount } from 'svelte';
    import { selectedPlan } from '../lib/store';
    import { fetchSpotsCoordinates } from '../lib/api'; // 좌표를 가져오는 API 함수

    let days = [];
    let lodgingAddresses = []; // 숙소 정보를 저장할 배열

    // selectedPlan 구독
    selectedPlan.subscribe(plan => {
        console.log("selectedPlan 데이터:", plan);
        days = [];
        lodgingAddresses = plan.lodgingAddresses || []; // 숙소 정보를 가져옴

        for (let key in plan) {
            if (plan.hasOwnProperty(key) && key !== 'lodgingAddresses' && typeof plan[key] === 'object') {
                days.push({
                    ...plan[key],
                    dayIndex: key // 일자 인덱스 추가
                });
            }
        }

        console.log("가공된 days 데이터:", days);
        console.log("숙소 정보:", lodgingAddresses);
    });

    // Haversine 공식을 사용한 거리 계산
    function haversine_distance(coord1, coord2) {
        const R = 6371; // 지구 반지름 (km)
        const toRad = (degrees) => degrees * Math.PI / 180;
        const lat1 = toRad(coord1[0]), lon1 = toRad(coord1[1]);
        const lat2 = toRad(coord2[0]), lon2 = toRad(coord2[1]);

        const dlat = lat2 - lat1;
        const dlon = lon2 - lon1;

        const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    // 최적 경로 계산 (Nearest Neighbor 알고리즘)
    function nearest_neighbor_tsp(coords) {
        const num_coords = coords.length;
        const unvisited = new Set([...Array(num_coords).keys()]);
        let current_city = 0;
        const tour = [current_city];
        unvisited.delete(current_city);

        while (unvisited.size) {
            const nearest_city = Array.from(unvisited).reduce((nearest, city) => 
                haversine_distance(coords[current_city], coords[city]) <
                haversine_distance(coords[current_city], coords[nearest]) ? city : nearest
            );
            tour.push(nearest_city);
            unvisited.delete(nearest_city);
            current_city = nearest_city;
        }
        return tour;
    }

    async function calculateOptimalRoute(day) {
        const spots = day.selectedSpots;
        console.log(`Day ${day.dayIndex} - 선택된 관광지:`, spots); // 선택된 관광지 출력

        try {
            const coords = await fetchSpotsCoordinates(spots); // API를 통해 좌표 가져오기
            console.log(`Day ${day.dayIndex} - 좌표 데이터:`, coords); // 좌표 데이터 출력

            const optimalTour = nearest_neighbor_tsp(coords.map(coord => [coord.latitude, coord.longitude]));
            console.log(`Day ${day.dayIndex} - 최적 경로 인덱스:`, optimalTour); // 최적 경로 인덱스 출력

            // 최적 경로에 따라 관광지 정렬
            day.selectedSpots = optimalTour.map(index => spots[index]);
            console.log(`Day ${day.dayIndex} - 최적 경로 정렬 결과:`, day.selectedSpots); // 정렬된 결과 출력
        } catch (error) {
            console.error(`Day ${day.dayIndex} - 오류 발생:`, error);
            alert("최적 경로를 계산하는 중 오류가 발생했습니다.");
        }
    }

    async function optimizeAllRoutes() {
        for (let day of days) {
            if (day.selectedSpots && day.selectedSpots.length > 1) {
                await calculateOptimalRoute(day);
            }
        }
    }

    // 컴포넌트 마운트 시 최적 경로 계산
    onMount(() => {
        optimizeAllRoutes();
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
    .lodging {
        margin-top: 15px;
        padding: 10px;
        border: 1px solid #ddd;
        background-color: #f9f9f9;
    }
</style>

<div class="container">
    <h1>여행 일정별 최적 경로 및 숙소 정보</h1>
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

            <!-- 숙소 정보 표시 -->
            {#if lodgingAddresses[index]}
                <div class="lodging">
                    <h3>숙소:</h3>
                    <p>{lodgingAddresses[index].address}</p>
                </div>
            {:else}
                <p>숙소 정보가 없습니다.</p>
            {/if}
        </div>
    {/each}
</div>
