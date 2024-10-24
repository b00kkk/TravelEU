const urlParams = new URLSearchParams(window.location.search);
const startDate = urlParams.get('startDate');
const endDate = urlParams.get('endDate');

function displaySections() {
    // startDate 및 endDate를 필요한대로 사용
    console.log('시작 날짜:', startDate);
    console.log('종료 날짜:', endDate);

    // 날짜에 기반한 섹션을 표시하는 논리를 구현
}
document.getElementById('startDate').innerText += ' ' + startDate;
document.getElementById('endDate').innerText += ' ' + endDate;

// 페이지 로드 시 displaySections 함수 호출
window.onload = displaySections;

function showInformation(infoId) {
    // 모든 정보를 감춤
    hideAllInformation();

    // 클릭한 버튼에 해당하는 정보만 표시
    document.getElementById(infoId).style.display = 'block';
}

function hideAllInformation() {
    // 모든 정보를 감춤
    var allInformation = document.querySelectorAll('.icon');
    for (var i = 0; i < allInformation.length; i++) {
        allInformation[i].style.display = 'none';
    }
}
