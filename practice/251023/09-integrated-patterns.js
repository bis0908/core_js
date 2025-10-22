/**
 * 09. 통합 패턴 (setTimeout + Promise + async/await)
 *
 * 학습 목표:
 * - 모든 비동기 패턴의 통합 이해
 * - 실무 시나리오 패턴 마스터
 * - 복잡한 실전 코드 분석 능력 향상
 */

console.log("=== 통합 패턴 학습 ===\n");

console.log("--- 예제: 실무 시나리오 패턴 ---\n");

async function fetchData() {
	console.log("1. API 호출 시작");
	await Promise.resolve();
	console.log("2. API 응답 받음");
	return "데이터";
}

async function processData() {
	console.log("3. 처리 시작");
	const data = await fetchData();
	console.log("4. 처리 완료:", data);
	setTimeout(() => console.log("5. 로그 전송"), 0);
}

setTimeout(() => console.log("6. 타이머"), 0);
processData();
Promise.resolve().then(() => console.log("7. 즉시 실행"));

/**
 * 출력: 3 → 1 → 7 → 2 → 4 → 6 → 5
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- TODO 1: 실무 패턴 1 - API 호출 체인 ---\n");

	// async function fetchUser() {
	//   console.log("A");
	//   await Promise.resolve();
	//   return "User";
	// }
	//
	// async function fetchPosts() {
	//   console.log("B");
	//   await Promise.resolve();
	//   return "Posts";
	// }
	//
	// async function loadData() {
	//   console.log("C");
	//   const user = await fetchUser();
	//   console.log("D:", user);
	//   const posts = await fetchPosts();
	//   console.log("E:", posts);
	//   setTimeout(() => console.log("F"), 0);
	// }
	//
	// setTimeout(() => console.log("G"), 0);
	// loadData();
	// Promise.resolve().then(() => console.log("H"));

	// 예상 순서 및 분석:

	console.log("(TODO 1을 완성하세요)\n");
	console.log("==================================================\n");
}, 2000);

setTimeout(() => {
	console.log("--- TODO 2: 실무 패턴 2 - 에러 처리 포함 ---\n");

	// async function riskyOperation() {
	//   console.log("1");
	//   await Promise.resolve();
	//   console.log("2");
	//   return "Success";
	// }
	//
	// async function main() {
	//   console.log("3");
	//   try {
	//     const result = await riskyOperation();
	//     console.log("4:", result);
	//   } catch (error) {
	//     console.log("Error");
	//   }
	//   console.log("5");
	//   setTimeout(() => console.log("6"), 0);
	// }
	//
	// Promise.resolve()
	//   .then(() => console.log("7"))
	//   .then(() => console.log("8"));
	//
	// main();
	// setTimeout(() => console.log("9"), 0);

	// 예상 순서:

	console.log("(TODO 2를 완성하세요)\n");
	console.log("==================================================\n");
}, 4000);

setTimeout(() => {
	console.log("--- TODO 3: 최종 통합 문제 ---\n");

	// async function complexFlow() {
	//   console.log("A");
	//   await Promise.resolve();
	//   console.log("B");
	//
	//   setTimeout(() => {
	//     console.log("C");
	//     Promise.resolve().then(() => console.log("D"));
	//   }, 0);
	//
	//   await Promise.resolve();
	//   console.log("E");
	//
	//   Promise.resolve()
	//     .then(() => console.log("F"))
	//     .then(() => console.log("G"));
	// }
	//
	// setTimeout(() => {
	//   console.log("H");
	//   Promise.resolve().then(() => console.log("I"));
	// }, 0);
	//
	// complexFlow();
	//
	// Promise.resolve()
	//   .then(() => console.log("J"))
	//   .then(() => {
	//     console.log("K");
	//     setTimeout(() => console.log("L"), 0);
	//   });
	//
	// setTimeout(() => console.log("M"), 0);

	// 예상 순서 (A~M):

	console.log("(TODO 3을 완성하세요)\n");
	console.log("==================================================\n");
}, 6000);

setTimeout(() => {
	console.log("\n=== 09. 통합 패턴 학습 완료! ===");
	console.log("정답: 09-integrated-patterns-answer.js\n");
}, 9000);
