<script>
    import { onMount } from 'svelte';
    import { selectedPlan } from '../lib/store';
    import { fetchSpotsCoordinates } from '../lib/api'; // 좌표를 가져오는 API 함수

    let days = [];
    let lodgingAddresses = [];
    let activeMapIndex = null; // 활성화된 지도 인덱스 (null이면 비활성화)
    let maps = []; // Google Maps 객체를 저장할 배열

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

    // 지도 초기화 및 경로 표시 (차량 경로로 변경)
    function renderMap(index, coordinates) {
        const mapContainer = document.getElementById(`map-${index}`);
        mapContainer.style.display = 'block'; // 지도를 표시

        // Google Maps 객체 생성
        const map = new google.maps.Map(mapContainer, {
            center: coordinates[0],
            zoom: 12,
        });

        // Directions Service와 Renderer 객체 생성
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            polylineOptions: {
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
            },
        });

        // 경로 요청을 위한 지점 설정
        const waypoints = coordinates.slice(1, coordinates.length - 1).map(coord => ({
            location: new google.maps.LatLng(coord[0], coord[1]),
            stopover: true
        }));

        const request = {
            origin: new google.maps.LatLng(coordinates[0][0], coordinates[0][1]),  // 숙소 또는 첫 지점
            destination: new google.maps.LatLng(coordinates[coordinates.length - 1][0], coordinates[coordinates.length - 1][1]), // 마지막 지점
            waypoints: waypoints, // 경유지 설정
            travelMode: google.maps.TravelMode.DRIVING, // 차량 경로
        };

        // 경로 요청
        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result); // 경로를 지도에 표시
                console.log("경로 계산 완료:", result);
            } else {
                console.error("경로 계산 오류:", status);
            }
        });

        maps[index] = map; // 생성된 지도 객체를 저장
    }


    // 지도 토글 함수
    function toggleMap(index, coordinates) {
        const mapContainer = document.getElementById(`map-${index}`);

        if (activeMapIndex === index) {
            activeMapIndex = null; // 지도 비활성화
            mapContainer.style.display = 'none';
        } else {
            activeMapIndex = index; // 활성화된 지도 인덱스 설정
            renderMap(index, coordinates);
        }
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

    // 최적 경로 계산 후 selectedSpots 업데이트
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

            // 새로운 배열로 업데이트
            day.selectedSpots = [...sortedSpots]; // 새 배열로 교체

            // `selectedSpots`의 변경 사항이 반영되도록 강제로 업데이트 (반응형 시스템을 활용)
            selectedPlan.update(plan => {
                plan[day.dayIndex] = day;  // `day` 객체를 반영하도록 업데이트
                return plan;
            });

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
        const apiKey = 'API'; // Google API 키 입력
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

    async function prepareMaps() {
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const lodging = lodgingAddresses[i];
            
            if (day.selectedSpots && day.selectedSpots.length > 1) {
                const lodgingCoord = lodging?.coordinates;
                const spots = day.selectedSpots;
                
                // 관광지 좌표 가져오기
                const spotCoords = await fetchSpotsCoordinates(spots);
                let coordinates = spotCoords.map(c => [c.latitude, c.longitude]);

                // 숙소 좌표를 추가할 경우
                if (lodgingCoord) {
                    coordinates.unshift(lodgingCoord); // 숙소를 첫 번째 좌표로 추가
                }

                // 최적 경로 계산 (Nearest Neighbor 알고리즘)
                const optimalTour = nearest_neighbor_tsp(coordinates);

                // 최적 경로 순서대로 좌표 정렬
                day.coordinates = optimalTour.map(index => coordinates[index]).reverse();

                console.log(`Day ${day.dayIndex} - 최적 경로로 정렬된 좌표:`, day.coordinates);
            }
        }
    }

    onMount(async () => {
        await getLodgingCoordinatesForAllDays(); // 숙소 좌표 계산
        await optimizeAllRoutes(); // 최적 경로 계산
        await prepareMaps(); // 지도 데이터를 준비
    });
</script>

<style>
    .map-container {
        position: relative;
        height: 0;
        padding-bottom: 56.25%; /* 16:9 비율 */
        display: none; /* 기본적으로 숨김 */
        margin-top: 10px;
    }
    .map {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .map-toggle {
        cursor: pointer;
        background-color: #f1f1f1;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 10px;
        display: inline-block;
        z-index: 10; /* 버튼이 맨 위로 오게 설정 */
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

            <!-- 지도 토글 버튼 -->

                <button type="button" class="map-toggle" on:click={() => toggleMap(index, day.coordinates)}>
                    {activeMapIndex === index ? '지도를 숨기기' : '지도를 보기'}
                </button>
                <div id={`map-${index}`} class="map-container">
                    <div class="map"></div>
                </div>

        </div>
    {/each}
</div>
