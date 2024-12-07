<script>
    import { onMount } from 'svelte';
    import { selectedPlan } from '../lib/store';
    import { fetchSpotsCoordinates } from '../lib/api'; // 좌표를 가져오는 API 함수

    let days = [];
    let lodgingAddresses = [];
    let activeMapIndices = [];
    let maps = []; // Google Maps 객체를 저장할 배열

    // selectedPlan 구독
    selectedPlan.subscribe(plan => {
        days = [];
        lodgingAddresses = plan.lodgingAddresses || []; // 숙소 정보를 가져옴

        for (let key in plan) {
            if (plan.hasOwnProperty(key) && key !== 'lodgingAddresses' && typeof plan[key] === 'object') {
                days.push({
                    ...plan[key],
                    dayIndex: key,  // 일자 인덱스 추가
                    activeMapIndex: false, // 각 day에 대한 지도 상태 추가
                });
            }
        }
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

    // 지도 초기화 및 개별 경로 표시
    function renderIndividualRoutes(mapId, coordinates) {
        const mapContainer = document.getElementById(`map-${mapId}`);
        mapContainer.style.display = 'block'; // 지도를 표시

        const map = new google.maps.Map(mapContainer, {
            center: coordinates[0],
            zoom: 12,
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            polylineOptions: {
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
            },
        });

        // 경로 요청 및 렌더링
        const request = {
            origin: new google.maps.LatLng(coordinates[0][0], coordinates[0][1]),
            destination: new google.maps.LatLng(coordinates[1][0], coordinates[1][1]),
            travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                console.error("경로 계산 오류:", status);
            }
        });

        // 지도 객체 저장 (선택 사항)
        maps[mapId] = map;
    }


    function toggleMap(dayIndex, spotIndex) {
        const day = days[dayIndex]; // 클릭된 day 객체
        const mapContainer = document.getElementById(`map-${dayIndex}-${spotIndex}`);

        // `activeSpotMapIndices` 배열 초기화
        if (!day.activeSpotMapIndices) {
            day.activeSpotMapIndices = [];
        }

        // 특정 spot의 지도 상태 토글
        day.activeSpotMapIndices[spotIndex] = !day.activeSpotMapIndices[spotIndex];

        if (day.activeSpotMapIndices[spotIndex]) {
            // 지도 보이기 및 경로 표시
            mapContainer.style.display = 'block';

            // 정렬된 좌표를 가져옴
            const coordinates = day.coordinates.slice(spotIndex, spotIndex + 2);

            // 경로 렌더링
            if (coordinates.length === 2) {
                renderIndividualRoutes(`${dayIndex}-${spotIndex}`, coordinates);
            } else {
                console.warn("경로를 표시할 충분한 좌표가 없습니다.");
            }
        } else {
            // 지도 숨기기
            mapContainer.style.display = 'none';
        }
    }


    // 숙소 주소로 좌표를 가져오는 함수
    async function fetchLodgingCoordinates(address) {
        const apiKey = 'AIzaSyCCWBl67f6O1BeZ69lCnWFgOhkgbMNkS64'; // Google API 키 입력
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
            
            const sortedCoords = optimalTour.reverse().map(index => coords[index]);
            console.log(`Day ${day.dayIndex} - 최적 경로 정렬된 좌표:`, sortedCoords);
            // 새로운 배열로 업데이트
            day.selectedSpots = [...sortedSpots]; // 새 배열로 교체
            day.coordinates = [...sortedCoords];
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

    // 지도 데이터를 준비
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

                // 각 관광지 간의 경로 표시
                day.coordinates = coordinates;

                console.log(`Day ${day.dayIndex} - 관광지 간 개별 경로:`, day.coordinates);
            }
        }
    }

    // 페이지 로드 시 경로 준비
    onMount(async () => {
        await getLodgingCoordinatesForAllDays();
        await optimizeAllRoutes();
        await prepareMaps();
    });
</script>

<style>
    .container {
        margin: 20px;
    }
    .day-container {
        margin-bottom: 20px;
    }
    .map-container {
        height: 400px;
        width: 100%;
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
                    {#each day.selectedSpots as spot, spotIndex (spot)}
                        <li>
                            <div>{spot}</div>
                            <!-- 개별 spot 경로 표시 버튼 -->
                            {#if spotIndex < day.selectedSpots.length - 1}
                            <button 
                                type="button" 
                                class="route-button" 
                                on:click={() => toggleMap(dayIndex, spotIndex)}
                            > 경로
                            </button>
                            {/if}
                            <div 
                                id={`map-${dayIndex}-${spotIndex}`} 
                                class="map-container" 
                                style="display: none;">
                            </div>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>선택된 관광지가 없습니다.</p>
            {/if}
        </div>
    {/each}

</div>