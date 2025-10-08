/**
 * 5-3-1. 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때
 *
 * 콜백 함수에서 외부 변수를 사용할 때 클로저를 활용하면
 * 각 콜백 함수마다 고유한 외부 변수를 유지할 수 있습니다.
 *
 * alertFruitBuilder는 클로저를 반환하는 함수로,
 * 각 과일에 대한 고유한 클로저를 생성하여 이벤트 핸들러로 등록합니다.
 */

console.log("=== 5-3-1. 콜백 함수에서 외부 데이터 사용 ===");

var fruits = ["apple", "banana", "peach"];
var $ul = document.createElement("ul");

var alertFruitBuilder = function(fruit) {
  return function() {
    alert("your choice is " + fruit);
  };
};

fruits.forEach(function(fruit) {
  var $li = document.createElement("li");
  $li.innerText = fruit;
  $li.addEventListener("click", alertFruitBuilder(fruit));
  $ul.appendChild($li);
});

document.body.appendChild($ul);

console.log("=========================");
