/**
 * 07. async/await - Promise를 동기처럼
 *
 * 학습 목표:
 * - async/await 기본 문법
 * - .then() ↔ async/await 상호 변환 10회
 * - try-catch 에러 처리
 */

console.log("=== async/await 학습 ===\n");

/**
 * async 함수
 *
 * - 항상 Promise를 반환
 * - return 값은 자동으로 Promise.resolve()로 래핑
 * - await 키워드 사용 가능
 */

console.log("--- 예제 1: async 기본 ---\n");

async function simpleAsync() {
	return "완료!"; // Promise.resolve("완료!")와 동일
}

simpleAsync().then((result) => {
	console.log("결과:", result);
	console.log("→ async 함수는 항상 Promise 반환\n");
});

console.log("==================================================\n");

/**
 * await 키워드
 *
 * - Promise가 완료될 때까지 기다림
 * - async 함수 내부에서만 사용 가능
 * - Promise의 결과값을 직접 반환
 */

setTimeout(async () => {
	console.log("--- 예제 2: await 기본 ---\n");

	function delay(ms, value) {
		return new Promise((resolve) => setTimeout(() => resolve(value), ms));
	}

	console.log("시작");
	const result1 = await delay(500, "첫 번째");
	console.log(result1);

	const result2 = await delay(500, "두 번째");
	console.log(result2);

	console.log("→ await로 비동기를 동기처럼 작성\n");
	console.log("==================================================\n");
}, 1000);

/**
 * TODO 1-5: then() → async/await 변환 (5회)
 *
 * 아래 then() 체이닝을 async/await로 변환하세요!
 */

console.log("--- TODO 1: 변환 1 ---\n");
console.log("원본 (then):");
/*
Promise.resolve(10)
  .then(n => n + 5)
  .then(n => n * 2)
  .then(result => console.log(result));
*/

console.log("\n변환 (async/await):");
// 여기에 async 함수로 작성하세요

console.log("\n==================================================\n");

console.log("--- TODO 2: 변환 2 (에러 처리) ---\n");
console.log("원본 (then):");
/*
Promise.reject('에러')
  .catch(e => console.error(e));
*/

console.log("\n변환 (try-catch):");
// 여기에 try-catch로 작성하세요

console.log("\n==================================================\n");

console.log("--- TODO 3: 변환 3 (순차 호출) ---\n");
console.log("원본:");
/*
getUser()
  .then(user => getPosts(user.id))
  .then(posts => console.log(posts));
*/

console.log("\n변환:");
// async 함수로 작성

console.log("\n==================================================\n");

console.log("--- TODO 4: 변환 4 (병렬 실행) ---\n");
console.log("원본:");
/*
Promise.all([task1(), task2(), task3()])
  .then(results => console.log(results));
*/

console.log("\n변환:");
// Promise.all과 await 조합

console.log("\n==================================================\n");

console.log("--- TODO 5: 변환 5 (finally) ---\n");
console.log("원본:");
/*
fetchData()
  .then(data => console.log(data))
  .catch(e => console.error(e))
  .finally(() => console.log('끝'));
*/

console.log("\n변환:");
// try-catch-finally

console.log("\n==================================================\n");

/**
 * TODO 6-10: async/await → then() 변환 (5회)
 */

console.log("--- TODO 6: 역변환 1 ---\n");
console.log("원본 (async/await):");
/*
async function process() {
  const a = await step1();
  const b = await step2(a);
  return b;
}
*/

console.log("\n변환 (then):");
// then 체이닝으로 작성

console.log("\n==================================================\n");

console.log("--- TODO 7: 역변환 2 (에러) ---\n");
console.log("원본:");
/*
async function fetchWithError() {
  try {
    const data = await fetch();
    return data;
  } catch (e) {
    console.error(e);
  }
}
*/

console.log("\n변환 (then/catch):");

console.log("\n==================================================\n");

console.log("--- TODO 8: 역변환 3 (병렬) ---\n");
console.log("원본:");
/*
async function parallel() {
  const [a, b, c] = await Promise.all([
    task1(), task2(), task3()
  ]);
  return a + b + c;
}
*/

console.log("\n변환:");

console.log("\n==================================================\n");

/**
 * 실전 패턴: 순차 vs 병렬
 */

console.log("--- 실전: 순차 vs 병렬 ---\n");

console.log("❌ 나쁜 예 (순차 - 느림):");
/*
async function slow() {
  const a = await task1();  // 1초
  const b = await task2();  // 1초
  const c = await task3();  // 1초
  // 총 3초
}
*/

console.log("\n✅ 좋은 예 (병렬 - 빠름):");
/*
async function fast() {
  const [a, b, c] = await Promise.all([
    task1(), task2(), task3()
  ]);
  // 총 1초!
}
*/

console.log("\n==================================================\n");

/**
 * 학습 정리
 *
 * ✅ async 함수는 항상 Promise 반환
 * ✅ await는 async 내부에서만 사용
 * ✅ try-catch로 에러 처리
 * ✅ 순차: await await await (느림)
 * ✅ 병렬: Promise.all + await (빠름)
 * ✅ then ↔ async/await 자유롭게 변환
 *
 * 다음 학습: 08-error-handling.js
 */

console.log("\n=== 07. async/await 학습 완료! ===");
console.log("\n⭐ 10회 변환 연습 완료했나요?");
console.log("   - 정답 파일에서 확인하세요");
console.log("\n정답 확인: 07-async-await-answer.js");
console.log("다음 단계: node 08-error-handling.js\n");
