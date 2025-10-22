/**
 * 08. Promise 에러 처리 패턴
 *
 * 학습 목표:
 * - 에러 처리 베스트 프랙티스
 * - 에러 복구 패턴
 * - 흔한 실수와 안티 패턴
 */

console.log("=== Promise 에러 처리 ===\n");

/**
 * 핵심 원칙: 모든 Promise에 에러 처리 추가!
 */

console.log("--- 예제 1: 기본 에러 처리 ---\n");

Promise.reject(new Error("문제 발생"))
	.then((data) => {
		console.log("성공:", data);
	})
	.catch((error) => {
		console.error("❌ 에러 포착:", error.message);
		console.log("→ catch로 에러 처리\n");
	});

console.log("==================================================\n");

/**
 * TODO 1: 에러 전파와 catch 위치
 *
 * 요구사항:
 * - step1(), step2(), step3() 함수 만들기
 * - step2에서 에러 발생
 * - 하나의 catch로 모든 에러 처리
 */

console.log("--- TODO 1: 에러 전파 ---\n");

function step1() { /* 1단계 resolve */ }
function step2() { /* 2단계 reject */ }
function step3() { /* 3단계 resolve */ }

// step1, 2, 3을 체이닝하고 하나의 catch로 처리

console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 2: 에러 복구 패턴
 *
 * catch에서 값을 반환하면 에러 상태에서 벗어남
 *
 * 요구사항:
 * - Promise.reject("네트워크 에러")
 * - catch에서 "캐시 데이터" 반환 (복구)
 * - 다음 then에서 복구된 값 사용
 */

console.log("--- TODO 2: 에러 복구 ---\n");

// Promise.reject()로 시작하여
// catch에서 "캐시 데이터"를 반환하여 복구하고
// then에서 복구된 데이터를 출력

console.log("(TODO 2를 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 3: async/await 에러 처리
 *
 * 요구사항:
 * - async 함수에서 3단계 작업
 * - 2단계에서 throw new Error()
 * - try-catch로 에러 처리
 */

console.log("--- TODO 3: async/await 에러 ---\n");

async function process() {
  // try-catch를 사용하여 2단계에서 에러 발생 및 처리
}

process();

console.log("(TODO 3을 완성하세요)\n");
console.log("==================================================\n");

/**
 * 안티 패턴 학습
 */

console.log("--- 안티 패턴 1: catch 누락 ---\n");

console.log("❌ 나쁜 예:");
console.log("fetchData().then(data => console.log(data));");
console.log("// 에러 발생 시 처리 불가!\n");

console.log("✅ 좋은 예:");
console.log("fetchData()");
console.log("  .then(data => console.log(data))");
console.log("  .catch(error => console.error(error));\n");

console.log("==================================================\n");

console.log("--- 안티 패턴 2: Promise 중첩 ---\n");

console.log("❌ 나쁜 예:");
console.log("fetchUser().then(user => {");
console.log("  fetchPosts(user.id).then(posts => {");
console.log("    // 중첩...");
console.log("  });");
console.log("});\n");

console.log("✅ 좋은 예:");
console.log("fetchUser()");
console.log("  .then(user => fetchPosts(user.id))");
console.log("  .then(posts => { ... });\n");

console.log("==================================================\n");

console.log("--- 안티 패턴 3: return 누락 ---\n");

console.log("❌ 나쁜 예:");
console.log("Promise.resolve(10)");
console.log("  .then(n => { n + 5; })  // return 없음!");
console.log("  .then(n => console.log(n));  // undefined\n");

console.log("✅ 좋은 예:");
console.log("Promise.resolve(10)");
console.log("  .then(n => { return n + 5; })");
console.log("  .then(n => console.log(n));  // 15\n");

console.log("==================================================\n");

/**
 * 학습 정리
 *
 * ✅ 모든 Promise에 catch 추가
 * ✅ catch는 체이닝 끝에 배치
 * ✅ catch에서 값 반환 → 에러 복구
 * ✅ async/await는 try-catch 사용
 * ✅ return 빼먹지 않기
 * ✅ Promise 중첩 피하기
 *
 * 다음 학습: 09-practical-patterns.js
 */

console.log("\n=== 08. 에러 처리 학습 완료! ===");
console.log("\n정답 확인: 08-error-handling-answer.js");
console.log("다음 단계: node 09-practical-patterns.js\n");
