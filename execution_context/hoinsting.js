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

// =================================================================
// কোর 자바스크립트 예제 기반 호이스팅 학습 (70%)
// =================================================================

console.log("### 1. 변수와 함수 선언의 호이스팅 ###");
// 'Core JavaScript' 2-5, 2-6 예제 기반
function hoistingTest1() {
  console.log(myVar); // undefined: var 변수는 선언만 호이스팅되고 undefined로 초기화됩니다.
  console.log(myFunc); // [Function: myFunc]: 함수 선언문은 전체가 호이스팅됩니다.

  var myVar = "Hello, Hoisting!";
  function myFunc() {
    return "Function has been hoisted.";
  }

  console.log(myVar); // 'Hello, Hoisting!': 할당 이후의 값
  console.log(myFunc()); // 'Function has been hoisted.': 함수 실행 결과
}
hoistingTest1();
console.log("\n");

// -----------------------------------------------------------------

console.log("### 2. 함수 선언문 vs. 함수 표현식 ###");
// 'Core JavaScript' 2-9 예제 기반
// 함수 선언문은 호이스팅되어 어디서든 호출 가능합니다.
console.log(sum(5, 5)); // 10

function sum(a, b) {
  return a + b;
}

// 함수 표현식은 변수 호이스팅 규칙을 따릅니다.
// 아래 코드는 TypeError를 발생시킵니다. (multiply is not a function)
try {
  console.log(multiply(5, 5));
} catch (e) {
  console.log(e.message); // multiply is not a function
}

var multiply = (a, b) => a * b;

console.log(multiply(5, 5)); // 25: 할당된 이후에는 정상적으로 호출 가능합니다.
console.log("\n");

// -----------------------------------------------------------------

console.log("### 3. 중첩 스코프와 호이스팅 ###");
// 'Core JavaScript' 2-1 예제 기반
var a = "Global";
function outer() {
  console.log(a); // undefined: outer 스코프 내에서 'a'가 호이스팅되었기 때문입니다.
  var a = "Outer";

  function inner() {
    console.log(a); // undefined: inner 스코프 내에서 'a'가 호이스팅되었기 때문입니다.
    var a = "Inner";
    console.log(a); // 'Inner'
  }

  inner();
  console.log(a); // 'Outer'
}
outer();
console.log(a); // 'Global'
console.log("\n");

// -----------------------------------------------------------------

console.log("### 4. 동일한 이름의 변수와 함수 선언 ###");
// 'Core JavaScript' 2-11 예제 기반
// 함수 선언이 변수 선언보다 호이스팅 우선순위가 높습니다.
// 또한, 동일한 이름의 함수가 여러 번 선언되면 마지막 선언이 이전 선언을 덮어씁니다.

console.log(redeclaredFunc(10, 2)); // "10 + 2 = 12"

function redeclaredFunc(x, y) {
  return x * y;
}

// 이 함수 선언이 위의 함수를 덮어씁니다.
function redeclaredFunc(x, y) {
  return `${x} + ${y} = ${x + y}`;
}

var result = redeclaredFunc(5, 3);
console.log(result); // "5 + 3 = 8"
console.log("\n");

// =================================================================
// 실무 활용 및 함정 피하기 (30%)
// =================================================================

console.log("### 5. 실무 예제: 설정 정보 로딩 ###");
// 문제 상황: 조건에 따라 설정 값이 달라질 때 var를 사용하면 예측과 다른 결과가 나올 수 있습니다.
function loadConfig(isProduction) {
  console.log(`[Before] API 서버: ${apiServer}`); // undefined

  if (isProduction) {
    var apiServer = "https://api.proddomain.com";
  } else {
    var apiServer = "https://api.devdomain.com";
  }

  // var는 함수 스코프이므로 if 블록 밖에서도 접근 가능합니다.
  console.log(`[After] API 서버: ${apiServer}`);
  return apiServer;
}
loadConfig(false); // dev 서버 주소 출력
loadConfig(true); // prod 서버 주소 출력
console.log("\n");

// 개선안: let/const를 사용하여 블록 스코프를 명확히 합니다.
function loadConfigWithLet(isProduction) {
  let apiServer; // 선언을 먼저 합니다.
  // console.log(apiServer); // TDZ에 의해 ReferenceError 발생 (만약 접근 시)

  if (isProduction) {
    apiServer = "https://api.proddomain.com";
  } else {
    apiServer = "https://api.devdomain.com";
  }
  console.log(`[Let] API 서버: ${apiServer}`);
  return apiServer;
}
loadConfigWithLet(false);
console.log("\n");

// -----------------------------------------------------------------

console.log("### 6. 실무 예제: 가독성을 위한 함수 배치 ###");
// 좋은 패턴: 주요 실행 함수를 상단에 배치하고, 세부 구현 함수를 하단에 배치하여 가독성을 높입니다.
function initializeSystem() {
  console.log("시스템 초기화를 시작합니다.");

  // 함수 호이스팅 덕분에 세부 함수들을 먼저 호출할 수 있습니다.
  connectToDatabase();
  loadInitialData();
  startServer();

  console.log("시스템 초기화가 완료되었습니다.");

  // --- 세부 구현 함수들 ---
  function connectToDatabase() {
    console.log("  - 데이터베이스에 연결합니다...");
  }

  function loadInitialData() {
    console.log("  - 초기 데이터를 로드합니다...");
  }

  function startServer() {
    console.log("  - 서버를 시작합니다...");
  }
}
initializeSystem();
console.log("\n");

// -----------------------------------------------------------------

console.log("### 7. 실무 함정: 반복문과 클로저 ###");
// var를 사용한 반복문에서 클로저를 생성할 때 발생하는 흔한 문제입니다.
function createEventHandlers() {
  const handlers = [];
  for (var i = 0; i < 3; i++) {
    // for 루프가 끝난 시점의 i(값: 3)를 참조하게 됩니다.
    handlers.push(() => {
      console.log(`버튼 ${i} 클릭됨`);
    });
  }
  return handlers;
}

const handlers = createEventHandlers();
console.log("var를 사용한 이벤트 핸들러 실행:");
handlers[0](); // 버튼 3 클릭됨
handlers[1](); // 버튼 3 클릭됨
handlers[2](); // 버튼 3 클릭됨

// 개선안: let을 사용하면 블록 스코프를 가지므로 각 반복마다 새로운 i 변수가 생성됩니다.
function createEventHandlersWithLet() {
  const handlers = [];
  for (let i = 0; i < 3; i++) {
    // 각 반복의 i 값이 클로저에 올바르게 저장됩니다.
    handlers.push(() => {
      console.log(`버튼 ${i} 클릭됨`);
    });
  }
  return handlers;
}

const letHandlers = createEventHandlersWithLet();
console.log("\nlet을 사용한 이벤트 핸들러 실행:");
letHandlers[0](); // 버튼 0 클릭됨
letHandlers[1](); // 버튼 1 클릭됨
letHandlers[2](); // 버튼 2 클릭됨
