/**
 * 06. Promise + Timer 복합 패턴
 *
 * 학습 목표:
 * - Promise와 setTimeout의 복잡한 조합 이해하기
 * - 20줄 이상의 복잡한 비동기 코드 분석하기
 * - 실전 패턴의 실행 순서 완벽 예측하기
 */

console.log("=== Promise + Timer 복합 패턴 학습 ===\n");

console.log("--- 예제: 복잡한 실전 패턴 ---\n");

console.log("1");

setTimeout(() => {
	console.log("2");
	Promise.resolve()
		.then(() => console.log("3"))
		.then(() => console.log("4"));
}, 0);

Promise.resolve()
	.then(() => {
		console.log("5");
		setTimeout(() => {
			console.log("6");
		}, 0);
		return Promise.resolve();
	})
	.then(() => console.log("7"));

setTimeout(() => {
	console.log("8");
	Promise.resolve().then(() => {
		console.log("9");
		setTimeout(() => console.log("10"), 0);
	});
}, 0);

Promise.resolve().then(() => console.log("11"));

console.log("12");

/**
 * 예상 출력 순서:
 * 1 → 12 → 5 → 11 → 7 → 2 → 3 → 4 → 8 → 9 → 6 → 10
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- TODO 1: 실전 패턴 분석 ---\n");

	// console.log("A");
	//
	// setTimeout(() => {
	//   console.log("B");
	//   Promise.resolve()
	//     .then(() => {
	//       console.log("C");
	//       setTimeout(() => console.log("D"), 0);
	//     })
	//     .then(() => console.log("E"));
	// }, 0);
	//
	// Promise.resolve()
	//   .then(() => {
	//     console.log("F");
	//     setTimeout(() => {
	//       console.log("G");
	//       Promise.resolve().then(() => console.log("H"));
	//     }, 0);
	//   })
	//   .then(() => console.log("I"));
	//
	// setTimeout(() => {
	//   console.log("J");
	// }, 0);
	//
	// Promise.resolve()
	//   .then(() => console.log("K"))
	//   .then(() => {
	//     console.log("L");
	//     setTimeout(() => console.log("M"), 0);
	//   });
	//
	// console.log("N");

	// 예상 출력 순서 (A~N, 14개):
	// 1.
	// 2.
	// ...
	// 14.

	// 각 단계를 Call Stack, Microtask, Task로 분석하세요

	console.log("(TODO 1을 완성하세요)\n");
	console.log("==================================================\n");
}, 2000);

setTimeout(() => {
	console.log("--- TODO 2: 최고 난이도 패턴 ---\n");

	// Promise.resolve()
	//   .then(() => {
	//     console.log("P1");
	//     setTimeout(() => {
	//       console.log("T1");
	//       Promise.resolve().then(() => console.log("P2"));
	//     }, 0);
	//     return Promise.resolve();
	//   })
	//   .then(() => {
	//     console.log("P3");
	//     setTimeout(() => console.log("T2"), 0);
	//   });
	//
	// setTimeout(() => {
	//   console.log("T3");
	//   Promise.resolve()
	//     .then(() => {
	//       console.log("P4");
	//       setTimeout(() => console.log("T4"), 0);
	//     })
	//     .then(() => console.log("P5"));
	// }, 0);
	//
	// Promise.resolve()
	//   .then(() => console.log("P6"))
	//   .then(() => console.log("P7"));

	// 예상 순서 및 상세 분석 작성

	console.log("(TODO 2를 완성하세요)\n");
	console.log("==================================================\n");
}, 4000);

setTimeout(() => {
	console.log("\n=== 06. Promise+Timer 복합 패턴 학습 완료! ===");
	console.log("정답: 06-promise-timer-mix-answer.js\n");
}, 7000);
