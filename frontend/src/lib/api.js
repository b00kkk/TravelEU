import qs from "qs";

// FastAPI 호출 함수
const fastapi = async (operation, url, params) => {
    let method = operation;
    let content_type = 'application/json';
    let body = JSON.stringify(params);

    if (operation === 'login') {
        method = 'post';
        content_type = 'application/x-www-form-urlencoded';
        body = qs.stringify(params);
    }

    let _url = import.meta.env.VITE_SERVER_URL + url;
    if (method === 'get') {
        _url += "?" + new URLSearchParams(params);
    }

    let options = {
        method: method,
        headers: {
            "Content-Type": content_type
        }
    };

    if (method !== 'get') {
        options.body = body;
    }

    console.log(`Fetching ${_url} with method ${method} and body: ${body}`);

    try {
        const response = await fetch(_url, options);
        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        console.log('응답 데이터 파싱 완료:', json);
        return json; // 성공 시 JSON 데이터 반환
    } catch (error) {
        alert(JSON.stringify(error));
        throw error; // 오류 발생 시 다시 던져서 처리 가능
    }
};



// 모든 관광지 정보를 가져오는 함수
export const fetchSpots = async (region) => {
    const params = { location_id: region };
    try {
        const response = await fastapi('get', '/api/spot/spots', params);
        console.log('Response from fetchSpots:', response); // 응답 확인
        return response; // 비동기 호출
    } catch (error) {
        console.error('Error in fetchSpots:', error);
        throw error; // 오류 발생 시 다시 던져서 처리 가능
    }
};


export const fetchRecommendedSpots = async (region, gender, age, relationship) => {
    try {
        console.log(`Request URL: ${import.meta.env.VITE_SERVER_URL}/api/spot/recommended?region=${region}&gender=${gender}&age=${age}&relationship=${relationship}`);
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/spot/recommended?region=${region}&gender=${gender}&age=${age}&relationship=${relationship}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recommended spots');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recommended spots:', error);
        throw error;
    }
};

export async function fetchSpotsCoordinates(spots) {
    console.log("API 호출 URL:", 'http://localhost:8000/api/spot/coordinates'); // URL 확인

    const response = await fetch('http://localhost:8000/api/spot/coordinates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spots),
    });

    if (!response.ok) {
        console.error(`Error fetching coordinates: ${response.status} - ${response.statusText}`);
        throw new Error('Failed to fetch spot coordinates');
    }

    return await response.json();
}

export default fastapi;
