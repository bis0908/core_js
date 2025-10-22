/**
 * 07. 고급 실행 순서 예측
 *
 * 학습 목표:
 * - 초고난도 실행 순서 예측 능력 향상
 * - Call Stack/Queue 상태를 머릿속으로 시뮬레이션하기
 * - 5개의 최고 난이도 문제 정복하기
 */

console.log("=== 고급 실행 순서 예측 학습 ===\n");

/**
 * TODO 1: 초고난도 문제 1 (난이도: ⭐⭐⭐⭐⭐)
 */

console.log("--- TODO 1: 초고난도 문제 1 ---\n");

// console.log("1");
//
// setTimeout(() => {
//   console.log("2");
//   Promise.resolve()
//     .then(() => {
//       console.log("3");
//       setTimeout(() => {
//         console.log("4");
//         Promise.resolve().then(() => console.log("5"));
//       }, 0);
//     })
//     .then(() => {
//       console.log("6");
//       setTimeout(() => console.log("7"), 0);
//     });
// }, 0);
//
// Promise.resolve()
//   .then(() => {
//     console.log("8");
//     setTimeout(() => {
//       console.log("9");
//       Promise.resolve().then(() => console.log("10"));
//     }, 0);
//     return Promise.resolve();
//   })
//   .then(() => {
//     console.log("11");
//     setTimeout(() => console.log("12"), 0);
//   });
//
// setTimeout(() => {
//   console.log("13");
//   Promise.resolve()
//     .then(() => console.log("14"))
//     .then(() => console.log("15"));
// }, 0);
//
// Promise.resolve()
//   .then(() => console.log("16"))
//   .then(() => console.log("17"));
//
// console.log("18");

// 예상 출력 순서 (1~18):

console.log("(TODO 1을 완성하세요)\n");
console.log("==================================================\n");

/**
 * TODO 2~5: 나머지 4개의 초고난도 문제
 *
 * 각 문제마다:
 * - 실행 순서 예측
 * - Call Stack / Microtask / Task 상태 추적
 * - 각 단계의 Queue 변화 설명
 */

setTimeout(() => {
	console.log("--- TODO 2: 초고난도 문제 2 ---\n");

	// (15줄 이상의 복잡한 패턴)

	console.log("(TODO 2를 완성하세요)\n");
	console.log("==================================================\n");
}, 2000);

setTimeout(() => {
	console.log("--- TODO 3: 초고난도 문제 3 ---\n");

	// (Promise.all과 setTimeout 조합)

	console.log("(TODO 3을 완성하세요)\n");
	console.log("==================================================\n");
}, 4000);

setTimeout(() => {
	console.log("--- TODO 4: 초고난도 문제 4 ---\n");

	// (중첩된 Promise 체이닝 + 다중 Timer)

	console.log("(TODO 4를 완성하세요)\n");
	console.log("==================================================\n");
}, 6000);

setTimeout(() => {
	console.log("--- TODO 5: 최종 보스 문제 ---\n");

	// (모든 패턴 통합)

	console.log("(TODO 5를 완성하세요)\n");
	console.log("==================================================\n");
}, 8000);

setTimeout(() => {
	console.log("\n=== 07. 고급 실행 순서 예측 학습 완료! ===");
	console.log("정답: 07-execution-order-advanced-answer.js\n");
	console.log("\n💡 이 문제들을 모두 풀 수 있다면,");
	console.log("   Event Loop 실행 순서는 완벽히 마스터한 것입니다!\n");
}, 10000);
