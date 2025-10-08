/**
 * 실무 예제 2: 이벤트 핸들러 상태 관리
 *
 * 클로저를 사용하여 이벤트 핸들러가 자신만의 상태를 유지하도록 만듭니다.
 * 각 버튼이나 UI 요소가 독립적인 상태를 가질 수 있습니다.
 *
 * React의 useState Hook이나 Vue의 ref가 내부적으로 사용하는 패턴입니다.
 */

console.log("=== 실무 예제 2: 이벤트 핸들러 상태 관리 ===");

var createToggleButton = function(initialText, toggledText) {
  var isToggled = false; // private 상태

  return function(button) {
    button.innerText = initialText;

    button.addEventListener("click", function() {
      isToggled = !isToggled;
      button.innerText = isToggled ? toggledText : initialText;
      button.style.backgroundColor = isToggled ? "#4CAF50" : "#f44336";
      console.log("버튼 상태:", isToggled ? "켜짐" : "꺼짐");
    });
  };
};

var createCounter = function(startValue) {
  var count = startValue || 0; // private 카운터

  return function(button) {
    button.innerText = "클릭 횟수: " + count;

    button.addEventListener("click", function() {
      count++;
      button.innerText = "클릭 횟수: " + count;
      console.log("현재 카운트:", count);
    });
  };
};

// 사용 예시
var button1 = document.createElement("button");
var button2 = document.createElement("button");

var setupToggle = createToggleButton("다크모드 ON", "다크모드 OFF");
var setupCounter = createCounter(0);

setupToggle(button1);
setupCounter(button2);

document.body.appendChild(button1);
document.body.appendChild(button2);

console.log("=========================");
