/**
 * 05. 중첩된 타이머 패턴 - 정답
 */

console.log("=== 중첩 타이머 정답 ===\n");

console.log("--- TODO 1 정답 ---\n");

setTimeout(() => {
	console.log("1");
	setTimeout(() => console.log("2"), 0);
	Promise.resolve().then(() => console.log("3"));
}, 0);

setTimeout(() => {
	console.log("4");
}, 0);

/**
 * 출력 순서: 1 → 3 → 4 → 2
 *
 * [Task 1 실행]
 * "1" → setTimeout 2 등록 → Promise 등록
 * Microtask: [3]
 * Task: [4, 2]
 *
 * [Microtask]
 * "3"
 *
 * [Task 2]
 * "4"
 *
 * [Task 3]
 * "2"
 */

setTimeout(() => {
	console.log("\n--- TODO 2 정답 ---\n");

	setTimeout(() => {
		console.log("A");
		Promise.resolve()
			.then(() => {
				console.log("B");
				setTimeout(() => console.log("C"), 0);
			})
			.then(() => console.log("D"));
	}, 0);

	setTimeout(() => console.log("E"), 0);

	/**
	 * 출력: A → B → D → E → C
	 */
}, 2000);

setTimeout(() => {
	console.log("\n--- TODO 3 정답 ---\n");

	console.log("Start");

	setTimeout(() => console.log("A"), 100);
	setTimeout(() => console.log("B"), 0);
	Promise.resolve().then(() => console.log("C"));

	console.log("End");

	/**
	 * 출력: Start → End → C → B → A (약 100ms 후)
	 */
}, 4000);

setTimeout(() => {
	console.log("\n=== 05. 정답 완료 ===\n");
}, 7000);
