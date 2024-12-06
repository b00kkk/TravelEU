<script>
    import { onMount } from 'svelte';
    import { selectedPlan } from '../lib/store';
    import { fetchSpotsCoordinates } from '../lib/api'; // 좌표를 가져오는 API 함수

    let days = [];
    let lodgingAddresses = []; // 숙소 정보를 저장할 배열
    let map; // Google Map 인스턴스
    let directionsService; // Directions Service 인스턴스
    let directionsRenderer; // Directions Renderer 인스턴스
    let dayRoutes = []; // 일별 경로 데이터 저장

    // selectedPlan 구독
    selectedPlan.subscribe(plan => {
        days = [];
        lodgingAddresses = plan.lodgingAddresses || []; // 숙소 정보를 가져옴
        dayRoutes = []; // 경로 초기화

        for (let key in plan) {
            if (plan.hasOwnProperty(key) && key !== 'lodgingAddresses' && typeof plan[key] === 'object') {
                days.push({
                    ...plan[key],
                    dayIndex: key // 일자 인덱스 추가
                });
                dayRoutes.push([]); // 일별 경로 초기화
            }
        }
    });

    // Google Maps 초기화
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 48.8566, lng: 2.3522 }, // 초기 지도 중심 (파리 좌표 예시)
            zoom: 6,
        });
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({
            map,
            suppressMarkers: false, // 기본 마커 표시
        });
    }

    // 각 경로 데이터를 미리 계산하여 저장
    async function calculateRoutes(dayIndex) {
        const day = days[dayIndex];
        if (!day.selectedSpots || day.selectedSpots.length < 2) {
            alert('최소 2개의 관광지가 필요합니다.');
            return;
        }

        const coords = await fetchSpotsCoordinates(day.selectedSpots);
        const points = coords.map(coord => ({ lat: coord.latitude, lng: coord.longitude }));
        dayRoutes[dayIndex] = []; // 초기화

        for (let i = 0; i < points.length - 1; i++) {
            dayRoutes[dayIndex].push({
                origin: points[i],
                destination: points[i + 1],
            });
        }
    }

    // 경로 표시
    function displayRoute(route) {
        directionsService.route(
            {
                origin: route.origin,
                destination: route.destination,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result); // 지도에 경로 그리기
                } else {
                    console.error('Directions request failed due to ' + status);
                    alert('경로를 표시할 수 없습니다.');
                }
            }
        );
    }

    // onMount 시 초기화 및 경로 계산
    onMount(() => {
        initMap(); // Google Maps 초기화
        days.forEach((_, index) => calculateRoutes(index)); // 모든 Day의 경로 계산
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
    .route-buttons {
        margin-top: 10px;
    }
    button {
        margin-right: 5px;
        margin-bottom: 5px;
    }
    #map {
        width: 100%;
        height: 400px;
        margin-top: 20px;
    }
</style>

<div class="container">
    <h1>여행 일정별 최적 경로 및 숙소 정보</h1>
    {#each days as day, dayIndex}
        <div class="day-container">
            <h2>Day {parseInt(day.dayIndex) + 1}</h2>
            {#if day.selectedSpots}
                <ul>
                    {#each day.selectedSpots as spot}
                        <li>{spot}</li>
                    {/each}
                </ul>
                <div class="route-buttons">
                    {#each dayRoutes[dayIndex] as route, routeIndex}
                        <button on:click={() => displayRoute(route)}>
                            {routeIndex + 1}번째 경로 보기
                        </button>
                    {/each}
                </div>
            {:else}
                <p>선택된 관광지가 없습니다.</p>
            {/if}

            <!-- 숙소 정보 표시 -->
            {#if lodgingAddresses[dayIndex]}
                <div class="lodging">
                    <h3>숙소:</h3>
                    <p>{lodgingAddresses[dayIndex].address}</p>
                </div>
            {:else}
                <p>숙소 정보가 없습니다.</p>
            {/if}
        </div>
    {/each}

    <div id="map"></div>
</div>
