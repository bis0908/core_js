// 함수 선언문과 함수 표현식 - 실행 컨텍스트와 호이스팅 관점

/**
 * 함수 선언문 (Function Declaration)
 * - 함수명이 곧 변수명
 * - 전체가 호이스팅됨 (선언과 함수 정의 모두 끌어올려짐)
 * - 함수 선언 전에 호출 가능
 */
console.log("=== 함수 선언문 예제 ===");
console.log(sum(1, 2)); // 3 - 선언 전에 호출 가능
function sum(a, b) {
  console.log("첫번째 sum");

  return a + b;
}
console.log("=========================\n");

/**
 * 익명 함수 표현식 (Anonymous Function Expression)
 * - 변수명이 곧 함수명
 * - 변수 선언부만 호이스팅됨
 * - 할당 전에 호출하면 에러 발생
 */
console.log("=== 익명 함수 표현식 예제 ===");
// console.log(multiply(3, 4)); // TypeError: multiply is not a function
const multiply = (a, b) => a * b;
console.log(multiply(3, 4)); // 12
console.log("=========================\n");

/**
 * 기명 함수 표현식 (Named Function Expression)
 * - 변수명은 c, 함수명은 d
 * - 외부에서는 변수명으로만 호출 가능
 * - 함수명은 함수 내부에서만 사용 가능 (재귀 등)
 */
console.log("=== 기명 함수 표현식 예제 ===");
const c = function d() {
  return "함수 실행됨";
};
console.log(c()); // "함수 실행됨" - 정상 실행
// console.log(d()); // ReferenceError: d is not defined
console.log("=========================\n");

/**
 * 호이스팅 비교: 함수 선언문 vs 함수 표현식
 *
 * 호이스팅 후 코드 해석:
 * 1. 함수 선언문 sum은 전체가 호이스팅됨
 * 2. 변수 multiply는 선언부만 호이스팅됨 (undefined)
 * 3. console.log(sum(1, 2)) 실행 → 3 출력
 * 4. console.log(multiply(3, 4)) 실행 → TypeError
 * 5. multiply에 함수 할당
 */
console.log("=== 호이스팅 비교 예제 ===");
console.log(sum(1, 2)); // 3
// console.log(multiply(3, 4)); // TypeError: multiply is not a function

function sum(a, b) {
  console.log("두번째 sum");
  // 함수 선언문은 전체를 호이스팅
  return a + b;
}

const multiply2 = (a, b) => {
  // 변수의 할당부는 원래 자리에 남음
  return a * b;
};
console.log("=========================\n");

/**
 * 함수 선언문 중복 선언 시 동작
 * - 함수 선언문은 전체가 호이스팅되므로
 * - 나중에 선언된 함수가 이전 함수를 덮어씀
 * - 변수 a에 할당되는 시점에는 이미 두 번째 sum 함수로 덮어씌워진 상태
 */
console.log("=== 함수 선언문 중복 선언 ===");
console.log(sum(3, 4)); // "3 + 4 = 7"

function sum(x, y) {
  console.log("세번째 sum");
  return x + y;
}

const a = sum(1, 2); // "1 + 2 = 3"

function sum(x, y) {
  console.log("네번째 sum");
  // 이 함수가 위의 sum을 덮어씀
  return `${x} + ${y} = ${x + y}`;
}

const result = sum(1, 2);
console.log(result); // "1 + 2 = 3"
console.log("=========================\n");

/**
 * 함수 표현식 중복 선언 시 동작
 * - 변수 선언부만 호이스팅되므로
 * - 첫 번째 호출 시점에는 sum이 undefined → TypeError 발생
 * - 두 번째 할당 이후에는 두 번째 함수가 사용됨
 */
console.log("=== 함수 표현식 중복 선언 ===");
// console.log(sum(3, 4)); // TypeError: sum is not a function

let sum2 = (x, y) => x + y;

const b = sum2(1, 2); // 3

sum2 = (x, y) => `${x} + ${y} = ${x + y}`;

const result2 = sum2(1, 2);
console.log(result2); // "1 + 2 = 3"
console.log("=========================\n");
