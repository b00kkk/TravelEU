<head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
</head>

<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { tripDuration, surveyData, selectedPlan } from '../lib/store';
    import { fetchSpots, fetchRecommendedSpots } from '../lib/api';
    import { push } from 'svelte-spa-router';

    let countries = [
        "스페인", "영국", "독일", "네덜란드", "프랑스", 
        "포르투갈", "덴마크", "벨기에", "오스트리아", 
        "이탈리아", "스위스", "체코"
    ];

    let tripDays = 0;
    let selectedCountries = [];

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

    let travelFor = 0;
    let age = 0;
    let gender = 0;

    tripDuration.subscribe(value => {
        tripDays = value;
        selectedCountries = Array.from({ length: tripDays }, () => ({
            selectedCountry: "",
            selectedRegion: "",
            regions: [],
            spots: [],
            selectedSpots: []
        }));
    });

    surveyData.subscribe(value => {
        travelFor = value.travelFor;
        age = value.age;
        gender = value.gender;
    });

    function updateRegions(index, event) {
        selectedCountries[index].selectedCountry = event.target.value;
        selectedCountries[index].selectedRegion = "";
        selectedCountries[index].regions = countryRegions[selectedCountries[index].selectedCountry] || [];
        selectedCountries[index].spots = [];
        selectedCountries[index].recommendedSpots = [];
    }

    async function fetchSpotsData(index) {
        if (selectedCountries[index].selectedRegion) {
            try {
                const data = await fetchSpots(selectedCountries[index].selectedRegion);
                const recommendedData = await fetchRecommendedSpots(
                    selectedCountries[index].selectedRegion,
                    gender,
                    age,
                    travelFor
                );
                selectedCountries[index].spots = data;
                selectedCountries[index].recommendedSpots = recommendedData;
            } catch (error) {
                console.error("Error fetching spots:", error);
                selectedCountries[index].spots = [];
                alert("관광지 데이터를 가져오는 데 오류가 발생했습니다.");
            }
        } else {
            selectedCountries[index].spots = [];
        }
    }

    function toggleSpot(index, spot) {
        selectedCountries = selectedCountries.map((day, i) => {
            if (i === index) {
                const isSelected = day.selectedSpots.includes(spot);
                return {
                    ...day,
                    selectedSpots: isSelected
                        ? day.selectedSpots.filter(s => s !== spot)
                        : [...day.selectedSpots, spot],
                };
            }
            return day;
        });
    }

    function handleSubmit() {
        // 모든 일자에 대해 최소 하나의 관광지가 선택되었는지 확인
        const allDaysValid = selectedCountries.every(day => day.selectedSpots.length > 0);

        if (allDaysValid) {
            console.log("선택된 관광지 정보:", selectedCountries);
            selectedPlan.set(selectedCountries);
            console.log(selectedPlan);
            push("/lodging");  // 모든 조건이 충족되면 다음 페이지로 이동
        } else {
            alert("모든 일자에 적어도 하나의 관광지를 선택해야 합니다.");
        }
    }

    function getGoogleMapsUrl(region, attractionName) {
        const baseUrl = "https://www.google.com/maps/search/?api=1";
        const query = encodeURIComponent(`${region} ${attractionName}`);
        return `${baseUrl}&query=${query}`;
    }

    function openInGoogleMaps(region, attractionName) {
        const url = getGoogleMapsUrl(region, attractionName);
        window.open(url, '_blank');
    }
</script>

