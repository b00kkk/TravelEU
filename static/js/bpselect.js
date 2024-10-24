document.addEventListener('DOMContentLoaded', function () {

  // middle-panel에 대한 클릭 이벤트 리스너 등록
  var middlePanelLink = document.querySelector('.middle-panel a');
  middlePanelLink.addEventListener('click', function (event) {
    event.preventDefault()

    var panelId = middlePanelLink.getAttribute('href').substring(1);

    // 모든 패널을 숨기고 필요한 패널만 표시
    hideAllPanels();
    document.getElementById(panelId).style.display = 'block';

    // left-panel 숨기는 함수 호출
    hideLeftPanel();
  });
  
});


function updateAttractionNames(attractionNames) {
  // 가져온 ATTRACTION_NAME을 UI에 적용
  var attractionList = $('.attraction-dropdown');
  attractionList.empty();  // 기존 목록 비우기

  for (var i = 0; i < attractionNames.length; i++) {
      var attraction = attractionNames[i];
      var listItem = $('<li id="menu-item-has-children dropdown">');
      var link = $('<a href="#" class="dropdown-toggle" onclick="togglePanel(\'rightrightpanel\'), moveTorightrightpanel()" aria-haspopup="true" aria-expanded="false">')
          .text(attraction)
          .appendTo(listItem);

      var closeButton = $('<button type="button" onclick="moveTomiddlerightpanelfranceparis()">x</button>');
      listItem.append(closeButton);

      listItem.appendTo(attractionList);
  }
}

function handleAttractionClick(attraction) {
  // 클릭한 관광지에 대한 처리를 여기에 추가해
  console.log('Clicked on attraction:', attraction);
}

function togglePanel(panelId) {
  // Hide all panels
  $(".left-panel, .middle-panel").hide();

  // Show the specified panel
  $("#" + panelId).show();
}

function hideLeftPanel() {
  // left-panel 숨기는 코드를 여기에 추가
  var leftPanel = document.getElementById('left-panel');
  leftPanel.style.display = 'none';
}

function hideAllPanels() {
  // Hide all panels by setting their display property to 'none'
  var panels = document.getElementsByClassName('middlerightpanel, rightpanel');
  for (var i = 0; i < panels.length; i++) {
    panels[i].style.display = 'none';
  }

  // Hide the current middle panel if exists
  if (currentMiddlePanel) {
    document.getElementById(currentMiddlePanel).style.display = 'none';
  }
}

var currentMiddlePanel = null;

function moveTorightpanelfrancenice() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelfrancenice').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelfrancemarse() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelfrancemarse').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpaneluklondon() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpaneluklondon').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelukedin() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelukedin').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelukman() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelukman').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelukbirming() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelukbirming').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelspainbarce() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelspainbarce').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelspainmajor() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelspainmajor').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelspaingranada() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelspaingranada').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelgerfrank() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelgerfrank').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelgermun() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelgermun').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelgerberl() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelgerberl').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelgerham() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelgerham').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelptlis() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelptlis').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelptporto() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelptporto').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpaneldenco() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpaneldenco').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpaneldenoden() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpaneldenoden').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelbelbre() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelbelbre').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelndarms() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelndarms').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelaustbin() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelaustbin').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelauszar() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelauszar').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelitalyroma() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelitalyroma').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanel() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelitalypiren').querySelector('ul');
  italypiren
  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelitarybenis() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelitarybenis').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelitalynapoli() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelitalynapoli').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelswisschi() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelswisschi').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelswissinter() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelswissinter').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelswissjeneba() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelswissjeneba').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelczepra() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelczepra').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelfrancenice() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelfrancenice').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelfrancemarse() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelfrancemarse').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpaneluklondon() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpaneluklondon').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelukedin() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelukedin').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelukman() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelukman').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelukbirming() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelukbirming').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelspainbarce() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelspainbarce').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelspainmajor() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelspainmajor').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelspaingranada() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelspaingranada').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelgerfrank() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelgerfrank').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelgermun() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelgermun').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelgerberl() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelgerberl').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelgerham() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelgerham').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelptlis() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelptlis').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelptporto() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelptporto').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpaneldenco() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpaneldenco').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpaneldenoden() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpaneldenoden').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelbelbre() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelbelbre').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelndarms() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelndarms').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelaustbin() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelaustbin').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelauszar() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelauszar').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelitalyroma() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelitalyroma').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanel() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelitalypiren').querySelector('ul');
  italypiren
  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelitarybenis() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelitarybenis').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelitalynapoli() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelitalynapoli').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelswisschi() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelswisschi').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelswissinter() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelswissinter').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelswissjeneba() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelswissjeneba').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelczepra() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelczepra').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightrightpanel() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightrightpanel').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelfranceparis() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelfranceparis').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelfranceriox() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelfranceriox').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelspainmardrid() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelspainmardrid').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanelspainsevia() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanelspainsevia').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTorightpanel() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('rightpanel').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelfranceparis() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelfranceparis').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelfranceriox() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelfranceriox').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelspainmardrid() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelspainmardrid').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelspainsevia() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelspainsevia').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelfrancenice() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelfrancenice').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelfrancemarse() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelfrancemarse').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpaneluklondon() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpaneluklondon').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelukedin() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelukedin').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelukman() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelukman').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelukbirming() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelukbirming').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelspainbarce() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelspainbarce').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelspainmajor() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelspainmajor').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelspaingranada() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelspaingranada').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelgerfrank() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelgerfrank').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelgermun() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelgermun').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelgerberl() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelgerberl').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelgerham() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelgerham').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelptlis() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelptlis').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelptporto() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelptporto').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpaneldenco() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpaneldenco').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpaneldenoden() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpaneldenoden').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelbelbre() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelbelbre').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelndarms() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelndarms').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelaustbin() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelaustbin').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelauszar() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelauszar').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelitalyroma() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelitalyroma').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanel() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelitalypiren').querySelector('ul');
  italypiren
  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelitarybenis() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelitarybenis').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelitalynapoli() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelitalynapoli').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelswisschi() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelswisschi').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelswissinter() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelswissinter').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelswissjeneba() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelswissjeneba').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanelczepra() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanelczepra').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
function moveTomiddlerightpanel() {
  // 이동시킬 li 요소 가져오기
  var itemToMove = event.target.parentElement;

  // 이동할 대상 section 가져오기
  var targetSection = document.getElementById('middlerightpanel').querySelector('ul');

  // li를 새로운 위치로 이동시키기
  targetSection.appendChild(itemToMove);
}
