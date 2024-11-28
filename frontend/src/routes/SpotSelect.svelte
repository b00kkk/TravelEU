<script>
    import { onMount } from 'svelte';
    import { tripDuration, surveyData } from '../lib/store'; 
    import { fetchSpots, fetchRecommendedSpots} from '../lib/api';
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

    // 여행 일수 설정
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

    // 설문 데이터 구독
    surveyData.subscribe(value => {
        travelFor = value.travelFor;
        age = value.age;
        gender = value.gender;
    });

    // 나라 선택 시 지역 데이터 업데이트
    function updateRegions(index, event) {
        selectedCountries[index].selectedCountry = event.target.value;
        selectedCountries[index].selectedRegion = "";
        selectedCountries[index].regions = countryRegions[selectedCountries[index].selectedCountry] || [];
        selectedCountries[index].spots = []; // 관광지 초기화
        selectedCountries[index].recommendedSpots=[];
    }


    // 모든 관광지 데이터 가져오기
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
                console.log(`Data fetched for day ${index + 1}:`, data);
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

    // 관광지 선택 토글 처리
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

    // 선택된 관광지 및 제출 처리
    function handleSubmit() {
        console.log("선택된 관광지 정보:", selectedCountries);
        push("/next-page");
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

    .recommended-spot-selection, .spot-selection {
        max-height: 200px; /* 높이 제한 */
        overflow-y: auto; /* 세로 스크롤 가능 */
        border: 1px solid #ccc; /* 테두리 */
        border-radius: 4px; /* 모서리 둥글게 */
        padding: 10px; /* 패딩 */
        margin-top: 10px; /* 상단 여백 */
    }

    button {
        margin-left: 10px;
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
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
    <h3>여행 계획을 세워보세요</h3>
    {#each selectedCountries as day, index}
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
            <!-- 추천 관광지 -->
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
                            <button on:click={() => openInGoogleMaps(day.selectedRegion, spot.attraction_name)}>더보기</button>
                        </div>
                    {/each}
                {:else}
                    <p>추천 관광지가 없습니다.</p>
                {/if}
            </div>

            <!-- 일반 관광지 -->
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
                        <button on:click={() => openInGoogleMaps(day.selectedRegion, spot.attraction_name)}>더보기</button>
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
    {/each}

    <button on:click={handleSubmit}>제출</button>
</div>
