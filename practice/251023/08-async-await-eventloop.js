/**
 * 08. async/await + Event Loop
 *
 * 학습 목표:
 * - await가 Microtask를 생성하는 과정 이해하기
 * - 여러 async 함수 동시 호출 시 실행 순서 파악하기
 * - async/await와 Promise.then()의 차이 이해하기
 */

console.log("=== async/await + Event Loop 학습 ===\n");

console.log("--- 예제 1: async/await 기본 동작 ---\n");

async function test() {
	console.log("2. async 함수 시작");
	await Promise.resolve();
	console.log("4. await 이후");
}

console.log("1. 동기 코드");
test();
console.log("3. async 호출 직후");

/**
 * 출력: 1 → 2 → 3 → 4
 *
 * await는 다음과 같이 동작:
 * await Promise.resolve()
 * ↓ (변환)
 * Promise.resolve().then(() => {
 *   // await 이후 코드
 * })
 */

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- 예제 2: async/await vs Promise.then() ---\n");

	async function asyncFunc() {
		console.log("A");
		await Promise.resolve();
		console.log("B");
	}

	function promiseFunc() {
		console.log("C");
		Promise.resolve().then(() => {
			console.log("D");
		});
	}

	asyncFunc();
	promiseFunc();

	/**
	 * 출력: A → C → B → D
	 *
	 * 둘 다 Microtask를 생성하지만,
	 * 등록 순서에 따라 실행됨
	 */
}, 1000);

setTimeout(() => {
	console.log("\n==================================================\n");
	console.log("--- TODO 1: async/await 순서 예측 ---\n");

	// async function func1() {
	//   console.log("1");
	//   await Promise.resolve();
	//   console.log("2");
	//   await Promise.resolve();
	//   console.log("3");
	// }
	//
	// async function func2() {
	//   console.log("4");
	//   await Promise.resolve();
	//   console.log("5");
	// }
	//
	// func1();
	// func2();

	// 예상 순서: ____

	console.log("(TODO 1을 완성하세요)\n");
	console.log("==================================================\n");
}, 3000);

setTimeout(() => {
	console.log("--- TODO 2: async + setTimeout ---\n");

	// async function test() {
	//   console.log("A");
	//   await Promise.resolve();
	//   console.log("B");
	//   setTimeout(() => console.log("C"), 0);
	//   await Promise.resolve();
	//   console.log("D");
	// }
	//
	// setTimeout(() => console.log("E"), 0);
	// test();
	// Promise.resolve().then(() => console.log("F"));

	// 예상 순서: ____

	console.log("(TODO 2를 완성하세요)\n");
	console.log("==================================================\n");
}, 5000);

setTimeout(() => {
	console.log("--- TODO 3: 여러 async 함수 통합 ---\n");

	// async function a() {
	//   console.log("1");
	//   await Promise.resolve();
	//   console.log("2");
	//   setTimeout(() => console.log("3"), 0);
	// }
	//
	// async function b() {
	//   console.log("4");
	//   await Promise.resolve();
	//   console.log("5");
	// }
	//
	// setTimeout(() => console.log("6"), 0);
	// a();
	// Promise.resolve().then(() => console.log("7"));
	// b();

	// 예상 순서: ____

	console.log("(TODO 3을 완성하세요)\n");
	console.log("==================================================\n");
}, 7000);

setTimeout(() => {
	console.log("\n=== 08. async/await Event Loop 학습 완료! ===");
	console.log("정답: 08-async-await-eventloop-answer.js\n");
}, 10000);
