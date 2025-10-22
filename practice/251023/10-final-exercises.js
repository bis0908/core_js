/**
 * 10. 최종 종합 연습 문제
 *
 * 학습 목표:
 * - Event Loop의 모든 개념을 총정리하기
 * - 15개의 종합 문제로 완벽 마스터하기
 * - 멘토링 대비 실전 감각 익히기
 */

console.log("=== 최종 종합 연습 문제 ===\n");

console.log("💡 이 파일은 멘토링 대비 최종 점검용입니다!");
console.log("모든 문제를 풀고 정답과 비교하세요.\n");

/**
 * 문제 1: 기본 실행 순서 (난이도: ⭐⭐)
 */

console.log("--- 문제 1: 기본 순서 ---\n");

// console.log("A");
// setTimeout(() => console.log("B"), 0);
// Promise.resolve().then(() => console.log("C"));
// console.log("D");

// 예상 순서:

console.log("(문제 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * 문제 2: Promise 체이닝 (난이도: ⭐⭐)
 */

setTimeout(() => {
	console.log("--- 문제 2: Promise 체이닝 ---\n");

	// Promise.resolve()
	//   .then(() => console.log("A"))
	//   .then(() => console.log("B"));
	//
	// Promise.resolve().then(() => console.log("C"));
	//
	// console.log("D");

	// 예상 순서:

	console.log("(문제 2를 완성하세요)\n");
	console.log("==================================================\n");
}, 1000);

/**
 * 문제 3: 중첩 타이머 (난이도: ⭐⭐⭐)
 */

setTimeout(() => {
	console.log("--- 문제 3: 중첩 타이머 ---\n");

	// setTimeout(() => {
	//   console.log("A");
	//   Promise.resolve().then(() => console.log("B"));
	// }, 0);
	//
	// setTimeout(() => console.log("C"), 0);
	// Promise.resolve().then(() => console.log("D"));

	// 예상 순서:

	console.log("(문제 3을 완성하세요)\n");
	console.log("==================================================\n");
}, 2000);

/**
 * 문제 4: async/await 기본 (난이도: ⭐⭐⭐)
 */

setTimeout(() => {
	console.log("--- 문제 4: async/await ---\n");

	// async function test() {
	//   console.log("A");
	//   await Promise.resolve();
	//   console.log("B");
	// }
	//
	// test();
	// Promise.resolve().then(() => console.log("C"));
	// console.log("D");

	// 예상 순서:

	console.log("(문제 4를 완성하세요)\n");
	console.log("==================================================\n");
}, 3000);

/**
 * 문제 5: 복합 패턴 1 (난이도: ⭐⭐⭐⭐)
 */

setTimeout(() => {
	console.log("--- 문제 5: 복합 패턴 1 ---\n");

	// console.log("1");
	//
	// setTimeout(() => {
	//   console.log("2");
	//   Promise.resolve().then(() => console.log("3"));
	// }, 0);
	//
	// Promise.resolve()
	//   .then(() => {
	//     console.log("4");
	//     setTimeout(() => console.log("5"), 0);
	//   })
	//   .then(() => console.log("6"));
	//
	// console.log("7");

	// 예상 순서:

	console.log("(문제 5를 완성하세요)\n");
	console.log("==================================================\n");
}, 4000);

/**
 * 문제 6~15: 추가 고급 문제들
 *
 * - 문제 6: 여러 async 함수 (⭐⭐⭐⭐)
 * - 문제 7: Promise.all + setTimeout (⭐⭐⭐⭐)
 * - 문제 8: 중첩된 Promise 체이닝 (⭐⭐⭐⭐)
 * - 문제 9: 복잡한 async/await (⭐⭐⭐⭐⭐)
 * - 문제 10: 모든 패턴 통합 1 (⭐⭐⭐⭐⭐)
 * - 문제 11: 모든 패턴 통합 2 (⭐⭐⭐⭐⭐)
 * - 문제 12: 실무 시나리오 1 (⭐⭐⭐⭐⭐)
 * - 문제 13: 실무 시나리오 2 (⭐⭐⭐⭐⭐)
 * - 문제 14: 초고난도 통합 (⭐⭐⭐⭐⭐)
 * - 문제 15: 최종 보스 문제 (⭐⭐⭐⭐⭐)
 */

setTimeout(() => {
	console.log("--- 문제 6~15 ---\n");
	console.log("정답 파일에서 나머지 문제들을 확인하세요.\n");
	console.log("==================================================\n");
}, 5000);

setTimeout(() => {
	console.log("\n=== 최종 점검 완료! ===\n");
	console.log("✅ 모든 문제를 풀었다면:");
	console.log("   → 10-final-exercises-answer.js로 정답 확인");
	console.log("\n✅ Event Loop 마스터 체크리스트:");
	console.log("   □ Call Stack 동작 원리 이해");
	console.log("   □ Task Queue vs Microtask Queue 차이");
	console.log("   □ Promise.then()의 실행 시점");
	console.log("   □ setTimeout(0)의 의미");
	console.log("   □ async/await의 Microtask 생성");
	console.log("   □ 복잡한 패턴의 실행 순서 예측");
	console.log("\n💪 멘토링 준비 완료! 화이팅!\n");
}, 7000);
