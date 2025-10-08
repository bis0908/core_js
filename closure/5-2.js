/**
 * 5-2. 클로저와 메모리 관리
 *
 * 클로저는 외부 함수의 변수를 참조하기 때문에 메모리를 차지합니다.
 * 더 이상 클로저가 필요없을 때는 참조를 끊어 가비지 컬렉션이 동작하도록 해야 합니다.
 *
 * 식별자에 null을 할당하면 해당 함수의 참조가 끊기고,
 * 더 이상 접근할 수 없게 되어 메모리에서 해제됩니다.
 */

console.log("=== 5-2. 클로저의 메모리 관리 ===");

var outer = (function() {
  var a = 1;
  var inner = function() {
    return ++a;
  };
  return inner;
})();

console.log(outer()); // 2
console.log(outer()); // 3

// 클로저 사용이 끝났으므로 참조를 끊어 메모리 해제
outer = null;

console.log("=========================");