<style>
    /* 전체 컨테이너 스타일 */
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        max-width: 1000px;
        margin: 0 auto;
        border-radius: 8px;
    }

    /* 제목 스타일 */
    h3 {
        color: #1e3a8a;
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: 600;
    }

    /* Day 항목을 가로로 배치 */
    .days-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }

    /* 각 Day 항목 스타일 */
    .day-item {
        flex: 1 1 30%; /* 너비를 30%로 설정하고, 3개 열을 유지 */
        min-width: 250px;
        padding: 15px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-bottom: 15px;
    }

    .country-selection, .region-selection {
        width: 100%;
        max-width: 400px;
        margin: 15px 0;
        background-color: #fff;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 10px;
    }

    .label {
        font-weight: bold;
        color: #1e40af;
        margin-bottom: 5px;
    }

    .recommended-spot-selection, .spot-selection {
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 10px;
        background-color: #fff;
        margin-top: 10px;
    }

    button {
        margin-left: 10px;
        background-color: #3b82f6;
        border: none;
        color: white;
        padding: 8px 15px;
        font-size: 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #2563eb;
    }

    .selected-spots {
        margin-top: 20px;
        padding: 20px;
        border: 2px solid #3b82f6;
        border-radius: 10px;
        background-color: #e0f7ff;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .selected-spots h4 {
        color: #1e40af;
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: 600;
    }

    .selected-spots ul {
        padding-left: 20px;
        list-style-type: none;
    }

    .selected-spots li {
        font-size: 16px;
        color: #3b82f6;
        margin-bottom: 12px;
        position: relative;
        padding-left: 25px;
    }

    .selected-spots li::before {
        content: "\f005";
        font-family: 'Font Awesome 5 Free'; 
        font-weight: 900;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #ff9800;
    }

    input[type="checkbox"] {
        margin-right: 10px;
    }

    label {
        color: #1e3a8a;
    }
</style>

<div class="container">
    <h3>여행 계획을 세워보세요</h3>
    <div class="days-container">
        {#each selectedCountries as day, index}
            <div class="day-item">
                <div class="country-selection">
                    <label for="country-{index}" class="label">Day {index + 1}: 방문할 나라 선택</label>
                    <select id="country-{index}" on:change={(e) => updateRegions(index, e)}>
                        <option value="" disabled selected>나라 선택</option>
                        {#each countries as country}
                            <option value={country}>{country}</option>
                        {/each}
                    </select>
                </div>

                {#if day.selectedCountry}
                <div class="region-selection">
                    <label for="region-{index}" class="label">지역 선택</label>
                    <select id="region-{index}" on:change={(e) => { day.selectedRegion = e.target.value; fetchSpotsData(index); }}>
                        <option value="" disabled selected>지역 선택</option>
                        {#each day.regions as region}
                            <option value={region}>{region}</option>
                        {/each}
                    </select>
                </div>
                {/if}

                {#if day.selectedRegion}
                    <div class="recommended-spot-selection">
                        <label for="recommend-{index}" class="label">추천 관광지</label>
                        {#if day.recommendedSpots.length > 0}
                            {#each day.recommendedSpots as spot}
                                <div>
                                    <input 
                                        type="checkbox" 
                                        id="recommended-{spot.attraction_name}-{index}" 
                                        value={spot.attraction_name} 
                                        on:change={() => toggleSpot(index, spot.attraction_name)} 
                                    />
                                    <label for="recommended-{spot.attraction_name}-{index}">{spot.attraction_name}</label>
                                    <button on:click={() => openInGoogleMaps(day.selectedRegion, spot.attraction_name)}>
                                        <i class="fas fa-arrow-right"></i> <!-- 아이콘만 표시 -->
                                    </button>
                                </div>
                            {/each}
                        {:else}
                            <p>추천 관광지가 없습니다.</p>
                        {/if}
                    </div>

                    <div class="spot-selection">
                        <label for="spot-{index}" class="label">일반 관광지</label>
                        {#each day.spots.filter(spot => 
                            !day.recommendedSpots.some(recommended => recommended.attraction_name === spot.attraction_name)
                        ) as spot}
                            <div>
                                <input 
                                    type="checkbox" 
                                    id="spot-{spot.attraction_name}-{index}" 
                                    value={spot.attraction_name} 
                                    on:change={() => toggleSpot(index, spot.attraction_name)} 
                                />
                                <label for="spot-{spot.attraction_name}-{index}">{spot.attraction_name}</label>
                                <button on:click={() => openInGoogleMaps(day.selectedRegion, spot.attraction_name)}>
                                    <i class="fas fa-arrow-right"></i> <!-- 아이콘만 표시 -->
                                </button>
                            </div>
                        {/each}
                    </div>
                {/if}   

                {#if day.selectedSpots.length > 0}
                    <div class="selected-spots">
                        <h4>선택된 관광지 (Day {index + 1}):</h4>
                        <ul>
                            {#each day.selectedSpots as spot}
                                <li>{spot}</li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <button on:click={handleSubmit}>제출</button>
</div>
