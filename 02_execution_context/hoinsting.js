/**
 * @fileoverview 호이스팅(Hoisting) 기본 및 심화 개념
 *
 * @description
 * 호이스팅은 JavaScript 엔진이 코드를 실행하기 전에 변수 및 함수 선언을
 * 해당 스코프의 최상단으로 끌어올리는 것처럼 동작하는 방식을 의미합니다.
 * 이로 인해 선언되기 전에 변수나 함수를 참조할 수 있게 됩니다.
 *
 * @concepts
 * **변수 호이스팅 (Variable Hoisting)**
 * `var`: 선언이 스코프 최상단으로 끌어올려지고 `undefined`로 초기화됩니다.
 * 이로 인해 선언 전에 참조해도 에러가 발생하지 않고 `undefined`가 반환됩니다.
 * `let`, `const`: 선언이 스코프 최상단으로 끌어올려지지만, 초기화는 실제 코드 줄에서 이루어집니다.
 * 선언과 초기화 사이의 영역을 '일시적 사각지대(TDZ, Temporal Dead Zone)'라고 하며,
 * 이 영역에서 변수에 접근하면 `ReferenceError`가 발생합니다.
 *
 * **함수 호이스팅 (Function Hoisting)**
 * 함수 선언문 (Function Declaration): 함수 전체(선언과 구현 모두)가 호이스팅됩니다.
 * 따라서 함수가 선언되기 전에도 호출할 수 있습니다.
 * 함수 표현식 (Function Expression): 변수 호이스팅 규칙을 따릅니다.
 * `var`로 할당하면 변수는 `undefined`로 호이스팅되고, `let`/`const`로 할당하면 TDZ의 영향을 받습니다.
 * 따라서 함수 표현식은 선언된 이후에만 호출할 수 있습니다.
 *
 * @best_practices
 * `var` 대신 `let`과 `const`를 사용하여 TDZ의 이점을 활용하고, 변수 스코프를 블록 레벨로 제한합니다.
 * 함수는 사용하기 전에 선언하는 것을 원칙으로 하여 코드의 가독성을 높입니다.
 * 호이스팅에 의존하는 코드 패턴보다는, 논리적 흐름에 따라 코드를 작성하는 것이 좋습니다.
 */

// -------------------------- 예제 1: 변수 호이스팅과 스코프 --------------------------
var a = 1;
function outer() {
  function inner() {
    console.log(a); // undefined
    var a = 3;
  }
  inner();
  console.log(a); // 1
}
outer();
console.log(a); // 1

/**
 * @explanation
 * `inner` 함수 내부에서 `var a = 3;`이 선언되었습니다.
 * 호이스팅에 의해 `inner` 함수의 최상단에는 `var a;`가 선언된 것처럼 동작합니다.
 * 따라서 `console.log(a)` 시점에는 `a`가 `undefined`로 초기화된 상태입니다.
 * `inner` 함수가 종료된 후 `outer` 함수에서 `console.log(a)`를 호출하면,
 * `outer` 스코프에서는 `a`가 선언된 적이 없으므로 상위 스코프(전역)의 `a` 값인 1이 출력됩니다.
 */

// -------------------------- 예제 2: 함수 선언과 변수 선언의 호이스팅 순서 --------------------------
function hoistingTest() {
  console.log(b); // (1) [Function: b]
  var b = "bbb"; // 변수 선언
  console.log(b); // (2) 'bbb'
  function b() {} // 함수 선언
  console.log(b); // (3) 'bbb'
}
hoistingTest();

/**
 * @explanation
 * JavaScript 엔진은 함수 선언을 변수 선언보다 먼저 처리합니다.
 * 1. `function b() {}`가 호이스팅되어 `b`는 함수로 정의됩니다.
 * 2. `var b;`가 호이스팅되지만, 이미 `b`가 함수로 선언되었으므로 이 구문은 무시됩니다.
 *
 * 실행 시점:
 * (1) `console.log(b)`: 호이스팅된 함수 `b`가 출력됩니다.
 * (2) `b = 'bbb'`: `b`에 문자열 'bbb'가 할당됩니다.
 * (3) `console.log(b)`: `b`의 값은 'bbb'이므로 'bbb'가 출력됩니다.
 */

// -------------------------- 예제 3: 함수 선언문과 함수 표현식의 차이 --------------------------
console.log(sum(1, 2)); // 3
// console.log(multiply(3, 4)); // TypeError: multiply is not a function

function sum(a, b) {
  // 함수 선언문: 전체가 호이스팅됩니다.
  return a + b;
}

var multiply = (a, b) => {
  // 함수 표현식: 변수 선언만 호이스팅됩니다.
  return a * b;
};

/**
 * @explanation
 * `sum`은 함수 선언문이므로 전체 코드가 호이스팅되어 선언 전에 호출할 수 있습니다.
 * `multiply`는 함수 표현식으로, 변수 `multiply`의 선언만 호이스팅되고 `undefined`로 초기화됩니다.
 * 따라서 `multiply`를 호출하는 시점에는 아직 함수가 할당되지 않았으므로 `TypeError`가 발생합니다.
 */

// -------------------------- 예제 4: 중복된 함수 선언 --------------------------
console.log(sum2(3, 4)); // "3 + 4 = 7"

function sum2(x, y) {
  return x + y;
}

var a2 = sum2(1, 2);
console.log(a2); // "1 + 2 = 3"

function sum2(x, y) {
  return x + " + " + y + " = " + (x + y);
}

var c2 = sum2(1, 2);
console.log(c2); // "1 + 2 = 3"

/**
 * @explanation
 * 동일한 이름의 함수 선언문이 여러 개 있을 경우, 가장 마지막에 선언된 함수가 이전 함수들을 덮어씁니다.
 * 호이스팅 단계에서 `sum2`는 두 번째 정의(문자열을 반환하는 함수)로 결정됩니다.
 * 따라서 코드 전체에서 `sum2`를 호출하면 항상 마지막에 정의된 함수가 실행됩니다.
 */
