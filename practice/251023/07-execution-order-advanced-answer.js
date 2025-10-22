/**
 * 07. 고급 실행 순서 예측 - 정답
 */

console.log("=== 고급 실행 순서 정답 ===\n");

console.log("--- TODO 1 정답 ---\n");

console.log("1");

setTimeout(() => {
	console.log("2");
	Promise.resolve()
		.then(() => {
			console.log("3");
			setTimeout(() => {
				console.log("4");
				Promise.resolve().then(() => console.log("5"));
			}, 0);
		})
		.then(() => {
			console.log("6");
			setTimeout(() => console.log("7"), 0);
		});
}, 0);

Promise.resolve()
	.then(() => {
		console.log("8");
		setTimeout(() => {
			console.log("9");
			Promise.resolve().then(() => console.log("10"));
		}, 0);
		return Promise.resolve();
	})
	.then(() => {
		console.log("11");
		setTimeout(() => console.log("12"), 0);
	});

setTimeout(() => {
	console.log("13");
	Promise.resolve()
		.then(() => console.log("14"))
		.then(() => console.log("15"));
}, 0);

Promise.resolve()
	.then(() => console.log("16"))
	.then(() => console.log("17"));

console.log("18");

/**
 * 출력 순서: 1 → 18 → 8 → 16 → 11 → 17 → 2 → 3 → 6 → 13 → 14 → 15 → 9 → 10 → 4 → 5 → 12 → 7
 *
 * 완전 분석:
 *
 * [Call Stack 완료]
 * Task: [T-2, T-13]
 * Microtask: [P-8, P-16]
 *
 * [Microtask 1-1] 8
 * setTimeout 등록, return Promise
 * Task: [T-2, T-13, T-9]
 * Microtask: [P-16, P-11]
 *
 * [Microtask 1-2] 16
 * Microtask: [P-11, P-17]
 *
 * [Microtask 1-3] 11
 * setTimeout 등록
 * Task: [T-2, T-13, T-9, T-12]
 * Microtask: [P-17]
 *
 * [Microtask 1-4] 17
 * Microtask 비어있음
 *
 * [Task 1] 2
 * Promise 체이닝 등록
 * Microtask: [P-3]
 *
 * [Microtask 2-1] 3
 * setTimeout 등록
 * Task: [T-13, T-9, T-12, T-4]
 * Microtask: [P-6]
 *
 * [Microtask 2-2] 6
 * setTimeout 등록
 * Task: [T-13, T-9, T-12, T-4, T-7]
 *
 * [Task 2] 13
 * Promise 체이닝
 * Microtask: [P-14]
 * → 14 → 15
 *
 * [Task 3] 9
 * Microtask: [P-10]
 * → 10
 *
 * [Task 4] 4
 * Microtask: [P-5]
 * → 5
 *
 * [Task 5] 12
 * [Task 6] 7
 */

setTimeout(() => {
	console.log("\n=== 07. 정답 완료 ===\n");
}, 3000);
