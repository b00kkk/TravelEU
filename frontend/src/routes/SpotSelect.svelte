<script>
    import { onMount } from 'svelte';
    import { tripDuration } from '../lib/store'; 
    import { fetchSpots } from '../lib/api';
    import { push } from 'svelte-spa-router';

    // 국가 및 지역 데이터 설정
    let countries = [
        "스페인", "영국", "독일", "네덜란드", "프랑스", 
        "포르투갈", "덴마크", "벨기에", "오스트리아", 
        "이탈리아", "스위스", "체코"
    ];
    
    let selectedCountry = ""; // 선택한 나라
    let selectedRegion = ""; // 선택한 지역
    let regions = []; // 지역 리스트
    let spots = []; // 관광지 리스트
    let selectedSpots = []; // 선택된 관광지 리스트

    // 각 나라별 지역 데이터
    const countryRegions = {
        "스페인": ["바르셀로나", "마드리드", "세비야", "팔마마요르카", "그라나다"],
        "영국": ["런던", "맨체스터", "버밍엄", "에든버러"],
        "독일": ["베를린", "뮌헨", "프랑크푸르트", "함부르크"],
        "네덜란드": ["암스테르담"],
        "프랑스": ["파리", "리옹", "마르세유", "니스"],
        "포르투갈": ["리스본", "포르토"],
        "덴마크": ["코펜하겐", "오덴세"],
        "벨기에": ["브뤼셀"],
        "오스트리아": ["비엔나", "잘츠부르크"],
        "이탈리아": ["로마", "밀라노", "피렌체", "베니스", "나폴리"],
        "스위스": ["취리히", "제네바", "인터라켄"],
        "체코": ["프라하"]
    };

    // 여행 일수에 맞게 선택된 관광지 초기화
    tripDuration.subscribe(value => {
        selectedSpots = []; 
    });

    // 선택된 나라에 따른 지역 업데이트
    function updateRegions(event) {
        selectedCountry = event.target.value;
        selectedRegion = ""; // 지역 초기화
        regions = countryRegions[selectedCountry] || []; // 선택된 나라의 지역 리스트
        spots = []; // 관광지 리스트 초기화
    }

    // 선택된 지역에 따른 관광지 데이터 가져오기
    async function fetchSpotsData() {
        if (selectedRegion) {
            try {
                const data = await fetchSpots(selectedRegion); // 비동기 호출
                console.log('Data fetched:', data); // 데이터 확인
                spots = data; // 관광지 데이터 저장
            } catch (error) {
                console.error("Error fetching spots:", error);
                spots = []; // 오류 발생 시 관광지 리스트 초기화
                alert("관광지 데이터를 가져오는 데 오류가 발생했습니다.");
            }
        } else {
            spots = []; // 지역이 선택되지 않은 경우 초기화
        }
    }

    // 선택된 관광지 처리 및 다음 페이지로 이동
    function handleSubmit() {
        console.log("선택된 관광지:", selectedSpots);
        push("/next-page"); // 다음 페이지로 이동
    }

    // 체크박스 상태 변경 처리
    function toggleSpot(spot) {
        if (selectedSpots.includes(spot)) {
            selectedSpots = selectedSpots.filter(s => s !== spot); // 이미 선택된 경우 제거
        } else {
            selectedSpots.push(spot); // 선택되지 않은 경우 추가
        }
    }
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
    }

    .country-selection, .region-selection {
        width: 100%;
        max-width: 400px;
        margin: 15px 0;
    }

    .label {
        font-weight: bold;
    }

    .spot-selection {
        max-height: 200px; /* 높이 제한 */
        overflow-y: auto; /* 세로 스크롤 가능 */
        border: 1px solid #ccc; /* 테두리 */
        border-radius: 4px; /* 모서리 둥글게 */
        padding: 10px; /* 패딩 */
        margin-top: 10px; /* 상단 여백 */
    }

    button {
        margin-top: 20px;
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }

    .selected-spots {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
    }
</style>

<div class="container">
    <h3>관광지 선택</h3>

    <div class="country-selection">
        <label for="country" class="label">방문할 나라 선택</label>
        <select id="country" on:change={updateRegions}>
            <option value="" disabled selected>나라 선택</option>
            {#each countries as country}
                <option value={country}>{country}</option>
            {/each}
        </select>
    </div>

    {#if selectedCountry}
    <div class="region-selection">
        <label for="region" class="label">지역 선택</label>
        <select id="region" on:change={(e) => { selectedRegion = e.target.value; fetchSpotsData(); }}>
            <option value="" disabled selected>지역 선택</option>
            {#each regions as region}
                <option value={region}>{region}</option>
            {/each}
        </select>
    </div>
    {/if}

    {#if selectedRegion}
    <div class="spot-selection">
        <label for="spot" class="label">관광지 선택</label>
        {#each spots as spot}
            <div>
                <input 
                    type="checkbox" 
                    id={spot.attraction_name} 
                    value={spot.attraction_name} 
                    on:change={() => toggleSpot(spot.attraction_name)} 
                />
                <label for={spot.attraction_name}>{spot.attraction_name}</label>
            </div>
        {/each}
    </div>
    {/if}

    {#if selectedSpots.length > 0}
        <div class="selected-spots">
            <h4>선택된 관광지:</h4>
            <ul>
                {#each selectedSpots as spot}
                    <li>{spot}</li>
                {/each}
            </ul>
        </div>
    {/if}

    <button on:click={handleSubmit}>제출</button>
</div>
