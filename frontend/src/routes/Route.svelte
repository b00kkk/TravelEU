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

    async function calculateOptimalRoute(day, lodgingCoord) {
        const spots = day.selectedSpots;
        console.log(`Day ${day.dayIndex} - 선택된 관광지:`, spots);

        try {
            const spotCoords = await fetchSpotsCoordinates(spots); // 관광지 좌표 가져오기
            console.log(`Day ${day.dayIndex} - 관광지 좌표 데이터:`, spotCoords);

            // 관광지 좌표에 숙소 좌표 추가
            const coords = [...spotCoords.map(coord => [coord.latitude, coord.longitude])];
            if (lodgingCoord) {
                coords.unshift(lodgingCoord); // 숙소 좌표를 경로의 시작점으로 추가
            }

            console.log(`Day ${day.dayIndex} - 전체 좌표 데이터 (숙소 포함):`, coords);

            // 최적 경로 계산
            const optimalTour = nearest_neighbor_tsp(coords);
            console.log(`Day ${day.dayIndex} - 최적 경로 인덱스 (숙소 포함):`, optimalTour);

            // 최적 경로에 따라 관광지 정렬
            const sortedSpots = optimalTour
            .reverse()
            .map(index => 
                index === 0 ? lodgingAddresses[day.dayIndex].address : spots[index - 1] // 인덱스 0은 숙소로 표시
            );
            console.log(`Day ${day.dayIndex} - 최적 경로 정렬 결과 (숙소 포함):`, sortedSpots);

        } catch (error) {
            console.error(`Day ${day.dayIndex} - 오류 발생:`, error);
            alert("최적 경로를 계산하는 중 오류가 발생했습니다.");
        }
    }


    // 모든 일자의 경로를 최적화
    async function optimizeAllRoutes() {
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const lodging = lodgingAddresses[i];
            if (day.selectedSpots && day.selectedSpots.length > 1) {
                const lodgingCoord = lodging?.coordinates;
                await calculateOptimalRoute(day, lodgingCoord);
            }
        }
    }

    // 숙소 주소로 좌표를 가져오는 함수
    async function fetchLodgingCoordinates(address) {
        const apiKey = 'YourAPI'; // Google API 키 입력
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
                const location = data.results[0].geometry.location;
                return [location.lat, location.lng]; // [위도, 경도] 반환
            } else {
                throw new Error('좌표를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('숙소 좌표 구하기 오류:', error);
            throw error;
        }
    }

    // 숙소 좌표를 구하고 lodgingAddresses 배열에 추가하는 함수
    async function getLodgingCoordinatesForAllDays() {
        for (let i = 0; i < lodgingAddresses.length; i++) {
            const address = lodgingAddresses[i].address;
            try {
                const coords = await fetchLodgingCoordinates(address);
                lodgingAddresses[i].coordinates = coords; // 좌표 저장
                console.log(`숙소 ${i + 1} 좌표:`, coords);
            } catch (error) {
                console.error(`숙소 ${i + 1} 좌표 구하기 오류:`, error);
            }
        }
    }

    // 컴포넌트 마운트 시 최적 경로 계산 및 숙소 좌표 계산
    onMount(async () => {
        await getLodgingCoordinatesForAllDays(); // 숙소 좌표 계산
        await optimizeAllRoutes(); // 최적 경로 계산
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
