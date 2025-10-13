/**
 * 5-1. 클로저의 의미 및 원리 이해
 *
 * 클로저(Closure)는 함수와 그 함수가 선언된 렉시컬 환경(Lexical Environment)의 조합입니다.
 * 외부 함수의 실행이 종료된 후에도 내부 함수가 외부 함수의 변수에 접근할 수 있는 특성을 말합니다.
 *
 * 아래 예제에서 outer 함수는 실행이 끝났지만,
 * inner 함수는 여전히 outer의 지역변수 a에 접근할 수 있습니다.
 */

console.log("=== 5-1. 클로저의 기본 원리 ===");

var outer = () => {
  var a = 1;
  var inner = () => ++a;
  return inner;
};

var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3

console.log("=========================");
