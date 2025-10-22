/**
 * 05. 중첩된 타이머 패턴
 *
 * 학습 목표:
 * - 중첩된 setTimeout의 실행 순서 이해하기
 * - setTimeout 안의 Promise 동작 파악하기
 * - 복잡한 타이머 체이닝 마스터하기
 */

console.log("=== 중첩된 타이머 패턴 학습 ===\n");

console.log("--- 예제 1: 기본 중첩 타이머 ---\n");

console.log("Start");

setTimeout(() => {
	console.log("Outer");
	setTimeout(() => {
		console.log("Inner");
	}, 0);
}, 0);

console.log("End");

/**
 * 출력: Start → End → Outer → Inner
 *
 * 각 setTimeout은 별도의 Task로 등록됨
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- 예제 2: 타이머 안의 Promise ---\n");

	setTimeout(() => {
		console.log("A");
		Promise.resolve().then(() => console.log("B"));
		console.log("C");
	}, 0);

	setTimeout(() => {
		console.log("D");
	}, 0);

	/**
	 * 출력: A → C → B → D
	 *
	 * Task 1 실행 → Microtask 처리 → Task 2 실행
	 */
}, 1000);

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- TODO 1: 중첩 타이머 순서 ---\n");

	// setTimeout(() => {
	//   console.log("1");
	//   setTimeout(() => console.log("2"), 0);
	//   Promise.resolve().then(() => console.log("3"));
	// }, 0);
	//
	// setTimeout(() => {
	//   console.log("4");
	// }, 0);

	// 예상 순서: ____

	console.log("(TODO 1을 완성하세요)\n");
	console.log("==================================================\n");
}, 3000);

setTimeout(() => {
	console.log("--- TODO 2: 복잡한 중첩 ---\n");

	// setTimeout(() => {
	//   console.log("A");
	//   Promise.resolve()
	//     .then(() => {
	//       console.log("B");
	//       setTimeout(() => console.log("C"), 0);
	//     })
	//     .then(() => console.log("D"));
	// }, 0);
	//
	// setTimeout(() => console.log("E"), 0);

	// 예상 순서: ____

	console.log("(TODO 2를 완성하세요)\n");
	console.log("==================================================\n");
}, 5000);

setTimeout(() => {
	console.log("--- TODO 3: 타이머 지연 시간 고려 ---\n");

	// console.log("Start");
	//
	// setTimeout(() => console.log("A"), 100);
	// setTimeout(() => console.log("B"), 0);
	// Promise.resolve().then(() => console.log("C"));
	//
	// console.log("End");

	// 예상 순서: ____

	console.log("(TODO 3을 완성하세요)\n");
	console.log("==================================================\n");
}, 7000);

setTimeout(() => {
	console.log("\n=== 05. 중첩 타이머 학습 완료! ===");
	console.log("정답: 05-nested-timers-answer.js\n");
}, 10000);
